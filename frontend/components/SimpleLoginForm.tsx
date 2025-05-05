"use client";

import { useState } from "react";
import { checkNickname, submitUser } from "@/libs/api/auth";
import { useAuth } from "@/libs/store/useAuth";

export default function SimpleLoginForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNicknameCheck = async () => {
    setError(null);
    try {
      const available = await checkNickname(nickname);
      setIsValidNickname(true);
      if (!available) {
        setError("기존 닉네임입니다. 비밀번호를 입력해 로그인하세요.");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { accessToken, nickname: nick } = await submitUser(
        nickname,
        password,
      );
      useAuth.getState().login(accessToken, nick);
      onSuccess?.();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!isValidNickname) handleNicknameCheck();
        else handleSubmit(e);
      }}
      className="space-y-2"
    >
      <input
        className="border p-2 rounded w-full"
        type="text"
        placeholder="닉네임 (3~10자)"
        value={nickname}
        onChange={(e) => {
          setNickname(e.target.value);
          setIsValidNickname(false); // 닉네임 바뀌면 초기화
        }}
        required
      />
      {isValidNickname && (
        <input
          className="border p-2 rounded w-full"
          type="password"
          placeholder="비밀번호 (4자리)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="bg-black text-white p-2 rounded w-full">
        {isValidNickname ? "완료" : "계속"}
      </button>
    </form>
  );
}
