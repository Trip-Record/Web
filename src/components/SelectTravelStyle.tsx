import { FormEvent, useState } from "react";
import Radios from "./form/Radios";

const STYLES = [
  {
    image: "/travel_style/PhotoIcon.png",
    title: "인생 사진형",
    subtitle: "남는 건 사진 뿐",
  },
  {
    image: "/travel_style/EyeCatcherIcon.png",
    title: "눈으로 담기형",
    subtitle: "눈으로 담는게 최고야",
  },
  {
    image: "/travel_style/PlannerIcon.png",
    title: "계획형",
    subtitle: "여행도 계획적으로",
  },
  {
    image: "/travel_style/NoPlanIcon.png",
    title: "즉흥형",
    subtitle: "끌리는 대로!",
  },
  {
    image: "/travel_style/HealingIcon.png",
    title: "힐링 휴양형",
    subtitle: "휴식과 힐링이 중요",
  },
  {
    image: "/travel_style/BusyScheduleIcon.png",
    title: "빡센 일정형",
    subtitle: "가볼 곳이 많음",
  },
  {
    image: "/travel_style/LandmarkIcon.png",
    title: "명소 방문형",
    subtitle: "유명명소는 가야해",
  },
  {
    image: "/travel_style/ShoppingIcon.png",
    title: "쇼핑형",
    subtitle: "쇼핑이 최고야",
  },
];
export default function SelectTravelStyle() {
  const [select, setSelect] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectValue = e.currentTarget.styleToggle.value;
    console.log(selectValue);
  };
  return (
    <section className="flex flex-col items-center">
      <h2>서현님 회원가입을 환영합니다</h2>
      <h2>여행 스타일을 선택하고 비슷한 유형의 여행자들을 만나보세요</h2>
      <form onSubmit={onSubmit}>
        <main className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-screen-lg border border-black/20 rounded-lg p-4 shadow-md">
          <Radios valueList={STYLES} setSelect={setSelect} />
        </main>
        <button
          className="w-full h-12 rounded-lg border bg-blue-300 mt-4 text-black font-bold disabled:text-gray-400"
          disabled={select === ""}
        >
          확인
        </button>
      </form>
    </section>
  );
}
