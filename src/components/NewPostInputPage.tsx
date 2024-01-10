import RegisterStringInput from "./form/RegisterInput";
import { useState } from "react";
import { FormError } from "./RegisterPage";

export default function NewPostInputPage() {
  const [travelName, setTravelName] = useState("");
  const [error, setError] = useState<FormError>({});

  const TRAVEL_AREA = {
    국내: [
      "서울",
      "김포",
      "제주",
      "부산",
      "광주",
      "여수",
      "대구",
      "청주",
      "여수",
    ],
    일본: [
      "도쿄",
      "오사카",
      "후쿠오카",
      "삿포로",
      "오키나와",
      "나고야",
      "구마모토",
      "키타큐슈",
    ],
  };

  return (
    <div className="flex flex-col w-1/2 bg-slate-400 mx-auto">
      <div>대충 로고</div>
      <RegisterStringInput
        label="여행 제목"
        placeholder="기록할 여행의 제목을 입력해주세요"
        setValue={setTravelName}
        value={travelName}
        type="name"
        error={error}
        inputType="text"
      />
      <RegisterStringInput
        label="여행 제목"
        placeholder="여행 장소를 선택해주세요"
        setValue={setTravelName}
        value={travelName}
        type="name"
        error={error}
        inputType="text"
      />
      <RegisterStringInput
        label="여행 제목"
        placeholder="여행 기간을 선택해주세요"
        setValue={setTravelName}
        value={travelName}
        type="name"
        error={error}
        inputType="text"
      />
      <textarea placeholder="내용" rows={10}></textarea>
    </div>
  );
}
