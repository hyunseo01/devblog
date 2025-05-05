"use client";

import { FaChevronDown } from "react-icons/fa";

interface WorkHeaderBasicTagsProps {
  basicTags: { id: number; name: string }[];
  selectedTags: number[];
  handleTagClick: (tagId: number, singleSelect: boolean) => void;
  toggleExpand?: () => void;
}

export default function WorkHeaderBasicTags({
  basicTags,
  selectedTags,
  handleTagClick,
  toggleExpand,
}: WorkHeaderBasicTagsProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex flex-wrap gap-2">
        {basicTags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => handleTagClick(tag.id, false)}
            className={`px-3 py-1 rounded-full ${
              selectedTags.includes(tag.id)
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>
      {toggleExpand && (
        <button
          onClick={toggleExpand}
          className="flex items-center gap-1 px-2 py-1 text-sm"
        >
          더 보기
          <span>
            <FaChevronDown />
          </span>
        </button>
      )}
    </div>
  );
}
