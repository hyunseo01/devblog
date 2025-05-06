"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import type { Swiper as SwiperClass } from "swiper";
import type { NavigationOptions } from "swiper/types";
import Link from "next/link";

import { useRef, useState, useEffect } from "react";
import ProjectCard from "@/components/portfolio/projects/ProjectCard";

const projectData = [
  {
    id: 1,
    title: "DevBlog - 블로그 플랫폼 1차, 백엔드 개발자 포트폴리오 ",
    desc: (
      <div className="text-sm text-gray-700 leading-relaxed space-y-3">
        <p>
          <strong>개인 프로젝트 / 2024.04.21 ~ 2024.05.07 (총 17일)</strong>
        </p>

        <div className="flex items-center gap-5">
          <p>
            <strong>배포 링크:</strong>{" "}
            <Link
              href="https://www.devblog.work"
              className="underline"
              target="_blank"
            >
              바로가기
            </Link>
          </p>

          <p>
            <strong>GitHub:</strong>{" "}
            <Link
              href="https://github.com/hyunseo01/devblog"
              className="underline"
              target="_blank"
            >
              바로가기
            </Link>
          </p>
        </div>

        <div>
          <strong>기술 스택:</strong>
          <br />
          <div className="">
            TypeScript, NestJS, TypeORM, WebSocket(Socket.io), MySQL, Next.js,
            React.js, AWS EC2, Vercel, Nginx, Docker, Java-SpringBoot(배포안됨)
          </div>
        </div>

        <p>
          <strong>프로젝트 소개:</strong>
          <br />
          장기 사이드 프로젝트인 블로그 플랫폼의 핵심 기능 일부를 구현하고,
          <br />
          포트폴리오 기능과 결합하여 17일간 1차 배포를 목표로 개발한 개인
          프로젝트입니다.
          <br />
          간편 로그인 기반 JWT 회원 시스템, 프로젝트/작업물 필터링 및 페이징
          처리,
          <br />
          실시간 채팅(WebSocket 기반) 기능을 구현했습니다.
          <br />
          채팅은 무한 스크롤 방식으로 구현되어 전체 메시지를 한 번에 불러오지
          않고,
          <br />
          사용자의 스크롤 위치에 따라 20개씩 분할 요청됩니다.
          <br />
          NestJS + MySQL 기반 백엔드와 Next.js 기반 프론트엔드를 구축하여
          <br />
          EC2(VM)와 Vercel에 각각 배포했습니다.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    title: "타이틀2",
    desc: "설명",
  },
  {
    id: 3,
    title: "타이틀3",
    desc: "설명",
  },
  {
    id: 4,
    title: "타이틀4",
    desc: "설명",
  },
];

export default function Projects() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null,
  );
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (
      swiperInstance &&
      typeof swiperInstance.params.navigation === "object" &&
      swiperInstance.params.navigation !== null &&
      prevRef.current &&
      nextRef.current
    ) {
      const navigation = swiperInstance.params.navigation as NavigationOptions;
      navigation.prevEl = prevRef.current;
      navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <section
      id="projects"
      className="h-screen bg-gray-100 flex flex-col items-center overflow-hidden snap-start"
    >
      <div className="text-center mt-10 mb-4">
        <h2 className="text-4xl font-bold mb-10">Projects</h2>
      </div>

      <div className="flex flex-col justify-between items-center w-full h-full pb-8 relative">
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          onSlideChange={(swiper) => setCurrent(swiper.realIndex + 1)}
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          loop={true}
          className="w-full flex-1 flex items-center overflow-visible"
        >
          {projectData.map((project) => (
            <SwiperSlide
              key={project.id}
              className="w-[80vw] max-w-[80vw] flex justify-center items-center"
            >
              <ProjectCard {...project} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            ref={prevRef}
            className="p-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            <HiChevronLeft className="text-3xl" />
          </button>

          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="w-6 text-center">
              {String(current).padStart(2, "0")}
            </span>

            <div className="w-32 h-[2px] bg-gray-300 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-black transition-all duration-300"
                style={{
                  width: `${(100 / projectData.length) * current}%`,
                }}
              />
            </div>

            <span className="w-6 text-center">
              {String(projectData.length).padStart(2, "0")}
            </span>
          </div>

          <button
            ref={nextRef}
            className="p-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            <HiChevronRight className="text-3xl" />
          </button>
        </div>
      </div>
    </section>
  );
}
