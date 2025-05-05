"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function WorkHeader() {
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const basicTags = [
    "포트폴리오",
    "팀",
    "백엔드",
    "Spring Boot",
    "NestJS",
    "배포 완료",
  ];

  const fullTagGroups = [
    { title: "개발 방식", tags: ["팀", "개인"], singleSelect: true },
    {
      title: "작업물 성격",
      tags: ["포트폴리오", "테스트", "연습"],
      singleSelect: true,
    },
    {
      title: "프로젝트 타입",
      tags: ["백엔드 위주", "프론트 위주", "풀스택"],
      singleSelect: true,
    },
    {
      title: "개발 언어",
      tags: [
        "Java",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "SQL",
        "Python",
      ],
      singleSelect: false,
    },
    {
      title: "프레임워크",
      tags: ["Spring Boot", "Node.js", "NestJS", "Express"],
      singleSelect: false,
    },
    {
      title: "라이브러리/툴",
      tags: ["React", "JPA", "TailwindCSS", "MyBatis"],
      singleSelect: false,
    },
    {
      title: "데이터베이스",
      tags: ["MySQL", "Oracle", "Firebase"],
      singleSelect: false,
    },
    {
      title: "배포 여부",
      tags: ["배포 완료", "일부 배포", "미배포"],
      singleSelect: true,
    },
    {
      title: "사용 툴",
      tags: ["IntelliJ", "Eclipse", "VS", "VSCode", "WebStorm"],
      singleSelect: false,
    },
  ];

  const handleTagClick = (tag: string, singleSelect: boolean) => {
    if (singleSelect) {
      const relatedTags =
        fullTagGroups.find((group) => group.tags.includes(tag))?.tags || [];
      setSelectedTags(
        (prev) =>
          [
            ...prev.filter((t) => !relatedTags.includes(t)),
            prev.includes(tag) ? undefined : tag,
          ].filter(Boolean) as string[],
      );
    } else {
      if (selectedTags.includes(tag)) {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
      } else {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleSearch = () => {
    console.log({ search, selectedTags, sortOption });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl px-4">
        {/* 검색바 + 정렬 + 검색 버튼 */}
        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 min-w-[200px] p-2 border rounded-md text-black"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-[120px] p-2 border rounded-md text-black"
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="popular">인기순</option>
          </select>
          <button
            onClick={handleSearch}
            className="w-[120px] p-2 border rounded-md bg-gray-800 text-white"
          >
            검색
          </button>
        </div>

        {/* 태그 리스트 or 펼침 */}
        {!isExpanded ? (
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-wrap gap-2">
              {basicTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag, false)}
                  className={`px-3 py-1 rounded-full ${
                    selectedTags.includes(tag)
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 px-2 py-1 text-sm"
            >
              더 보기
              <FaChevronDown />
            </button>
          </div>
        ) : (
          <div className="border rounded-md overflow-hidden">
            <div className="p-4 grid gap-2">
              {fullTagGroups.map((group, idx) => (
                <div
                  key={group.title}
                  className="grid grid-cols-12 items-center"
                >
                  <div className="col-span-2 text-sm font-semibold text-left">
                    {group.title}
                  </div>
                  <div className="col-span-10 flex flex-wrap gap-2 items-center">
                    {group.tags.map((tag) => (
                      <label key={tag} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag)}
                          onChange={() =>
                            handleTagClick(tag, group.singleSelect)
                          }
                          className="accent-gray-800"
                        />
                        <span className="text-sm">{tag}</span>
                      </label>
                    ))}
                    {idx === 0 && (
                      <button
                        onClick={() => setIsExpanded(false)}
                        className="ml-auto flex items-center gap-1 px-2 py-1 text-sm"
                      >
                        접기
                        <FaChevronUp />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
