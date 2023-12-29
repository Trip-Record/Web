import { Routes, Route, Link } from "react-router-dom";
import RegisterPage from "./RegisterPage";

export default function LoginPage() {
  return (
    <div className="flex flex-col w-1/2 h-1/2 m-auto mt-40 items-center bg-blue-600 text-center rounded-lg text-white ">
      <h1 className="text-3xl mb-4">TravelMaker 로고</h1>
      <h1 className="text-3xl mb-4">로그인</h1>
      <form className="flex flex-col w-2/3 mb-4">
        <input
          type="text"
          name="id"
          placeholder="아이디를 입력해주세요"
          className="h-10 border-2"
        />
        <input
          type="password"
          name="pw"
          placeholder="비밀번호를 입력해주세요"
          className="h-10 border-2"
        />
        <input type="submit" value="로그인" className=" bg-lime-200 h-10" />
      </form>
      <div className="text-center">
        <div className="flex justify-start">
          <div className="mr-20 ">구글 간편 로그인</div>
          <div className=" "> 이미지</div>
        </div>
        <div className="flex justify-center">
          <div className="mr-10 ">이메일로 회원가입하기</div>
          <Link to="/register" className="">
            회원가입 버튼
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}
