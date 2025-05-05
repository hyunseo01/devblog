"use client";

import { useEffect, useRef, useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useAuth } from "@/libs/store/useAuth";
import {
  connectSocket,
  getSocket,
  disconnectSocket,
} from "@/libs/socket/chatSocket";
import type { ChatMessage } from "@/libs/socket/chatSocket";
import SimpleLoginForm from "@/components/SimpleLoginForm";

export default function ChatLayout() {
  const { token, nickname } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    fetchMessages();
  }, [token, mounted]);

  useEffect(() => {
    if (!mounted || !token) return;

    connectSocket(token, handleIncomingMessage, () => {
      fetchMessages();
    });

    return () => {
      disconnectSocket();
    };
  }, [token, mounted]);

  useEffect(() => {
    if (messages.length > 0 && !initialLoadDone) {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
      setInitialLoadDone(true);
    }
  }, [messages.length, initialLoadDone]);

  useEffect(() => {
    if (loading || !hasMore) return;
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop < 50 && !loading && hasMore) {
        const cursor = messages[0]?.id;
        if (cursor) {
          setLoading(true);
          setTimeout(() => fetchMessages(cursor), 2000);
        }
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [messages, loading, hasMore]);

  const fetchMessages = async (cursor?: number) => {
    try {
      const url = cursor
        ? `${process.env.NEXT_PUBLIC_API_URL}/chat/messages?cursor=${cursor}`
        : `${process.env.NEXT_PUBLIC_API_URL}/chat/messages`;
      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (res.ok) {
        if (data.length === 0) setHasMore(false);

        const sorted = [...data].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );

        setMessages((prev) => {
          const newIds = new Set(prev.map((m) => m.id));
          const filtered = sorted.filter((m) => !newIds.has(m.id));

          if (cursor) {
            // 유지 중인 스크롤 위치 계산
            const container = containerRef.current;
            const prevHeight = container?.scrollHeight ?? 0;

            const updated = [...filtered, ...prev];
            setTimeout(() => {
              const newHeight = container?.scrollHeight ?? 0;
              if (container) container.scrollTop = newHeight - prevHeight;
            }, 0);

            return updated;
          } else {
            return sorted;
          }
        });
      }
    } catch (err) {
      console.error("메시지 로드 실패:", err);
    }
    setLoading(false);
  };

  const handleIncomingMessage = (msg: ChatMessage) => {
    setMessages((prev) => {
      const exists = prev.some((m) => m.id === msg.id);
      if (exists) return prev;
      return [...prev, msg];
    });
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = (content: string) => {
    try {
      getSocket().emit("chat", { content });
    } catch (err) {
      console.error("메시지 전송 실패:", err);
    }
  };

  const handleDeleteMessage = async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error("메시지 삭제 실패:", err);
    }
  };

  const isMine = (userId: number) => {
    try {
      const payload = JSON.parse(atob(token!.split(".")[1]));
      return payload.sub === userId;
    } catch {
      return false;
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col w-[400px] h-[600px] border rounded-xl overflow-hidden">
      <div ref={containerRef} className="flex-1 overflow-y-auto p-2 space-y-2">
        {loading && (
          <div className="text-center text-sm text-gray-400 pb-2">
            불러오는 중...
          </div>
        )}
        <ChatMessages
          messages={messages.map((msg) => ({
            ...msg,
            isMine: isMine(msg.userId),
            isAdmin: nickname === "관리자",
          }))}
          onDelete={handleDeleteMessage}
        />
        <div ref={bottomRef} />
      </div>

      <div className="border-t px-4 py-2">
        {token ? (
          <ChatInput onSubmit={handleSend} />
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-2">
              채팅하려면 로그인하세요.
            </p>
            <SimpleLoginForm onSuccess={() => location.reload()} />
          </>
        )}
      </div>
    </div>
  );
}
