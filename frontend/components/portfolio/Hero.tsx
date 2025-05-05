"use client";

import { useState, useEffect } from "react";
import { Mail, Github } from "lucide-react";

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-4 py-2 rounded opacity-90 animate-fadeInOut">
      {message}
    </div>
  );
}

export default function Hero() {
  const [showGithubCard, setShowGithubCard] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("hs001023@naver.com");
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const toggleGithubCard = () => {
    setShowGithubCard(!showGithubCard);
  };

  const goToGithub = () => {
    window.open("https://github.com/hyunseo01", "_blank");
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center text-center snap-start p-8 bg-white relative">
      {/* 상단 프로필 영역 */}
      <div className="flex flex-row items-center justify-center mb-16 gap-5">
        {/* 프로필 사진 */}
        <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden mr-10 shadow-lg">
          {/* <Image src="/path/to/profile.jpg" alt="Profile" width={160} height={160} /> */}
        </div>
        {/* 텍스트 정보 */}
        <div className="text-left space-y-2">
          <p className="text-4xl font-extrabold text-gray-900 mb-5">
            Woo, Hyunseo
          </p>
          <p></p>
          <div
            className="flex items-center text-gray-600 cursor-pointer"
            onClick={copyEmail}
          >
            <Mail className="w-5 h-5 mr-2" />
            <span>hs001023@naver.com</span>
          </div>
          <div
            className="flex items-center text-gray-600 cursor-pointer"
            onClick={toggleGithubCard}
          >
            <Github className="w-5 h-5 mr-2" />
            <span>github.com/hyunseo01</span>
          </div>
        </div>
      </div>

      {/* 소개 문구 */}
      <div>
        <p className="text-3xl font-bold mb-6 leading-tight">
          기술을 깊이 이해하고, 문제 해결을 기록하며 성장하는 백엔드
          개발자입니다.
        </p>
        <p className="text-lg max-w-2xl text-gray-600 leading-relaxed text-center mx-auto">
          단단한 백엔드 구조와 현실적인 기술 선택으로 서비스의 안정성과
          유지보수를 책임집니다.
        </p>
      </div>

      {/* 깃허브 카드 */}
      {showGithubCard && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow-md p-6 rounded-lg flex flex-col items-center">
          <p className="mb-4 text-gray-800 font-semibold">
            GitHub로 이동하시겠습니까?
          </p>
          <div className="flex gap-4">
            <button
              onClick={goToGithub}
              className="w-24 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              네
            </button>
            <button
              onClick={toggleGithubCard}
              className="w-24 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              아니오
            </button>
          </div>
        </div>
      )}

      {/* 토스트 메시지 */}
      {showToast && <Toast message="이메일이 복사되었습니다!" />}
    </section>
  );
}
