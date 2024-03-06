import React, { useState, useEffect } from "react";
import axios from "axios";
import Ranking1 from "./ui/icons/Ranking1.png";
import Ranking2 from "./ui/icons/Ranking2.png";
import Ranking3 from "./ui/icons/Ranking3.png";
import GraphIcon from "./ui/icons/graph.png";
import LocationIcon from "./writing-icons/LocationIcon.png";
import ExclamationMarkIcon from "./ui/icons/exclamation-mark 1.png";
import { HOST } from "../constants";

interface RankingData {
  visitCount: number;
  rank: number;
  placeBasicData: {
    placeId: number;
    countryName: string;
    placeName: string;
  };
}

const MonthRanking = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>("2024");
  const [selectedMonth, setSelectedMonth] = useState<string | null>("01");
  const [rankingData, setRankingData] = useState<RankingData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const years = ["2022", "2023", "2024"];
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<RankingData[]>(
          HOST + `/ranks/months?year=${selectedYear}&month=${selectedMonth}`
        );
        setRankingData(response.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    if (selectedYear && selectedMonth) {
      fetchData();
    }
  }, [selectedYear, selectedMonth]);

  const getRankingIcon = (rank: number, isSmall: boolean) => {
    if (rank === 1 || rank === 2 || rank === 3) {
      return (
        <img
          src={rank === 1 ? Ranking1 : rank === 2 ? Ranking2 : Ranking3}
          alt={`Ranking ${rank}`}
          className={`flex justify-center mb-4 ${
            isSmall ? "w-8 h-8" : "w-20 h-20"
          }`}
        />
      );
    } else {
      return <span className="font-bold">{rank}</span>;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;

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

      {rankingData.length === 0 ? (
        <div className="text-center mt-8">
          <h2 className="text-xl font-bold">
            해당 기간의 랭킹 데이터가 없습니다.
          </h2>
        </div>
      ) : (
        <>
          {/* 첫 번째 섹션: 상위 세 개의 데이터 */}
          <div className="flex mb-4">
            {rankingData.slice(0, 3).map((item, index) => (
              <div
                key={index + 1}
                className="flex justify-center w-1/3 p-32 border border-black mb-4 mx-8 rounded-lg"
              >
                <p>
                  <span className="flex justify-center">
                    {getRankingIcon(item.rank, false)}
                  </span>
                  <span className="flex justify-center font-bold">
                    <img
                      src={LocationIcon}
                      alt="Location Icon"
                      className="w-6 h-6 mr-2"
                    />
                    {item.placeBasicData.countryName},{" "}
                    {item.placeBasicData.placeName}
                  </span>
                  <span className="flex justify-center text-red-500 mt-8 font-bold">
                    <img
                      src={GraphIcon}
                      alt="Graph Icon"
                      className="w-6 h-6 mr-2"
                    />
                    방문 횟수 {item.visitCount}
                  </span>
                </p>
              </div>
            ))}
          </div>

          {/* 두 번째 섹션: 나머지 데이터 */}
          <div className="flex flex-wrap mx-8">
            {rankingData.slice(3).map((item, index) => (
              <div
                key={index + 4}
                className="w-full p-10 border border-black mb-5 rounded"
              >
                <p className="font-bold mb-7">
                  <span className="absolute">
                    {getRankingIcon(item.rank, true)}
                  </span>
                  <span className="absolute left-32 ml-8">
                    <img
                      src={LocationIcon}
                      alt="Location Icon"
                      className="w-6 h-6 absolute"
                    />
                    &ensp; &emsp; {item.placeBasicData.countryName},{" "}
                    {item.placeBasicData.placeName}
                  </span>
                  <span className="text-red-500 absolute right-40">
                    <img
                      src={GraphIcon}
                      alt="Graph Icon"
                      className="w-6 h-6 absolute right-26"
                    />
                    &ensp; &emsp; 방문 횟수 {item.visitCount}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gray-200 rounded-lg mx-8">
            <div className="flex items-center font-bold text-lg p-2">
              <img
                src={ExclamationMarkIcon}
                alt="Exclamation Mark"
                className="w-4 h-4 mx-2"
              />
              <h2>랭킹 집계 안내</h2>
            </div>
            <div className="text-gray-600 ml-8 p-2">
              <h4>집계 대상 여행 기록 게시글</h4>
              <h4>
                집계 기간 월 별/계절 별 랭킹은 여행 출발일을 기준으로 하여 집계
                됩니다.
              </h4>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MonthRanking;
