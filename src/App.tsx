import { Routes, Route, Link, Navigate } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import SelectTravelStyle from "./components/SelectTravelStyle";
import NewPostInputPage from "./components/NewPostInputPage";
import TravelRecord from "./components/TravelRecord";
import TravelSchedule from "./components/TravelSchedule";
import TravelRanking from "./components/TravelRanking";
import MyPage from "./components/MyPage";
import WriteRecord from "./components/WriteRecord";
import WriteSchedule from "./components/WriteSchedule";

import "./App.css";

export default function App() {
  return (
    <div className=" h-full">
      <Link to="/login">로그인 페이지 이동</Link>
      <Link to="/register">회원가입 페이지 이동</Link>
      <Link to="/newPostInputPage">기록 입력 페이지 이동</Link>
      <div className="App">
        <div className="logo-container flex flex-col items-center justify-center">
          <div className="logo text-2xl font-bold">App Logo</div>
        </div>

        <div className="links-container flex flex-row justify-end mt-2 mb-2 p-4">
          <Link to="/login" className="right-link mr-4">
            로그인
          </Link>
          <Link to="/register" className="right-link">
            회원가입
          </Link>
        </div>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/test" element={<SelectTravelStyle />} />
          <Route path="/newPostInputPage" element={<NewPostInputPage />} />
          <Route path="/" element={<Navigate to="/travel-record" replace />} />
        </Routes>

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

        <div className="tab-content">
          <Routes>
            <Route path="/travel-record" element={<TravelRecord />} />
            <Route path="/travel-schedule" element={<TravelSchedule />} />
            <Route path="/travel-ranking" element={<TravelRanking />} />
            <Route path="/my-page" element={<MyPage />} />
          </Routes>
        </div>
        <Routes>
          <Route path="/write-record" element={<WriteRecord />} />
          <Route path="/write-schedule" element={<WriteSchedule />} />
        </Routes>
      </div>
    </div>
  );
}
