import { Suspense } from "react";
import WorkListPage from "@/components/WorkListClient";

export default function WorkPage() {
  return (
    <Suspense fallback={<p>불러오는 중...</p>}>
      <WorkListPage />
    </Suspense>
  );
}
