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

const SeasonRanking = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>("2024");
  const [selectedSeason, setSelectedSeason] = useState<string | null>("겨울");
  const [rankingData, setRankingData] = useState<RankingData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const years = ["2022", "2023", "2024"];
  const seasons = ["봄", "여름", "가을", "겨울"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<RankingData[]>(
          HOST + `/ranks/seasons?year=${selectedYear}&season=${selectedSeason}`
        );
        setRankingData(response.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    if (selectedYear && selectedSeason) {
      fetchData();
    }
  }, [selectedYear, selectedSeason]);

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
          onChange={(e) => setSelectedSeason(e.target.value)}
          value={selectedSeason || ""}
        >
          <option value="" disabled>
            계절
          </option>
          {seasons.map((season, index) => (
            <option key={index} value={season}>
              {season}
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
          <div className="md:grid md:grid-cols-3 flex flex-col mb-4 px-8 gap-2">
            {rankingData.slice(0, 3).map((item, index) => (
              <div
                key={index + 1}
                className="flex justify-center border border-black rounded-lg p-3 w-full"
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
                className="w-full p-5 md:p-10 border border-black mb-5 rounded"
              >
                <p className="font-bold flex items-center">
                  <span className="mt-3">{item.rank}</span>
                  <span className="flex ml-8 items-center gap-2">
                    <img
                      src={LocationIcon}
                      alt="Location Icon"
                      className="w-6 h-6"
                    />
                    {item.placeBasicData.countryName},{" "}
                    {item.placeBasicData.placeName}
                  </span>
                  <span className="text-red-500 right-40 ml-auto flex gap-2">
                    <img
                      src={GraphIcon}
                      alt="Graph Icon"
                      className="w-6 h-6 right-26"
                    />
                    방문 횟수 {item.visitCount}
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

export default SeasonRanking;
