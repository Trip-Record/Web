import { Routes, Route, Link } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <div className=" h-full">
      <Link to="/login">로그인 페이지 이동</Link>
      <Link to="/register">회원가입 페이지 이동</Link>
      <Routes>
        <Route path="/" element={<div>메인 페이지</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
