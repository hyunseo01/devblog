"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import WorkHeader from "@/components/work/WorkHeader/WorkHeader";
import Pagination from "@/components/common/Pagination";
import ItemCardFrame from "@/components/common/ItemCardFrame";
import { parseWorkQueryState, buildWorkQueryString } from "@/func/queryState";

type Work = {
  id: number;
  title: string;
  preview: string;
  createdAt: string;
  tags: { id: number; name: string }[];
};

export default function WorkListPage() {
  const searchParams = useSearchParams();
  const initialState = parseWorkQueryState(searchParams.toString());

  const [works, setWorks] = useState<Work[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(
    initialState.tagIds,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWorks = async () => {
    const state = parseWorkQueryState(searchParams.toString());
    const qs = buildWorkQueryString(state);

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/work?${qs}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "작업물 조회 실패");
      setWorks(data.data.items);
      setTotalPages(Math.ceil(data.data.total / data.data.pageSize));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, [searchParams.toString()]);

  const updateQuery = (newState: {
    search: string;
    tagIds: number[];
    page: number;
    pageSize: number;
    sortBy: string;
  }) => {
    setSelectedTagIds(newState.tagIds);
    const newQuery = buildWorkQueryString(newState);
    window.history.replaceState(null, "", `/works?${newQuery}`);
  };

  const handleSearch = (qs: string) => {
    const parsed = parseWorkQueryState(qs);
    parsed.page = 1;
    updateQuery(parsed);
  };

  const handlePageChange = (page: number) => {
    const current = parseWorkQueryState(searchParams.toString());
    updateQuery({ ...current, page });
  };

  return (
    <>
      <WorkHeader onSearch={handleSearch} selectedTagIds={selectedTagIds} />

      {loading ? (
        <p>불러오는 중...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : works.length === 0 ? (
        <p>등록된 작업물이 없습니다.</p>
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-4 mt-6 space-y-4">
            {works.map((work) => (
              <ItemCardFrame
                key={work.id}
                title={work.title}
                preview={
                  work.preview.length !== 50
                    ? work.preview
                    : work.preview + "..."
                }
                date={work.createdAt}
                href={`/works/${work.id}`}
              >
                {work.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-xs px-2 py-0.5 bg-gray-200 rounded"
                  >
                    {tag.name}
                  </span>
                ))}
              </ItemCardFrame>
            ))}
          </div>
          <Pagination
            currentPage={parseWorkQueryState(searchParams.toString()).page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-6"
          />
        </>
      )}
    </>
  );
}
