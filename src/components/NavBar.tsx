import { Link, Outlet, useLocation } from "react-router-dom";

export default function NavBar() {
  const CONST_MENU = useLocation();

  return (
    <div>
      <div className="logo-container flex flex-col items-center justify-center">
        <div className="flex items-center justify-center h-20">
          <Link to={"/"}>
            <img src="/main_logo02.png" alt="메인로고" className="w-60 pt-3" />
          </Link>
        </div>
      </div>
      <div className="links-container flex flex-row justify-end p-3 pt-0">
        <Link to="/login" className="mr-4">
          로그인
        </Link>
      </div>
      <div className="tab-menu flex flex-col sm:flex-row justify-between mb-2 p-0 bg-white">
        <Link
          to="/travel-record"
          className={`tab-link mr-4 mx-32 py-4 px-6 block text-gray-600 hover:text-blue-500 focus:outline-none ${
            CONST_MENU.pathname === "/travel-record"
              ? "text-blue-500 border-b-2 font-medium border-blue-500"
              : ""
          }`}
        >
          여행 기록
        </Link>
        <Link
          to="/travel-schedule"
          className={`tab-link mr-4 mx-32 py-4 px-6 block text-gray-600 hover:text-blue-500 focus:outline-none ${
            CONST_MENU.pathname === "/travel-schedule"
              ? "text-blue-500 border-b-2 font-medium border-blue-500"
              : ""
          }`}
        >
          여행 일정
        </Link>
        <Link
          to="/travel-ranking"
          className={`tab-link mr-4 mx-32 py-4 px-6 block text-gray-600 hover:text-blue-500 focus:outline-none ${
            CONST_MENU.pathname === "/travel-ranking"
              ? "text-blue-500 border-b-2 font-medium border-blue-500"
              : ""
          }`}
        >
          여행지 랭킹
        </Link>
        <Link
          to="/my-page"
          className={`tab-link mx-32 py-4 px-6 block text-gray-600 hover:text-blue-500 focus:outline-none ${
            CONST_MENU.pathname === "/my-page"
              ? "text-blue-500 border-b-2 font-medium border-blue-500"
              : ""
          }`}
        >
          마이 페이지
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
