"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { useRef, useState, useEffect } from "react";

interface Project {
  id: number;
  title: string;
  desc: string;
}

export default function Projects() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [current, setCurrent] = useState(1);
  const [projects, setProjects] = useState<Project[]>([]);

  // 흉내만 내는 API 호출
  useEffect(() => {
    async function fetchProjects() {
      // 실제 API로 대체할 부분
      const fakeData: Project[] = [
        { id: 1, title: "Project 1", desc: "첫번째 프로젝트 설명" },
        { id: 2, title: "Project 2", desc: "두번째 프로젝트 설명" },
        { id: 3, title: "Project 3", desc: "세번째 프로젝트 설명" },
        { id: 4, title: "Project 4", desc: "네번째 프로젝트 설명" },
      ];
      setProjects(fakeData);
    }

    fetchProjects();
  }, []);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
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
        {projects.length > 0 && (
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
            {projects.map((project) => (
              <SwiperSlide
                key={project.id}
                className="w-[80vw] max-w-[80vw] flex justify-center items-center"
              >
                <div className="w-full h-[70vh] bg-white p-10 rounded-lg shadow-md flex flex-col justify-center">
                  <h3 className="text-3xl font-semibold mb-4">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-lg">{project.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* 하단 버튼 + 숫자 + 진행바 */}
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
                  width:
                    projects.length > 0
                      ? `${(100 / projects.length) * current}%`
                      : "0%",
                }}
              />
            </div>

            <span className="w-6 text-center">
              {String(projects.length).padStart(2, "0")}
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
