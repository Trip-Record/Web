import { Link, Outlet } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <div className="logo-container flex flex-col items-center justify-center">
        <div className="logo text-2xl font-bold">App Logo</div>
      </div>
      <div className="links-container flex flex-row justify-end mt-2 p-4">
        <Link to="/login" className="right-link mr-4">
          로그인
        </Link>
      </div>
      <div className="tab-menu flex flex-row justify-between mb-4 p-4 bg-gray-200">
        <Link to="/travel-record" className="tab-link mr-4">
          여행 기록
        </Link>
        <Link to="/travel-schedule" className="tab-link mr-4">
          여행 일정
        </Link>
        <Link to="/travel-ranking" className="tab-link mr-4">
          여행지 랭킹
        </Link>
        <Link to="/my-page" className="tab-link">
          마이 페이지
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
