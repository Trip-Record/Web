import { Link } from "react-router-dom";

export default function TravelSchedule() {
  return (
    <div className="bg-green-200 h-screen">
      <Link to="/write-schedule" className="">
        일정 작성하기
      </Link>
    </div>
  );
}
