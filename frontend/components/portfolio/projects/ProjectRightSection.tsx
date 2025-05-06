"use client";

type Props = {
  onSelect: (key: string) => void;
  devPhaseButtons: {
    development: string[];
    post: string[];
  };
};

export default function ProjectRightSection({
  onSelect,
  devPhaseButtons,
}: Props) {
  return (
    <div className="w-1/2 p-8 flex flex-col gap-4">
      {/* 개발 중 문제/해결 */}
      <div className="flex-1">
        <h4 className="text-lg font-semibold mb-2">개발 중 문제/해결</h4>
        <div className="flex flex-col gap-2">
          {devPhaseButtons.development.map((label, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(`problem-${idx}`)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-left text-sm text-gray-700"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 개발 후 개선점/회고 */}
      <div className="flex-1">
        <h4 className="text-lg font-semibold mb-2">개발 후 개선점/회고</h4>
        <div className="flex flex-col gap-2">
          {devPhaseButtons.post.map((label, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(`improve-${idx}`)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-left text-sm text-gray-700"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
