"use client";

import Link from "next/link";

export type Work = {
  id: number;
  title: string;
  preview: string;
  createdAt: string;
  tags: { id: number; name: string }[];
};

interface WorkListProps {
  works: Work[];
}

export default function WorkList({ works }: WorkListProps) {
  if (works.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        등록된 작업물이 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <ul className="grid gap-4">
        {works.map((work) => (
          <li key={work.id} className="border p-4 rounded-md hover:shadow">
            <Link href={`/works/${work.id}`} className="block">
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold">{work.title}</div>
                <div className="text-sm text-gray-400">
                  {new Date(work.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="text-sm text-gray-500 mb-2 line-clamp-2">
                {work.preview}
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {work.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-xs bg-gray-200 px-2 py-0.5 rounded"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
