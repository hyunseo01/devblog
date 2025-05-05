"use client";

import { useState } from "react";

type Comment = {
  id: number;
  content: string;
  nickname: string;
  createdAt: string;
};

type Props = {
  comment: Comment;
  onDelete?: () => void;
  onUpdate?: () => void;
};

export default function CommentItem({ comment, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setError(null);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/${comment.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      },
    );

    const data = await res.json();
    if (!res.ok) return setError(data.message || "삭제 실패");

    onDelete?.();
  };

  const handleUpdate = async () => {
    setError(null);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/${comment.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, content }),
      },
    );

    const data = await res.json();
    if (!res.ok) return setError(data.message || "수정 실패");

    setIsEditing(false);
    onUpdate?.();
  };

  return (
    <li className="border p-3 rounded space-y-1">
      <div className="text-sm font-bold">{comment.nickname}</div>
      {isEditing ? (
        <textarea
          className="w-full border p-1 rounded text-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <div className="text-sm">{comment.content}</div>
      )}
      <div className="text-xs text-gray-500">
        {new Date(comment.createdAt).toLocaleString()}
      </div>

      <div className="flex gap-2 mt-2 text-sm">
        {!isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600"
            >
              수정
            </button>
            <button
              onClick={() => setIsDeleting(true)}
              className="text-red-600"
            >
              삭제
            </button>
          </>
        )}
        {isEditing && (
          <>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-2 py-1 rounded text-sm"
            />
            <button onClick={handleUpdate} className="text-green-600">
              완료
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-600"
            >
              취소
            </button>
          </>
        )}
        {isDeleting && (
          <>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-2 py-1 rounded text-sm"
            />
            <button onClick={handleDelete} className="text-red-600">
              확인
            </button>
            <button
              onClick={() => setIsDeleting(false)}
              className="text-gray-600"
            >
              취소
            </button>
          </>
        )}
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}
    </li>
  );
}
