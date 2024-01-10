import { Link } from "react-router-dom";

export default function TravelSchedule() {
  return (
    <div className="bg-red-200 h-screen">
      <h2>여행 일정 페이지 입니다.</h2>

      <div className="write-container">
        <Link to="/write-schedule" className="">
          일정 작성하기
        </Link>
      </div>
    </div>
  );
}
