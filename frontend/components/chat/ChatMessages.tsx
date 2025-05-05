"use client";

import ChatMessageItem from "./ChatMessageItem";
import type { ChatMessage } from "@/types/chat";

type Props = {
  messages: ChatMessage[];
  onDelete?: (id: number) => void;
};

export default function ChatMessages({ messages, onDelete }: Props) {
  return (
    <div className="flex-1 overflow-y-auto space-y-2 p-2">
      {messages.map((msg) => (
        <ChatMessageItem
          key={msg.id}
          nickname={msg.nickname}
          content={msg.content}
          createdAt={msg.createdAt}
          isMine={msg.isMine}
          isAdmin={msg.isAdmin}
          onDelete={onDelete ? () => onDelete(msg.id) : undefined}
        />
      ))}
    </div>
  );
}
