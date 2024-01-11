import RegisterStringInput from "./form/RegisterInput";
import { useState } from "react";
import { FormError } from "./RegisterPage";

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
    "Asia/MiddleEast" : [{"대한민국" : ["강원도", "경기도", "부산광역시", "서울특별시", "전라남도", "제주도"]},{"라오스" : "루앙프라방"}, {"말레이시아" :"코타키나발루", "쿠알라룸푸르"} ],
    "Europe" : [{"독일" : ["베를린"]},{"러시아" : ["블라디보스토크", "모스크바", "상트페테르부르크"]}]
  }


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
