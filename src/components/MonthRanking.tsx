import { useState } from "react";
import Ranking1 from "./ui/icons/Ranking1.png";
import Ranking2 from "./ui/icons/Ranking2.png";
import Ranking3 from "./ui/icons/Ranking3.png";
import ExclamationMarkIcon from "./ui/icons/exclamation-mark 1.png";
import GraphIcon from "./ui/icons/graph.png";
import LocationIcon from "./writing-icons/LocationIcon.png";

const MonthRanking = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const years = ["2022", "2023", "2024"];
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const rankingData = [
    { rank: 1, place: "대한민국, 제주도" },
    { rank: 2, place: "대한민국, 부산" },
    { rank: 3, place: "일본, 도쿄" },
    { rank: 4, place: "일본, 오키나와" },
    { rank: 5, place: "베트남, 다낭" },
    { rank: 6, place: "태국, 방콕" },
    { rank: 7, place: "프랑스, 파리" },
  ];

  const getRankingIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <img
            src={Ranking1}
            alt={`Ranking ${rank}`}
            className="w-20 h-20 flex justify-center mb-4 ml-4"
          />
        );
      case 2:
        return (
          <img
            src={Ranking2}
            alt={`Ranking ${rank}`}
            className="w-20 h-20 flex justify-center mb-4 ml-2"
          />
        );
      case 3:
        return (
          <img
            src={Ranking3}
            alt={`Ranking ${rank}`}
            className="w-20 h-20 flex justify-center mb-4"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white">
      <div className="bg-blue-200 flex mb-4 mx-8 p-2">
        <select
          className="border rounded p-1"
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear || ""}
        >
          <option value="" disabled>
            년도
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          className="border rounded p-1 ml-4"
          onChange={(e) => setSelectedMonth(e.target.value)}
          value={selectedMonth || ""}
        >
          <option value="" disabled>
            월
          </option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className="flex mb-4">
        {[1, 2, 3].map((number) => (
          <div
            key={number}
            className="flex justify-center w-1/3 p-32 border border-black mb-4 mx-8 rounded-lg"
          >
            <p>
              <span className="flex justify-center">
                {getRankingIcon(number)}
              </span>
              <span className="flex justify-center font-bold">
                <img
                  src={LocationIcon}
                  alt="Location Icon"
                  className="w-6 h-6 mr-2"
                />
                {rankingData[number - 1].place}{" "}
              </span>
              <span className="flex justify-center text-red-500 mt-8 font-bold">
                <img
                  src={GraphIcon}
                  alt="Graph Icon"
                  className="w-6 h-6 mr-2"
                />
                방문 횟수 {number === 1 ? 127 : number === 2 ? 81 : 67}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap mx-8">
        {[4, 5, 6, 7].map((number) => (
          <div
            key={number}
            className="w-full p-4 border border-black mb-4 rounded"
          >
            <p className="font-bold ml-4">
              <span>{number}</span>
              <span className="absolute left-32">
                <img
                  src={LocationIcon}
                  alt="Location Icon"
                  className="w-6 h-6 absolute"
                />
                &emsp;&emsp;{rankingData[number - 1].place}
              </span>
              <span className="text-red-500 absolute right-40">
                <img
                  src={GraphIcon}
                  alt="Graph Icon"
                  className="w-6 h-6 absolute right-28"
                />
                방문 횟수{" "}
                {number === 4 ? 52 : number === 5 ? 36 : number === 6 ? 31 : 25}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="bg-gray-200 rounded-lg mx-8">
        <div className="flex items-center font-bold">
          <img
            src={ExclamationMarkIcon}
            alt="Exclamation Mark"
            className="w-4 h-4 mx-2"
          />
          <h3>랭킹 집계 안내</h3>
        </div>
        <div className="text-gray-600 mt-1 ml-8">
          <h4>집계 대상 &ensp; 여행 기록 게시글</h4>
          <h4>
            집계 기간 &ensp; 월 별/계절 별 랭킹은 여행 출발일을 기준으로 하여
            집계 됩니다.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default MonthRanking;
