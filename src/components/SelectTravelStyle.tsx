import { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Radios from "./form/Radios";
import axios from "axios";
import { HOST } from "../constants";
import { getLoginToken } from "../services/storage";
import { useUser } from "../hooks/useUser";

export const STYLES = [
  {
    id: 1,
    image: "/travel_style/PhotoIcon.png",
    title: "인생 사진형",
    subtitle: "남는 건 사진 뿐",
  },
  {
    id: 2,
    image: "/travel_style/EyeCatcherIcon.png",
    title: "눈으로 담기형",
    subtitle: "눈으로 담는게 최고야",
  },
  {
    id: 3,
    image: "/travel_style/PlannerIcon.png",
    title: "계획형",
    subtitle: "여행도 계획적으로",
  },
  {
    id: 4,
    image: "/travel_style/NoPlanIcon.png",
    title: "즉흥형",
    subtitle: "끌리는 대로!",
  },
  {
    id: 5,
    image: "/travel_style/HealingIcon.png",
    title: "힐링 휴양형",
    subtitle: "휴식과 힐링이 중요",
  },
  {
    id: 6,
    image: "/travel_style/BusyScheduleIcon.png",
    title: "빡센 일정형",
    subtitle: "가볼 곳이 많음",
  },
  {
    id: 7,
    image: "/travel_style/LandmarkIcon.png",
    title: "명소 방문형",
    subtitle: "유명명소는 가야해",
  },
  {
    id: 8,
    image: "/travel_style/ShoppingIcon.png",
    title: "쇼핑형",
    subtitle: "쇼핑이 최고야",
  },
];

interface TripStyleData {
  message: string;
}

export default function SelectTravelStyle() {
  const [select, setSelect] = useState<number | null>(null);
  const [tripStyleData, setTripStyleData] = useState<TripStyleData | null>(
    null
  );
  const { logout, user } = useUser();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (select !== null) {
      try {
        const token = getLoginToken();
        const response = await axios.post(
          HOST + `/users/trip-styles/${select}`,
          {},
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate("/my-page");
        setTripStyleData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <section className="flex flex-col items-center p-1">
      <h2 className="text-2xl my-4 p-1 text-balance text-center">
        여행 스타일을 선택하고 비슷한 유형의 여행자들을 만나보세요
      </h2>
      <form onSubmit={onSubmit}>
        <main className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-screen-lg border border-black/20 bg-white rounded-lg p-4 shadow-md">
          <Radios valueList={STYLES} setSelect={setSelect} />
        </main>
        <button
          type="submit"
          className="w-full h-12 rounded-lg border bg-blue-300 mt-4 text-black/70 font-bold disabled:text-gray-500/50"
          disabled={select === null}
        >
          확인
        </button>
      </form>
    </section>
  );
}
