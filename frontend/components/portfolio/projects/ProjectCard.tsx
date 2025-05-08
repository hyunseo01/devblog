"use client";

import { ReactNode, useState } from "react";
import { X } from "lucide-react";
import ProjectLeftSection from "./ProjectLeftSection";
import ProjectRightSection from "./ProjectRightSection";
import Link from "next/link";

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

const detailTextMap: Record<number, Record<string, ReactNode>> = {
  1: {
    "keyword-0":
      "시스템 아키텍처 구성\n" +
      "\n" +
      "1. 클라이언트 (브라우저)\n" +
      "   └─ 정적 사이트 (Vercel 배포)\n" +
      "      └─ https://www.devblog.work\n" +
      "\n" +
      "2. API 서버 (NestJS)\n" +
      "   └─ AWS EC2 (프리티어 인스턴스, Ubuntu 24.04)\n" +
      "   └─ PM2로 실행되는 NestJS 서버\n" +
      "   └─ HTTPS + 리버스 프록시: Nginx + Let’s Encrypt SSL\n" +
      "   └─ 도메인: https://api.devblog.work\n" +
      "\n" +
      "3. 데이터베이스\n" +
      "   └─ MySQL 8 (Docker 컨테이너로 실행)\n" +
      "   └─ localhost:3306 에서 NestJS와 통신\n" +
      "   └─ 볼륨 마운트 X → 서버 재부팅 시 데이터 유실 가능 (현재 상태)\n" +
      "\n" +
      "4. 배포 방식\n" +
      "   - 프론트: GitHub 연동된 Vercel CI/CD로 자동 빌드/배포\n" +
      "   - 백엔드: 로컬에서 npm run build 후 SCP로 dist/main.js 전송, PM2로 실행\n" +
      "   - 도메인: name.com에서 구입한 도메인 연결 (A레코드, CNAME 설정 완료)",
    "keyword-1": (
      <div>
        <p className="mb-2">데이터베이스 ERD 다이어그램입니다</p>
        <img src="/75.png" alt="구조도" className="rounded shadow w-full" />
      </div>
    ),
    "keyword-2": (
      <Link
        href="https://api.devblog.work/api"
        className="text-blue-600 underline"
      >
        API 문서 링크입니다
      </Link>
    ),
    "problem-0":
      "1. EC2에 서버와 DB를 동시에 올려 CPU 과부하 발생\n" +
      "NestJS 서버와 MySQL을 EC2에 직접 띄운 상태로 배포했더니,\n" +
      "서버 시작 시점에 CPU 사용량이 급격히 상승해 인스턴스가 멈췄다.\n" +
      "리소스 부족 문제로 서버 접속이 불가해지고 관리도 어려워졌다.\n" +
      "해결을 위해 서버는 로컬에서 빌드 후 dist/만 업로드하고,\n" +
      "MySQL은 Docker 컨테이너로 분리해 실행 안정성을 확보했다.\n\n" +
      "2. Vercel 프론트와 EC2 서버 간 HTTPS 불일치 문제\n" +
      "Vercel에 배포한 프론트는 HTTPS를 사용하지만,\n" +
      "EC2 서버는 HTTP만 지원해 브라우저가 API 요청을 차단했다.\n" +
      "HTTPS와 HTTP 간 보안 정책 충돌로 프론트에서 API 연결이 거절된 것이다.\n" +
      "Nginx를 리버스 프록시로 설정하고 Certbot으로 SSL 인증서를 적용해 해결했다.\n" +
      "\n",

    "problem-1":
      "1. 태그 필터링이 정확히 작동하지 않음\n" +
      "문제: 여러 태그를 선택했을 때, 해당 태그 중 하나만 포함된 작업물도 결과에 포함됨.\n" +
      "원인: WHERE tag.id IN (...) 조건만 사용하면 OR 조건처럼 동작하기 때문.\n" +
      "해결: GROUP BY work.id와 HAVING COUNT(DISTINCT tag.id) = 선택한 태그 수 조건을 추가해\n" +
      "모든 태그를 포함한 작업물만 조회되도록 수정함.\n\n" +
      " 2. TypeORM의 단순 where 조건이 다대다 필터링에서 실패함\n" +
      "문제: FindOptionsWhere를 사용했을 때 태그 다대다 관계에서 필터링이 작동하지 않음.\n" +
      "원인: TypeORM의 기본 where 옵션은 관계형 조건을 세밀하게 처리하지 못함.\n" +
      "해결: QueryBuilder를 직접 사용해 JOIN, WHERE, HAVING 조건을 세부적으로 구성해 해결함.\n\n",
    "problem-2":
      "댓글을 작성해도 새로고침전까지 리스트에 반영이 안됨\n" +
      "문제: 댓글을 등록해도 즉시 화면에 반영되지 않고 새로고침이 필요함.\n" +
      "원인: 댓글 리스트가 내부 상태로만 관리되고 있어 외부 갱신 트리거를 받지 못했음.\n" +
      "해결: 댓글 리스트 상태를 상위 컴포넌트로 올려서\n" +
      "댓글 등록 후 fetchComments()를 호출해 즉시 갱신되도록 수정함.",
    "problem-3": "테스트6",
    "problem-4": "테스트7",
    "improve-0":
      "블로그 1차 개발/배포 하면서 아쉬운점/개선점:\n" +
      "1. 코드가 개판임 코드 리팩토링 후 2차 기획 시작\n" +
      "2. 2차 개발을 고려하지 않고 데이터베이스 설계를 진행해서 추후 블로그를 사용하여 작성할 블로거들을 위한 데이터베이스 설계를 위해 갈아엎어야됨\n" +
      "3. 이미지 저장 로직을 담당하는 서버를 분리해뒀는데 사용을 못함 현재 스프링부트로 개발되어있는데 MSA 아키텍처를 적용하기에는 규모가 작아 2차 개발 시작 시 Nest서버로 통합\n" +
      "4. 기획 단계가 제대로 진행되지 않아서 개발 도중 자주 기획이 변경되어 구조가 개판난 원인중 하나 2차 개발전 기획을 확실히 하고 핵심 산출물(기능명세, api명세, DB설계)을 마무리 하고 개발 시작\n",
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
      "배포 중 에러와 해결 방법",
      "서버 개발 중 에러와 해결 방법",
      "프론트 개발 중 에러와 해결 방법",
    ],
    post: ["회고 및 개선점"],
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
    <div className="w-full h-[70vh] bg-white rounded-lg shadow-md flex relative overflow-y-scroll">
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
