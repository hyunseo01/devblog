"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/libs/store/useAuth";
import { isTokenExpired } from "@/libs/utils/jwt";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      logout();
      router.push("/"); // 만료시 이동
    }
  }, [token]);

  return <>{children}</>;
}
