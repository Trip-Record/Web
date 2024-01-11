import RegisterStringInput from "./form/RegisterInput";
import { useState } from "react";
import { FormError } from "./RegisterPage";
import { MdSubtitles } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { LuCalendarCheck } from "react-icons/lu";
import { CiSquarePlus } from "react-icons/ci";

export default function WriteRecord() {
  const [travelName, setTravelName] = useState("");
  const [error, setError] = useState<FormError>({});

  // const TRAVEL_AREA = {
  //   "대륙": [
  //     {
  //       "이름": "아시아/중동",
  //       "국가들": [
  //         {
  //           "이름": "대한민국",
  //           "도시들": ["서웉특별시", "부산광역시", "강원도", "경기도", "전라남도", "제주도"]
  //         },
  //         {
  //           "이름": "라오스",
  //           "도시들": ["비엔티안", "루앙프라방"]
  //         }
  //       ]
  //     },
  //     {
  //       "이름": "유럽",
  //       "더미": "더미 값"
  //     },
  //     {
  //       "이름": "북아메리카",
  //       "더미": "더미 값"
  //     }
  //   ],

  // }

  const DUMMY_TRAVEL_AREA = {
    "Asia/MiddleEast": [
      {
        대한민국: [
          "강원도",
          "경기도",
          "부산광역시",
          "서울특별시",
          "전라남도",
          "제주도",
        ],
      },
      { 라오스: "루앙프라방" },
      { 말레이시아: ["코타키나발루", "쿠알라룸푸르"] },
    ],
    Europe: [
      { 독일: ["베를린"] },
      { 러시아: ["블라디보스토크", "모스크바", "상트페테르부르크"] },
    ],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-1/3 flex-col mx-auto shadow bg-white gap-3 rounded-md p-5"
    >
      <div className="flex  border-black border-b-2 pb-2">
        <MdSubtitles size={50} className="mr-3" />
        <input
          type="text"
          placeholder="기록할 여행의 제목을 입력해주세요"
          className="h-10 border border-black/20 shadow-sm rounded-md text-black p-2 w-full mt-1"
        />
      </div>
      <div className="flex border-black border-b-2 pb-2">
        <FaLocationDot size={50} className="mr-3" />
        <input
          placeholder=" 여행 장소를 선택해주세요"
          type="text"
          readOnly
          className="h-10 border border-black/20 shadow-sm rounded-md text-black p-2 w-full mt-1"
        />
      </div>
      <div className="flex border-black border-b-2 pb-2">
        <LuCalendarCheck size={50} className="mr-3" />
        <input
          placeholder=" 여행 기간을 선택해주세요"
          type="text"
          readOnly
          className="h-10 border border-black/20 shadow-sm rounded-md text-black p-2 w-full mt-1"
        />
      </div>
      <textarea
        placeholder=" 내용"
        rows={10}
        className="border-black border-2 shadow-sm rounded-md text-black p-2 w-full"
      />
      <div>
        <label>
          사진 &#40; 최대 10개 &#41;
          <div>
            <CiSquarePlus size={70} className="cursor-pointer" />
          </div>
          <input
            type="file"
            id="chooseFile"
            name="chooseFile"
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>
      <input
        type="submit"
        value={"업로드"}
        className="h-10 mt-2 mb-2 rounded-md border border-black/20 text-white font-bold bg-blue-400"
      />
    </form>
  );
}
