"use client";

import { useEffect, useState } from "react";

type Comment = {
  id: number;
  content: string;
  nickname: string;
  createdAt: string;
};

type Props = {
  type: "work" | "board";
  id: number;
  refreshTrigger?: number;
};

export default function CommentList({ type, id, refreshTrigger }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comment?type=${type}&id=${id}`,
    );
    const data = await res.json();
    if (res.ok) setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, [type, id, refreshTrigger]);

  if (comments.length === 0) {
    return <p className="text-sm text-gray-500">아직 댓글이 없습니다.</p>;
  }

  return (
    <ul className="space-y-2">
      {comments.map((c) => (
        <li key={c.id} className="border p-2 rounded">
          <div className="text-sm">{c.content}</div>
          <div className="text-xs text-gray-500">
            {c.nickname} · {new Date(c.createdAt).toLocaleString()}
          </div>
        </li>
      ))}
    </ul>
  );
}
