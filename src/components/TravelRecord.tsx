import { Link } from "react-router-dom";

export default function TravelRecord() {
  return (
    <div className="bg-blue-200 h-screen">
      <h2>여행 기록 페이지 입니다.</h2>

      <div className="write-container">
        <Link to="/write-record" className="">
          기록 작성하기
        </Link>
      </div>
    </div>
  );
}
