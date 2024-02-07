import ScheduleDetail from "../ScheduleDetail";
import { Suspense } from "react";
import { useParams } from "react-router-dom";

export default function ScheduleDetailPage() {
  const { id } = useParams();
  // const postId = 1;

  console.log(id);
  if (!id) return <>페이지 없음...</>;
  if (!+id) return <>페이지 없음...</>;
  return (
    <div className="flex items-center justify-center w-full p-2">
      <Suspense fallback={<>로딩중...</>}>
        <ScheduleDetail scheduleId={+id} />
      </Suspense>
    </div>
  );
}
