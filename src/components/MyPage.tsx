import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RecordIcon from "./writing-icons/RecordIcon.png";
import DateIcon from "./writing-icons/DateIcon.png";
import LocationIcon from "./writing-icons/LocationIcon.png";
import RecommendIcon from "./writing-icons/RecommendIcon.png";
import MyRecord from "./MyRecord";
import MySchedule from "./MySchedule";
import PageNation from "./ui/PageNation";
import { HOST } from "../constants";
import { getLoginToken } from "../services/storage";
import { useUser } from "../hooks/useUser";
import TravelStyle, { Travel_Style } from "./ui/TravelStyle";

interface UserData {
  userProfile: {
    userNickname: string;
    userProfileImg: string;
    userTripStyleName: string;
    userTripStyleImg: string | null;
  };
  recordTotal: number;
  scheduleTotal: number;
  placeTotal: number;
  likeTotal: number;
}

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("기록");
  const [userData, setUserData] = useState<UserData | null>(null);
  // const [imsiPostNumber] = useState([1, 1, 1]);
  const { logout, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !userData) {
      const fetchData = async () => {
        try {
          const token = getLoginToken();
          const response = await axios.get(HOST + "/users/informations", {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchData();
    }
  }, [user, userData]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // const handelLogout = () => {
  //   logout();
  // };

  if (!user) return <>로그인 후 이용해주세요</>;

  const handleTravelStyleClick = () => {
    navigate("/style");
  };

  return (
    <main className="bg-white">
      {userData && (
        <div className="flex bg-blue-50 p-8 justify-between">
          <div className="ml-16 my-4 flex items-center">
            <img
              src={`${userData.userProfile.userProfileImg}`}
              alt="Profile Icon"
              className="w-24 h-24"
            />
            <div className="ml-4">
              <h2 className="text-xl font-semibold mr-4 mb-2">
                {userData.userProfile.userNickname}
              </h2>
              {!userData.userProfile.userTripStyleName && (
                <p
                  className="text-blue-500 cursor-pointer"
                  onClick={handleTravelStyleClick}
                >
                  여행 스타일을 선택해주세요.
                </p>
              )}

              {userData.userProfile.userTripStyleName && (
                <TravelStyle
                  selectStyle={
                    userData.userProfile.userTripStyleName as Travel_Style
                  }
                  // onClick={handleTravelStyleClick}
                />
              )}
            </div>
          </div>
          <div className="flex mr-16 mt-6">
            <div className="flex flex-col items-center mr-16">
              <img src={RecordIcon} alt="Record Icon" className="h-6 w-6" />
              <p>기록</p>
              <p className="font-bold text-xl">{userData.recordTotal}</p>
            </div>
            <div className="flex flex-col items-center mr-16">
              <img src={DateIcon} alt="Date Icon" className="h-6 w-6" />
              <p>일정</p>
              <p className="font-bold text-xl">{userData.scheduleTotal}</p>
            </div>
            <div className="flex flex-col items-center mr-16">
              <img src={LocationIcon} alt="Location Icon" className="h-6 w-6" />
              <p>장소</p>
              <p className="font-bold text-xl">{userData.placeTotal}</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={RecommendIcon}
                alt="Recommend Icon"
                className="h-6 w-6"
              />
              <p>추천</p>
              <p className="font-bold text-xl">{userData.likeTotal}</p>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white">
        <div className="flex justify-start ml-4 mb-4">
          <button
            className={`ml-32 mt-10 text-xl ${
              activeTab === "기록"
                ? "font-bold border-t-4 border-blue-500"
                : "font-bold"
            }`}
            onClick={() => handleTabChange("기록")}
          >
            기록
          </button>
          <h2 className="ml-8 mt-10 text-xl text-gray-300">|</h2>
          <button
            className={`ml-8 mt-10 text-xl ${
              activeTab === "일정"
                ? "font-bold border-t-4 border-blue-500"
                : "font-bold"
            }`}
            onClick={() => handleTabChange("일정")}
          >
            일정
          </button>
        </div>
      </div>
      {activeTab === "기록" && <MyRecord />}
      {activeTab === "일정" && <MySchedule />}
    </main>
  );
}
