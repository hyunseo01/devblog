"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DetailHeader from "@/components/common/detail/DetailHeader";
import DetailContent from "@/components/common/detail/DetailContent";
import CommentList from "@/components/CommentList";
import CommentInput from "@/components/CommentInput";

export type BoardDetail = {
  id: number;
  title: string;
  content: string;
  category: string;
  highlighted: boolean;
  createdAt: string;
  comments: {
    id: number;
    nickname: string;
    content: string;
    createdAt: string;
  }[];
};

export default function BoardDetail() {
  const { id } = useParams();
  const [board, setBoard] = useState<BoardDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchBoard = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/boards/${id}`,
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "게시글 조회 실패");
      setBoard(data.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [id]);

  const handleCommentSuccess = () => {
    setRefreshKey((prev) => prev + 1);
    fetchBoard(); // 댓글 반영 위해 다시 조회
  };

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!board) return <p>게시글이 존재하지 않습니다.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-6">
      <DetailHeader
        title={board.title}
        tagsOrCategory={board.category}
        date={new Date(board.createdAt).toLocaleDateString()}
        badge={board.highlighted ? "추천" : undefined}
      />

      <DetailContent content={board.content} />

      <hr className="my-6" />

      <section>
        <h2 className="font-semibold text-lg mb-2">댓글</h2>
        <CommentInput
          type="board"
          id={board.id}
          onSuccess={handleCommentSuccess}
        />
        <div className="h-2" />
        <CommentList type="board" id={board.id} refreshTrigger={refreshKey} />
      </section>
    </div>
  );
}
