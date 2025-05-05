"use client";

interface WorkHeaderSearchProps {
  search: string;
  sortOption: string;
  setSearch: (value: string) => void;
  setSortOption: (value: string) => void;
  handleSearch: () => void;
}

export default function WorkHeaderSearch({
  search,
  sortOption,
  setSearch,
  setSortOption,
  handleSearch,
}: WorkHeaderSearchProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="검색어 입력"
        className="flex-1 min-w-[200px] p-2 border rounded-md text-black"
      />
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="w-[120px] p-2 border rounded-md text-black"
      >
        <option value="latest">최신순</option>
        <option value="oldest">오래된순</option>
        <option value="recommended">추천순</option>
      </select>
      <button
        onClick={handleSearch}
        className="w-[120px] p-2 border rounded-md bg-gray-800 text-white"
      >
        검색
      </button>
    </div>
  );
}
