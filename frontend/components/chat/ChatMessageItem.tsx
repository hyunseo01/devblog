"use client";

type Props = {
  nickname: string;
  content: string;
  createdAt: string;
  isMine: boolean;
  isAdmin: boolean;
  onDelete?: () => void;
};

export default function ChatMessageItem({
  nickname,
  content,
  createdAt,
  isMine,
  isAdmin,
  onDelete,
}: Props) {
  const canDelete = !!onDelete && (isMine || isAdmin);

  const deleteButton = canDelete ? (
    <button
      onClick={onDelete}
      className="text-xs px-2 py-[2px] border text-red-500 border-red-400 rounded hover:bg-red-50"
    >
      삭제
    </button>
  ) : null;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}>
      <div className="flex items-center gap-2 max-w-[70%]">
        {isMine && deleteButton}
        <div className="flex flex-col">
          {!isMine && (
            <span className="text-xs text-gray-500 mb-1">{nickname}</span>
          )}
          <div
            className={`px-3 py-2 rounded-xl shadow text-sm whitespace-pre-line ${
              isMine
                ? "bg-yellow-100 text-right self-end"
                : nickname === "관리자"
                  ? "bg-gray-200 border border-gray-400"
                  : "bg-white"
            }`}
          >
            {content}
          </div>
          <span className="text-[10px] text-gray-400 mt-1 self-end">
            {createdAt}
          </span>
        </div>
        {!isMine && deleteButton}
      </div>
    </div>
  );
}
