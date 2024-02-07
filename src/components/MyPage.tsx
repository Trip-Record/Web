import React, { useState } from "react";
import TravelStyle from "./ui/TravelStyle";
import RecordIcon from "./writing-icons/RecordIcon.png";
import DateIcon from "./writing-icons/DateIcon.png";
import LocationIcon from "./writing-icons/RecordIcon.png";
import RecommendIcon from "./writing-icons/RecordIcon.png";
import MyRecord from "./MyRecord";
import MySchedule from "./MySchedule";
import PageNation from "./ui/PageNation";

export default function MyPage() {
  const [name] = useState("서현");
  const [activeTab, setActiveTab] = useState("기록");
  const imsiPostNubmer = [1, 1, 1];
  const dummySchedulePost = {
    userId: 1,
    id: 2,
    date: 5,
    title: "임시 제목",
  };
  const dummyRecordPost = {
    userId: 1,
    id: 2,
    body: "부산은 맛집에서부터 역사적인 명소까지 다양한 즐길거리가 많아 여행자로서 정말 만족스러웠습니다. 다음에도 부산에 가서 더 많은 이야기를 만들고 싶네요! 파도소리 함께 일몰을 감상하는 것은 정말 잊을 수 없는 순간이에요.",
    title: "임시 제목",
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <main className="bg-white">
      <div className="flex bg-blue-50 p-8 justify-between">
        <div className="ml-16 my-4 flex items-center">
          <img
            src="/profile-icons/Dog.png"
            alt="Profile Icon"
            className="w-24 h-24"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold mr-4 mb-2">{name}</h2>
            <TravelStyle selectStyle="인생 사진형" />
          </div>
        </div>
        <div className="flex mr-16 mt-6">
          <div className="flex flex-col items-center mr-16">
            <img src={RecordIcon} alt="Record Icon" className="h-6 w-6" />
            <p>기록</p>
            <p className="font-bold text-xl">3</p>
          </div>
          <div className="flex flex-col items-center mr-16">
            <img src={DateIcon} alt="Date Icon" className="h-6 w-6" />
            <p>일정</p>
            <p className="font-bold text-xl">1</p>
          </div>
          <div className="flex flex-col items-center mr-16">
            <img src={LocationIcon} alt="Location Icon" className="h-6 w-6" />
            <p>장소</p>
            <p className="font-bold text-xl">2</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={RecommendIcon} alt="Recommend Icon" className="h-6 w-6" />
            <p>추천</p>
            <p className="font-bold text-xl">5</p>
          </div>
        </div>
      </div>

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

        {activeTab === "기록" &&
          imsiPostNubmer.map(() => {
            return <MyRecord myPost={dummyRecordPost} />;
          })}
        {activeTab === "일정" &&
          imsiPostNubmer.map(() => {
            return <MySchedule mySchedulePost={dummySchedulePost} />;
          })}
      </div>
      <PageNation maxPage={12} showPage={5} />
    </main>
  );
}
