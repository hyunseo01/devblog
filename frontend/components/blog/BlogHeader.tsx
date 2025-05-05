"use client";

import { useEffect, useState } from "react";
import WorkHeaderSearch from "@/components/work/WorkHeader/WorkHeaderSearch";
import WorkHeaderBasicTags from "@/components/work/WorkHeader/WorkHeaderBasicTags";
import { useSearchParams } from "next/navigation";
import { parseBoardQueryState } from "@/func/queryState";

type BoardCategory = {
  id: number;
  slug: string;
  label: string;
};

type BlogHeaderProps = {
  onSearch: (qs: string) => void;
  selectedCategorySlug?: string;
};

export default function BlogHeader({
  onSearch,
  selectedCategorySlug,
}: BlogHeaderProps) {
  const searchParams = useSearchParams();
  const parsed = parseBoardQueryState(searchParams.toString());

  const [search, setSearch] = useState(parsed.search ?? "");
  const [sortOption, setSortOption] = useState(parsed.sort ?? "latest");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<BoardCategory[]>([]);

  // 카테고리 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/board-category`,
        );
        const data = await res.json();
        if (!res.ok) throw new Error("카테고리 불러오기 실패");
        setCategories(data);
      } catch (err) {
        console.error("카테고리 로딩 실패", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategorySlug || categories.length === 0) return;

    const matched = categories.find((c) => c.slug === selectedCategorySlug);
    setSelectedCategory(matched ? matched.id : null);
  }, [selectedCategorySlug, categories]);

  const handleCategoryClick = (id: number) => {
    setSelectedCategory((prev) => (prev === id ? null : id));
  };

  const handleSearchClick = () => {
    const qs = new URLSearchParams();

    if (search) qs.append("search", search);
    if (sortOption) qs.append("sort", sortOption);

    const selectedSlug = categories.find(
      (c) => c.id === selectedCategory,
    )?.slug;
    if (selectedSlug) qs.append("category", selectedSlug);

    qs.append("page", "1");
    qs.append("pageSize", "5");

    onSearch(qs.toString());
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl px-4">
        <WorkHeaderSearch
          search={search}
          sortOption={sortOption}
          setSearch={setSearch}
          setSortOption={setSortOption}
          handleSearch={handleSearchClick}
        />
        <WorkHeaderBasicTags
          basicTags={categories.map((c) => ({ id: c.id, name: c.label }))}
          selectedTags={selectedCategory !== null ? [selectedCategory] : []}
          handleTagClick={(id) => handleCategoryClick(id)}
        />
      </div>
    </div>
  );
}
