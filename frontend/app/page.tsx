"use client";

import { useRef } from "react";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Contact from "@/components/portfolio/Contact";
import Header from "@/components/header/Header";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Header scrollTarget={scrollRef} />
      <main
        ref={scrollRef}
        className="snap-y snap-mandatory overflow-y-auto h-screen"
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
