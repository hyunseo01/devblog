import { create } from "zustand";
import { isTokenExpired } from "@/libs/utils/jwt";

type AuthState = {
  token: string | null;
  nickname: string | null;
  login: (token: string, nickname: string) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => {
  let savedToken = null;
  let savedName = null;

  if (typeof window !== "undefined") {
    savedToken = sessionStorage.getItem("token");
    savedName = sessionStorage.getItem("nickname");

    if (savedToken && isTokenExpired(savedToken)) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("nickname");
      savedToken = null;
      savedName = null;
    }
  }

  return {
    token: savedToken,
    nickname: savedName,
    login: (token, nickname) => {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("nickname", nickname);
      set({ token, nickname });
    },
    logout: () => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("nickname");
      set({ token: null, nickname: null });
    },
  };
});
