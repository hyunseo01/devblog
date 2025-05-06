"use client";

import { ReactNode, useState } from "react";
import { X } from "lucide-react";
import ProjectLeftSection from "./ProjectLeftSection";
import ProjectRightSection from "./ProjectRightSection";

type ProjectCardProps = {
  id: number;
  title: string;
  desc: ReactNode;
};

type ButtonSet = {
  keyword: string[];
  development: string[];
  post: string[];
};

const detailTextMap: Record<number, Record<string, string>> = {
  1: {
    "keyword-0": "1번 프로젝트 관련내용 1 설명입니다.",
    "keyword-1": "테스트",
    "keyword-2": "테스트2",
    "problem-0": "테스트3",
    "problem-1": "테스트4",
    "problem-2": "테스트5",
    "problem-3": "테스트6",
    "problem-4": "테스트7",
    "improve-0": "테스트8",
    "improve-1": "테스트9",
    "improve-2": "테스트10",
    "improve-3": "테스트11",
    "improve-4": "테스트12",
  },
  2: {
    "keyword-0": "2번 프로젝트 관련내용 1 설명입니다.",
    // ...
  },
  // ...
};

const buttonMap: Record<number, ButtonSet> = {
  1: {
    keyword: ["아키텍처 설계", "데이터베이스 설계", "API 설계"],
    development: [
      "아키텍처 설계",
      "데이터베이스 설계",
      "API 설계",
      "문제해결1",
      "문제해결2",
    ],
    post: [
      "회고 및 개선점",
      "UI 개선사항",
      "상태 관리 개선",
      "네이밍 개선",
      "디자인 리팩토링",
    ],
  },
  2: {
    keyword: ["준비 중..."],
    development: ["추후 추가..."],
    post: ["추후 추가..."],
  },
  // ...
};

export default function ProjectCard({ id, title, desc }: ProjectCardProps) {
  const [activeDetail, setActiveDetail] = useState<string | null>(null);

  const detailText =
    (id && activeDetail && detailTextMap[id]?.[activeDetail]) ??
    "상세 내용을 준비 중입니다.";

  const buttons: ButtonSet = buttonMap[id] ?? {
    keyword: [],
    development: [],
    post: [],
  };

  return (
    <div className="w-full h-[70vh] bg-white rounded-lg shadow-md flex overflow-hidden relative">
      <ProjectLeftSection
        title={title}
        desc={desc}
        items={buttons.keyword}
        onSelect={(key) => setActiveDetail(key)}
      />

      <ProjectRightSection
        onSelect={(key) => setActiveDetail(key)}
        devPhaseButtons={buttons}
      />

      {activeDetail && (
        <div className="absolute top-1/2 left-1/2 w-[90%] h-[90%] -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded shadow-xl z-20 p-6 flex flex-col">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setActiveDetail(null)}
              className="text-gray-500 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto text-sm text-gray-800 whitespace-pre-line leading-relaxed">
            {detailText}
          </div>
        </div>
      )}
    </div>
  );
}
