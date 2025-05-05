"use client";

import { FaChevronUp } from "react-icons/fa";

interface WorkHeaderExpandedTagsProps {
  fullTagGroups: {
    title: string;
    tags: { id: number; name: string }[];
    singleSelect: boolean;
  }[];
  selectedTags: number[];
  handleTagClick: (tagId: number, singleSelect: boolean) => void;
  toggleExpand: () => void;
}

export default function WorkHeaderExpandedTags({
  fullTagGroups,
  selectedTags,
  handleTagClick,
  toggleExpand,
}: WorkHeaderExpandedTagsProps) {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="p-4 grid gap-2">
        {fullTagGroups.map((group, idx) => (
          <div key={group.title} className="grid grid-cols-12 items-center">
            <div className="col-span-2 text-sm font-semibold text-left">
              {group.title}
            </div>
            <div className="col-span-10 flex flex-wrap gap-2 items-center">
              {group.tags.map((tag) => (
                <label key={tag.id} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => handleTagClick(tag.id, group.singleSelect)}
                    className="accent-gray-800"
                  />
                  <span className="text-sm">{tag.name}</span>
                </label>
              ))}
              {idx === 0 && (
                <button
                  onClick={toggleExpand}
                  className="ml-auto flex items-center gap-1 px-2 py-1 text-sm"
                >
                  접기
                  <span>
                    <FaChevronUp />
                  </span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
