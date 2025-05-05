"use client";

import {
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiNestjs,
  SiSpringboot,
  SiSpringsecurity,
  SiMysql,
  SiReact,
  SiNextdotjs,
  SiGithub,
  SiGradle,
  SiAmazon,
  SiDocker,
  SiTypeorm,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import SkillItem from "./SkillItem";

export default function Skills() {
  const frontendLanguage = [
    { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" /> },
    { name: "TypeScript", icon: <SiTypescript color="#3178C6" /> },
    { name: "Java", icon: <FaJava color="#007396" /> },
    { name: "React", icon: <SiReact color="#61DAFB" /> },
    { name: "Next.js", icon: <SiNextdotjs color="#000000" /> },
  ];

  const backend = [
    { name: "NestJS", icon: <SiNestjs color="#E0234E" /> },
    { name: "TypeORM", icon: <SiTypeorm color="#FF4A4A" /> },
    { name: "Spring Boot", icon: <SiSpringboot color="#6DB33F" /> },
    { name: "JPA", icon: <SiSpringboot color="#6DB33F" /> },
    { name: "Spring Security", icon: <SiSpringsecurity color="#6DB33F" /> },
    { name: "MySQL", icon: <SiMysql color="#4479A1" /> },
  ];

  const infraTools = [
    { name: "AWS", icon: <SiAmazon color="#FF9900" /> },
    { name: "Docker", icon: <SiDocker color="#2496ED" /> },
    { name: "Node.js", icon: <SiNodedotjs color="#339933" /> },
    { name: "Gradle", icon: <SiGradle color="#02303A" /> },
    { name: "Lombok", icon: <IoSettingsOutline /> },
    { name: "Git / GitHub", icon: <SiGithub color="#181717" /> },
  ];

  return (
    <section className="h-screen flex flex-col items-center justify-center text-center snap-start px-4 py-8 gap-4">
      <h2 className="text-4xl font-bold mb-10">Technical Skills</h2>

      <div className="flex flex-col gap-12 w-full max-w-5xl items-center">
        {/* Backend */}
        <div className="w-full flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-6">Backend</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {backend.map((skill, index) => (
              <SkillItem key={index} icon={skill.icon} name={skill.name} />
            ))}
          </div>
        </div>
        {/* Frontend / Language */}
        <div className="w-full flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-6">Language / Frontend</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {frontendLanguage.map((skill, index) => (
              <SkillItem key={index} icon={skill.icon} name={skill.name} />
            ))}
          </div>
        </div>

        {/* Infra / Tools */}
        <div className="w-full flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-6">Infra / Tools</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {infraTools.map((skill, index) => (
              <SkillItem key={index} icon={skill.icon} name={skill.name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
