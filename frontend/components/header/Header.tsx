"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/libs/store/useAuth";
import { Menu } from "lucide-react";

export default function Header({
  scrollTarget,
}: {
  scrollTarget?: React.RefObject<HTMLElement | null>;
}) {
  const { token, logout } = useAuth();
  const [showHeader, setShowHeader] = useState(true);
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    location.reload();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const target = scrollTarget?.current || window;
    if (!target) return;

    const handleScroll = () => {
      const currentScrollY =
        target === window ? window.scrollY : (target as HTMLElement).scrollTop;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 50) {
        setShowHeader(true);
      }
    };

    target.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      target.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [scrollTarget, mounted]);

  if (!mounted) return null;

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white text-black shadow-md z-50 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
        <Link href="/" className="font-bold text-lg">
          DevBlog
        </Link>

        <nav className="hidden md:flex gap-8 items-center font-medium">
          <Link href="/works" className="hover:text-gray-600">
            프로젝트 / 개발
          </Link>
          <Link href="/boards" className="hover:text-gray-600">
            블로그
          </Link>
          <Link href="/chat" className="hover:text-gray-600">
            방명록
          </Link>

          {token && (
            <button
              onClick={handleLogout}
              className="ml-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              토큰 제거
            </button>
          )}
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-inner flex flex-col gap-4 py-4 px-6 font-medium">
          <Link
            href="/works"
            className="hover:text-gray-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            프로젝트 / 개발
          </Link>
          <Link
            href="/boards"
            className="hover:text-gray-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            블로그
          </Link>
          <Link
            href="/chat"
            className="hover:text-gray-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            방명록
          </Link>
          {token && (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              토큰 제거
            </button>
          )}
        </div>
      )}
    </header>
  );
}
