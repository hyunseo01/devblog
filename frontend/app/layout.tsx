import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/libs/providers/AuthProvider";
import AuthWrapper from "@/components/AuthWrapper";

export const metadata: Metadata = {
  title: "DevBlog | 백엔드 개발자 포트폴리오",
  description: "백엔드 개발자 우현서 포트폴리오 사이트입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AuthWrapper>{children}</AuthWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
