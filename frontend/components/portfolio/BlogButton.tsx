"use client";

import Link from "next/link";

interface BlogButtonProps {
  href: string;
  label: string;
}

export default function BlogButton({ href, label }: BlogButtonProps) {
  return (
    <Link href={href} target="_blank">
      <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">
        {label}
      </button>
    </Link>
  );
}
