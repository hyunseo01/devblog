"use client";

import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  size?: "lg" | "sm";
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  size = "lg",
}: PaginationProps) {
  const pageNumbers = (): number[] => {
    const delta = 2;
    let start = currentPage - delta;
    let end = currentPage + delta;

    if (start < 1) {
      end += 1 - start;
      start = 1;
    }

    if (end > totalPages) {
      start -= end - totalPages;
      end = totalPages;
    }

    if (start < 1) start = 1;

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const baseButton =
    "flex items-center justify-center border rounded bg-gray-100 text-gray-800 disabled:opacity-60";
  const sizeClass =
    size === "lg" ? "w-[35px] h-[35px] text-sm" : "w-[28px] h-[28px] text-xs";
  const buttonStyle = `${baseButton} ${sizeClass}`;
  const activeStyle = "bg-gray-300 font-semibold";

  return (
    <div className={`flex justify-center items-center gap-2 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={buttonStyle}
      >
        <FaAngleLeft />
      </button>

      {pageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${buttonStyle} ${page === currentPage ? activeStyle : ""}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={buttonStyle}
      >
        <FaAngleRight />
      </button>
    </div>
  );
}
