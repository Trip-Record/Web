import { Link } from "react-router-dom";

export default function TravelSchedule() {
  return (
    <div className="bg-red-200 h-screen flex flex-col">
      <div className="flex items-center justify-between border-b border-black/80 pb-2">
        <div className="flex gap-2 text-gray-500 flex-col md:flex-row">
          <span>대한민국, 부산</span>
          <span>2023.10.22-2023.10.24</span>
        </div>

        <Link to="/write-schedule" className="">
          일정 작성하기
        </Link>
      </div>
    </div>
  );
}
