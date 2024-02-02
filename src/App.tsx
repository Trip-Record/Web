import { Routes, Route, Link, Navigate } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import SelectTravelStyle from "./components/SelectTravelStyle";
import Posts from "./components/Posts";
import TravelRecord from "./components/TravelRecord";
import TravelSchedule from "./components/TravelSchedule";
import TravelRanking from "./components/TravelRanking";
import MyPage from "./components/MyPage";
import WriteRecord from "./components/WriteRecord";
import WriteSchedule from "./components/WriteSchedule";

import "./App.css";
import NavBar from "./components/NavBar";
import PostDetail from "./components/post/PostDetail";
import PostDetailPage from "./components/PostDetailPage";
import Test from "./components/Test";

export default function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<NavBar />}>
          {/* <Route path="test" element={<SelectTravelStyle />} /> */}
          <Route path="/" element={<Navigate to="/travel-record" replace />} />
          <Route path="travel-record" element={<TravelRecord />} />
          <Route path="travel-schedule" element={<TravelSchedule />} />
          <Route path="travel-ranking" element={<TravelRanking />} />
          <Route path="my-page" element={<MyPage />} />
          <Route path="write-record" element={<WriteRecord />} />
          <Route path="write-schedule" element={<WriteSchedule />} />
          <Route path="/record/:id" element={<PostDetailPage />} />
          <Route path="test" element={<Test />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}
