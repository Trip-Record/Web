import RegisterStringInput from "./form/RegisterInput";
import { useState } from "react";
import { FormError } from "./RegisterPage";

export default function NewPostInputPage() {
  const [travelName, setTravelName] = useState("");
  const [error, setError] = useState<FormError>({});
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
