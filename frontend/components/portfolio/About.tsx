"use client";

import BlogButton from "@/components/portfolio/BlogButton";

export default function About() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-8 bg-white snap-start">
      <h2 className="text-5xl font-bold mb-12">About Me</h2>
      <div className="flex flex-col gap-8 max-w-4xl w-full">
        {/* Q1 */}
        <div className="p-6 bg-gray-50 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">
            Q1. 백엔드 개발자로서의 강점과 주요 경험은 무엇인가요?
          </h3>
          <p className="text-gray-700 leading-relaxed">
            저는 클라이언트 요구사항을 충실히 반영하고, API 응답 데이터의
            표준화를 준수하는 것을 개발의 핵심 가치로 삼고 있습니다. NestJS와
            Spring Boot 두 가지 기술 스택을 상황과 요구사항에 따라 적절히
            선택하여 활용하고 있으며, 안정성과 확장성을 고려한 API 설계에
            집중하고 있습니다. 실제 설계 경험으로는, JWT 기반 인증 방식을
            도입하여 로그인 상태를 유지하고, API 접근 권한을 체계적으로 제어한
            경험, 페이징 및 필터링 기능을 적용한 게시판 API, 그리고 비동기 통신
            및 Cursor 기반 페이징 기법을 활용한 실시간 채팅방 API 설계 및 구현
            등이 있습니다. 이러한 경험을 통해 다양한 도메인에서 API 흐름 설계,
            데이터 구조 정의, 인증 및 보안 처리에 이르기까지 백엔드 전반에 걸친
            실무 역량을 탄탄하게 쌓아왔습니다
          </p>
        </div>

        {/* Q2 */}
        <div className="p-6 bg-gray-50 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">
            Q2. 데이터베이스 설계와 관련해 어떤 경험이 있나요?
          </h3>
          <p className="text-gray-700 leading-relaxed">
            정규화를 고려하여 데이터베이스 구조를 설계하고, 서비스 환경에 맞는
            다대다(N:N) 관계 매핑을 적용한 경험이 있습니다. 또한, 다양한 엔터티
            타입을 유연하게 관리하기 위해 폴리모픽 관계를 구현한 경험이 있으며,
            데이터 무결성, 확장성, 유지 보수성을 함께 고려한 구조 설계를
            중요하게 생각합니다.
          </p>
        </div>

        {/* Q3 */}
        <div className="p-6 bg-gray-50 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">
            Q3. 본인의 개발 역량 강화를 위해 어떤 노력을 하고 있나요?
          </h3>
          <p className="text-gray-700 leading-relaxed">
            개발 과정에서 발생하는 문제를 기록하고, 에러의 근본 원인과 해결
            방법을 체계적으로 정리하는 습관을 꾸준히 이어가고 있습니다. 기록은
            블로그를 통해 공유하며, 다양한 문제 상황에 대한 대응력을 높이고
            있습니다. 또한, 새로운 기술이나 아키텍처에도 적극적으로 도전하며,
            열린 자세로 피드백을 수용하고 개선점을 찾아 지속적인 성장을 추구하고
            있습니다.
          </p>
          <div className="flex flex-wrap gap-5 mt-10 justify-center">
            <BlogButton href={"/works"} label={"프로젝트 둘러보기"} />
            <BlogButton href={"/boards?category=dev-log"} label={"개발 일지"} />
            <BlogButton
              href={"/boards?category=error-note"}
              label={"에러 노트"}
            />
            <BlogButton href={"/boards?category=cs"} label={"이론 정리"} />
          </div>
        </div>
      </div>
    </section>
  );
}
