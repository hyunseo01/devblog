"use client";

import { ReactNode } from "react";

type Props = {
  title: string;
  desc: ReactNode;
  items: string[];
  onSelect: (key: string) => void;
};

export default function ProjectLeftSection({
  title,
  desc,
  items,
  onSelect,
}: Props) {
  return (
    <div className="w-1/2 p-8 flex flex-col justify-between border-r border-gray-200">
      <div>
        <h3 className="text-2xl font-bold mb-6">{title}</h3>
        {desc}
      </div>

      <div className="flex flex-col gap-3 mb-[10px]">
        {items.map((text, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(`keyword-${idx}`)}
            className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-left text-sm font-medium"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
