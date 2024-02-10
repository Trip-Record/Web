import { Link, Outlet, useLocation } from "react-router-dom";
import LogoImage from "./ui/icons/logo02.png";
import { useUser } from "../hooks/useUser";
import { setLoginToken } from "../services/storage";

export default function NavBar() {
  const CONST_MENU = useLocation();

  const { logout, user } = useUser();

  return (
    <div>
      <div className="logo-container flex flex-col items-center justify-center">
        <img src={LogoImage} alt="App Logo" className="w-68 h-20" />
      </div>
      <div className="links-container flex flex-row justify-end mt-2 p-4">
        {user ? (
          <button onClick={logout}>로그아웃</button>
        ) : (
          <Link to="/login" className="right-link mr-4">
            로그인
          </Link>
        )}
      </div>
      <div className="tab-menu flex flex-col sm:flex-row justify-between mb-2 p-0 bg-white">
        <Link
          to="/travel-record"
          className={`tab-link py-4 px-6 block text-gray-600 hover:text-blue-500 focus:outline-none ${
            CONST_MENU.pathname === "/travel-record"
              ? "text-blue-500 border-b-2 font-medium border-blue-500"
              : ""
          }`}
        >
          여행 기록
        </Link>
        <Link
          to="/travel-schedule"
          className={`tab-link py-4 px-6 block text-gray-600 hover:text-blue-500 focus:outline-none ${
            CONST_MENU.pathname === "/travel-schedule"
              ? "text-blue-500 border-b-2 font-medium border-blue-500"
              : ""
          }`}
        >
          여행 일정
        </Link>
        <Link
          to="/travel-ranking"
          className={`tab-link py-4 px-6 block text-gray-600 hover:text-blue-500 focus:outline-none ${
            CONST_MENU.pathname === "/travel-ranking"
              ? "text-blue-500 border-b-2 font-medium border-blue-500"
              : ""
          }`}
        >
          여행지 랭킹
        </Link>
        <Link
          to="/my-page"
          className={`tab-link py-4 px-6 block text-gray-600 hover:text-blue-500 focus:outline-none ${
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
