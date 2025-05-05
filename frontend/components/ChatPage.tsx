"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/libs/store/useAuth";
import {
  connectSocket,
  getSocket,
  disconnectSocket,
} from "@/libs/socket/chatSocket";
import { parseJwt } from "@/libs/utils/parseJwt";
import type { ChatMessage } from "@/types/chat";

export default function ChatPage() {
  const { token } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [content, setContent] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 1. 초기 메시지 fetch
  const fetchMessages = async () => {
    if (!token) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat/messages`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await res.json();
    setMessages(data);
  };

  // 2. WebSocket 연결 + 메시지 수신 처리
  useEffect(() => {
    console.log("useEffect 진입", token);

    if (!token) return;

    console.log("토큰 -> 소켓 연결 시도");
    connectSocket(token);
    const socket = getSocket();

    socket.on("connect", () => console.log("소켓 연결됨"));
    socket.on("chat", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat");
      socket.off("connect");
      disconnectSocket();
    };
  }, [token]);

  // 3. 초기 메시지 요청
  useEffect(() => {
    fetchMessages();
  }, []);

  // 4. 메시지 전송
  const sendMessage = () => {
    if (!content.trim()) return;
    getSocket().emit("chat", { content });
    setContent("");
  };

  // 5. 스크롤 아래로
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getUserId = () => {
    try {
      return token ? parseJwt(token).sub : null;
    } catch {
      return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col h-[80vh] border p-4 space-y-2">
      <div className="flex-1 overflow-y-auto space-y-1">
        {messages.map((m) => {
          const isMine = getUserId() === m.userId;
          return (
            <div
              key={m.id}
              className={`text-sm px-3 py-2 rounded max-w-[70%] ${
                isMine
                  ? "bg-blue-100 self-end text-right"
                  : "bg-gray-100 self-start text-left"
              }`}
            >
              {!isMine && <div className="font-bold">{m.nickname}</div>}
              <div>{m.content}</div>
              <div className="text-xs text-gray-500">
                {new Date(m.createdAt).toLocaleString()}
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      <div className="flex gap-2 mt-2">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="메시지를 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="px-4 py-2 bg-black text-white rounded"
          onClick={sendMessage}
        >
          전송
        </button>
      </div>
    </div>
  );
}
