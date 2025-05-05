"use client";

import { ReactNode } from "react";

interface SkillItemProps {
  icon: ReactNode;
  name: string;
}

export default function SkillItem({ icon, name }: SkillItemProps) {
  return (
    <div className="flex items-center justify-center p-2 bg-gray-100 rounded-lg shadow-md">
      <div className="text-3xl">{icon}</div>
      <span className="text-sm font-semibold text-gray-800 ml-2">{name}</span>
    </div>
  );
}
