"use client";

import { useState } from "react";
import WorkHeaderSearch from "./WorkHeaderSearch";
import WorkHeaderBasicTags from "./WorkHeaderBasicTags";
import WorkHeaderExpandedTags from "./WorkHeaderExpandedTags";
import { useSearchParams } from "next/navigation";
import { parseWorkQueryState } from "@/func/queryState";

type WorkHeaderProps = {
  onSearch: (queryString: string) => void;
  selectedTagIds: number[];
};

export default function WorkHeader({
  onSearch,
  selectedTagIds,
}: WorkHeaderProps) {
  const searchParams = useSearchParams();
  const parsed = parseWorkQueryState(searchParams.toString());

  const [search, setSearch] = useState(parsed.search ?? "");
  const [sortOption, setSortOption] = useState(parsed.sortBy ?? "latest");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTags, setSelectedTags] = useState<number[]>(
    selectedTagIds ?? [],
  );

  const basicTags = [
    { id: 3, name: "포트폴리오" },
    { id: 1, name: "팀" },
    { id: 6, name: "백엔드 위주" },
    { id: 20, name: "Spring Boot" },
    { id: 18, name: "NestJS" },
    { id: 27, name: "배포 완료" },
  ];

  const fullTagGroups = [
    {
      title: "개발 방식",
      singleSelect: true,
      tags: [
        { id: 1, name: "팀" },
        { id: 2, name: "개인" },
      ],
    },
    {
      title: "작업물 성격",
      singleSelect: true,
      tags: [
        { id: 3, name: "포트폴리오" },
        { id: 4, name: "테스트" },
        { id: 5, name: "연습" },
      ],
    },
    {
      title: "프로젝트 타입",
      singleSelect: true,
      tags: [
        { id: 6, name: "백엔드 위주" },
        { id: 7, name: "프론트 위주" },
        { id: 8, name: "풀스택" },
      ],
    },
    {
      title: "개발 언어",
      singleSelect: false,
      tags: [
        { id: 9, name: "Java" },
        { id: 10, name: "JavaScript" },
        { id: 11, name: "TypeScript" },
        { id: 12, name: "HTML" },
        { id: 13, name: "CSS" },
        { id: 14, name: "SQL" },
        { id: 15, name: "Python" },
      ],
    },
    {
      title: "프레임워크",
      singleSelect: false,
      tags: [
        { id: 16, name: "Spring Boot" },
        { id: 17, name: "Node.js" },
        { id: 18, name: "NestJS" },
        { id: 19, name: "Express" },
      ],
    },
    {
      title: "라이브러리/툴",
      singleSelect: false,
      tags: [
        { id: 20, name: "React" },
        { id: 21, name: "JPA" },
        { id: 22, name: "TailwindCSS" },
        { id: 23, name: "MyBatis" },
      ],
    },
    {
      title: "데이터베이스",
      singleSelect: false,
      tags: [
        { id: 24, name: "MySQL" },
        { id: 25, name: "OracleDB" },
        { id: 26, name: "Firebase" },
      ],
    },
    {
      title: "배포 여부",
      singleSelect: true,
      tags: [
        { id: 27, name: "배포 완료" },
        { id: 28, name: "부분 배포됨" },
      ],
    },
    {
      title: "배포 플랫폼",
      singleSelect: false,
      tags: [
        { id: 29, name: "AWS" },
        { id: 30, name: "Vercel" },
        { id: 31, name: "Netlify" },
        { id: 32, name: "Render" },
      ],
    },
    {
      title: "사용 툴",
      singleSelect: false,
      tags: [
        { id: 33, name: "IntelliJ" },
        { id: 34, name: "Eclipse" },
        { id: 35, name: "VSCode" },
        { id: 36, name: "WebStorm" },
      ],
    },
  ];

  const handleTagClick = (tagId: number, singleSelect: boolean) => {
    if (singleSelect) {
      const group = fullTagGroups.find((g) =>
        g.tags.some((tag) => tag.id === tagId),
      );
      if (group) {
        const groupTagIds = group.tags.map((tag) => tag.id);
        setSelectedTags((prev) =>
          prev
            .filter((id) => !groupTagIds.includes(id))
            .concat(prev.includes(tagId) ? [] : [tagId]),
        );
      }
    } else {
      setSelectedTags((prev) =>
        prev.includes(tagId)
          ? prev.filter((id) => id !== tagId)
          : [...prev, tagId],
      );
    }
  };

  const handleSearch = () => {
    const query = new URLSearchParams();

    if (search) query.append("search", search);
    if (sortOption) query.append("sortBy", sortOption);
    selectedTags.forEach((tagId) => query.append("tagIds", tagId.toString()));
    query.append("page", "1");
    query.append("pageSize", "5");

    const queryString = query.toString();
    console.log("📦 [Header] 전달할 쿼리스트링:", queryString);

    onSearch(queryString);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl px-4">
        <WorkHeaderSearch
          search={search}
          sortOption={sortOption}
          setSearch={setSearch}
          setSortOption={setSortOption}
          handleSearch={handleSearch}
        />
        {!isExpanded ? (
          <WorkHeaderBasicTags
            basicTags={basicTags}
            selectedTags={selectedTags}
            handleTagClick={handleTagClick}
            toggleExpand={() => setIsExpanded(true)}
          />
        ) : (
          <WorkHeaderExpandedTags
            fullTagGroups={fullTagGroups}
            selectedTags={selectedTags}
            handleTagClick={handleTagClick}
            toggleExpand={() => setIsExpanded(false)}
          />
        )}
      </div>
    </div>
  );
}
