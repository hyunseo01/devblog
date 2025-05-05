"use client";

import Link from "next/link";
import { ReactNode } from "react";

type ItemCardFrameProps = {
  title: string;
  preview: string;
  date: string;
  href: string;
  children?: ReactNode;
};

export default function ItemCardFrame({
  title,
  preview,
  date,
  href,
  children,
}: ItemCardFrameProps) {
  return (
    <Link href={href} className="block border p-4 rounded-md hover:shadow">
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-sm text-gray-400">
          {new Date(date).toLocaleDateString()}
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-2 line-clamp-2">{preview}</div>
      {children && <div className="flex flex-wrap gap-2 mt-2">{children}</div>}
    </Link>
  );
}
