"use client";

import { useState } from "react";
import { useAuth } from "@/libs/store/useAuth";
import SimpleLoginForm from "@/components/SimpleLoginForm";

type Props = {
  type: "work" | "board";
  id: number;
  onSuccess?: () => void; // 댓글 등록 후 콜백
};

export default function CommentInput({ type, id, onSuccess }: Props) {
  const { token, nickname } = useAuth();
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          commentableType: type,
          commentableId: id,
          content,
          nickname,
          password: "0000",
        }),
      });

      const data = await res.json(); // ✅ 이거 필수!

      if (!res.ok) throw new Error(data.message || "댓글 작성 실패");

      setContent("");
      onSuccess?.();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token)
    return <SimpleLoginForm onSuccess={() => console.log("로그인됨")} />;

  return (
    <div className="space-y-2">
      <textarea
        className="w-full border p-2 rounded"
        placeholder="댓글을 입력하세요"
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded"
        disabled={isSubmitting}
      >
        {isSubmitting ? "작성 중..." : "댓글 작성"}
      </button>
    </div>
  );
}
