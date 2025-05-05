const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type AuthResponse = {
  accessToken: string;
  nickname: string;
};

export const checkNickname = async (
  nickname: string,
): Promise<"available" | "conflict" | "owned"> => {
  const res = await fetch(`${API_BASE}/user/check-nickname`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: nickname }),
  });

  const result = await res.json();

  if (!res.ok && res.status !== 404)
    throw new Error(result.message || "닉네임 확인 실패");

  // 서버는 status: 'available' | 'conflict' | 'owned'
  return result.data?.status;
};

export const submitUser = async (
  nickname: string,
  password: string,
): Promise<AuthResponse> => {
  const res = await fetch(`${API_BASE}/user/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: nickname, password }),
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message || "로그인/회원가입 실패");

  return {
    accessToken: result.data.token,
    nickname: result.data.name,
  };
};
