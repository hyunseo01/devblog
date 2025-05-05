"use client";

import Link from "next/link";

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-[30vh] flex flex-col justify-center items-center text-center bg-gray-500 text-white snap-start px-4"
    >
      <p className="text-lg font-semibold mb-8 text-gray-300">
        제 포트폴리오와 블로그를 보시고,
        <br />
        방명록에 소중한 의견을 남겨주세요!
      </p>

      <Link href={"/chat"}>
        <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition">
          방명록(채팅방) 바로가기
        </button>
      </Link>
    </section>
  );
}
