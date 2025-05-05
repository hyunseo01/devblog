import { useState } from "react";

export default function ChatInput({
  onSubmit,
}: {
  onSubmit: (value: string) => void;
}) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSubmit(value);
    setValue("");
  };

  return (
    <div className="flex gap-2 m-2">
      <input
        className="flex-1 border p-2 rounded"
        placeholder="메시지를 입력하세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        className="px-4 py-2 bg-black text-white rounded"
        onClick={handleSend}
      >
        전송
      </button>
    </div>
  );
}
