"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BlogHeader from "@/components/blog/BlogHeader";
import ItemCardFrame from "@/components/common/ItemCardFrame";
import Pagination from "@/components/common/Pagination";
import { parseBoardQueryState, buildBoardQueryString } from "@/func/queryState";

type Board = {
  id: number;
  title: string;
  preview: string;
  createdAt: string;
  category: string;
  highlighted: boolean;
};

export default function BoardListPage() {
  const searchParams = useSearchParams();
  const [boards, setBoards] = useState<Board[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBoards = async () => {
    const state = parseBoardQueryState(searchParams.toString());
    const qs = buildBoardQueryString(state);

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/boards?${qs}`,
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "게시글 조회 실패");
      setBoards(data.data.items);
      setTotalPages(Math.ceil(data.data.total / data.data.pageSize));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, [searchParams.toString()]);

  const updateQuery = (newState: {
    search: string;
    sort: string;
    category: string;
    page: number;
    pageSize: number;
  }) => {
    const newQuery = buildBoardQueryString(newState);
    window.history.replaceState(null, "", `/boards?${newQuery}`);
  };

  const handleSearch = (qs: string) => {
    const parsed = parseBoardQueryState(qs);
    parsed.page = 1;
    updateQuery(parsed);
  };

  const handlePageChange = (page: number) => {
    const current = parseBoardQueryState(searchParams.toString());
    updateQuery({ ...current, page });
  };

  return (
    <>
      <BlogHeader
        onSearch={handleSearch}
        selectedCategorySlug={
          parseBoardQueryState(searchParams.toString()).category
        }
      />

      {loading ? (
        <p>불러오는 중...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : boards.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <div className="max-w-7xl mx-auto px-4 mt-6 space-y-4">
          {boards.map((board) => (
            <ItemCardFrame
              key={board.id}
              title={board.title}
              preview={board.preview}
              date={board.createdAt}
              href={`/boards/${board.id}`}
            >
              <div className="flex gap-1 text-xs">
                {board.highlighted && (
                  <span className="bg-yellow-200 text-gray-600 px-2 py-0.5 rounded font-semibold">
                    강조
                  </span>
                )}
                <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                  {board.category}
                </span>
              </div>
            </ItemCardFrame>
          ))}
          <Pagination
            currentPage={parseBoardQueryState(searchParams.toString()).page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-6"
          />
        </div>
      )}
    </>
  );
}
