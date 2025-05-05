"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DetailHeader from "@/components/common/detail/DetailHeader";
import DetailContent from "@/components/common/detail/DetailContent";
import CommentList from "@/components/CommentList";
import CommentInput from "@/components/CommentInput";

export type WorkDetail = {
  id: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  projectUrl?: string;
  repoUrl?: string;
  highlighted: boolean;
  tags: { id: number; name: string }[];
  createdAt: string;
};

export default function WorkDetail() {
  const { id } = useParams();
  const [work, setWork] = useState<WorkDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/work/${id}`,
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "작업물 조회 실패");
        setWork(data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchWork();
  }, [id]);

  const handleCommentSuccess = () => setRefreshKey((prev) => prev + 1);

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!work) return <p>작업물이 존재하지 않습니다.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-6">
      <DetailHeader
        title={work.title}
        tagsOrCategory={work.tags.map((tag) => tag.name)}
        date={`${work.startDate} ~ ${work.endDate}`}
        badge={work.highlighted ? "추천" : undefined}
      />

      <DetailContent content={work.content} />

      <div className="flex gap-3 overflow-x-auto text-sm">
        {work.projectUrl && (
          <a
            href={work.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 border rounded whitespace-nowrap hover:underline"
          >
            프로젝트 링크
          </a>
        )}
        {work.repoUrl && (
          <a
            href={work.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 border rounded whitespace-nowrap hover:underline"
          >
            GitHub 저장소
          </a>
        )}
      </div>

      <hr className="my-6" />

      <section>
        <h2 className="font-semibold text-lg mb-2">댓글</h2>
        <CommentInput
          type="work"
          id={work.id}
          onSuccess={handleCommentSuccess}
        />
        <div className="h-2" />
        <CommentList type="work" id={work.id} refreshTrigger={refreshKey} />
      </section>
    </div>
  );
}
