import { Suspense } from "react";
import BoardListPage from "@/components/BoardListClient";

export default function BoardPage() {
  return (
    <Suspense fallback={<p>불러오는 중...</p>}>
      <BoardListPage />
    </Suspense>
  );
}
