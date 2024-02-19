import React, { useState } from "react";

interface DestinationSelectionProps {
  onLocationSelect: (location: string[]) => void;
  closeModal: () => void;
}

export default function DestinationSelection({
  onLocationSelect,
  closeModal,
}: DestinationSelectionProps) {
  const continents = [
    {
      name: "아시아/중동",
      countries: [
        {
          name: "대한민국",
          cities: [
            "서울",
            "부산",
            "대구",
            "인천",
            "광주",
            "대전",
            "울산",
            "세종",
            "경기도",
            "강원도",
            "충청북도",
            "충청남도",
            "전라북도",
            "전라남도",
            "경상북도",
            "경상남도",
            "제주도",
          ],
        },
        {
          name: "라오스",
          cities: ["루앙프라방"],
        },
        {
          name: "말레이시아",
          cities: ["코타키나발루", "쿠알라룸푸르"],
        },
        {
          name: "베트남",
          cities: ["나트랑", "다낭", "푸꾸옥", "하노이"],
        },
        {
          name: "싱가포르",
          cities: ["싱가포르"],
        },
        {
          name: "인도네시아",
          cities: ["발리"],
        },
        {
          name: "일본",
          cities: ["도쿄(동경)", "삿포로", "오사카", "오키나와", "후쿠오카"],
        },
        {
          name: "중국",
          cities: ["상하이", "칭다오"],
        },
        {
          name: "타이완",
          cities: ["타이베이"],
        },
        {
          name: "태국",
          cities: ["방콕", "푸켓"],
        },
        {
          name: "튀르키예",
          cities: ["이스탄불"],
        },
        {
          name: "필리핀",
          cities: ["보홀", "세부", "보라카이"],
        },
        {
          name: "홍콩",
          cities: ["홍콩"],
        },
      ],
    },
    {
      name: "유럽",
      countries: [
        {
          name: "독일",
          cities: ["베를린"],
        },
        {
          name: "러시아",
          cities: ["블라디보스토크", "모스크바", "상트페테르부르크"],
        },
        {
          name: "스위스",
          cities: ["인터라켄", "루체른"],
        },
        {
          name: "스페인",
          cities: ["마드리드", "바르셀로나"],
        },
        {
          name: "영국",
          cities: ["런던", "리버풀", "맨체스터"],
        },
        {
          name: "오스트리아",
          cities: ["비엔나", "잘츠부르크"],
        },
        {
          name: "이탈리아",
          cities: ["로마", "베네치아", "피렌체"],
        },
        {
          name: "체코",
          cities: ["프라하"],
        },
        {
          name: "크로아티아",
          cities: ["두브로브니크", "자그레브"],
        },
        {
          name: "포르투갈",
          cities: ["포르투"],
        },
        {
          name: "프랑스",
          cities: ["파리"],
        },
      ],
    },
    {
      name: "북아메리카",
      countries: [
        {
          name: "멕시코",
          cities: ["멕시코 시티", "칸쿤"],
        },
        {
          name: "미국",
          cities: [
            "뉴욕",
            "라스베이거스",
            "로스앤젤레스",
            "샌프란시스코",
            "하와이",
          ],
        },
        {
          name: "캐나다",
          cities: ["벤쿠버", "퀘벡", "토론토"],
        },
        {
          name: "쿠바",
          cities: ["아바나"],
        },
      ],
    },
    {
      name: "남아메리카",
      countries: [
        {
          name: "브라질",
          cities: ["상파울루"],
        },
        {
          name: "페루",
          cities: ["쿠스코"],
        },
      ],
    },
    {
      name: "오세아니아",
      countries: [
        {
          name: "괌",
          cities: ["괌"],
        },
        {
          name: "뉴질랜드",
          cities: ["오클랜드", "해밀턴"],
        },
        {
          name: "북마리아나 군도",
          cities: ["사이판"],
        },
        {
          name: "호주",
          cities: ["멜버른", "시드니"],
        },
      ],
    },
    {
      name: "아프리카",
      countries: [
        {
          name: "남아프리카공화국",
          cities: ["요하네스버그", "케이프타운"],
        },
        {
          name: "마다가스카르",
          cities: ["마다가스카르"],
        },
        {
          name: "이집트",
          cities: ["기자", "카이로"],
        },
      ],
    },
  ];

  const [selectedContinent, setSelectedContinent] = useState("아시아/중동");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    []
  );
  const [selectionLimitReached, setSelectionLimitReached] = useState(false);

  const handleContinentSelect = (continent: string) => {
    setSelectedContinent(continent);
    setSelectedCountry("");
    setSelectedCity("");
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setSelectedCity("");
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  const handleSelectionComplete = () => {
    let location = selectedContinent;
    if (selectedCountry) {
      location += ` > ${selectedCountry}`;
      if (selectedCity) {
        location += ` > ${selectedCity}`;
      }
    }

    if (selectedDestinations.length < 3) {
      setSelectedDestinations([...selectedDestinations, location]);
      // Clear the selection state to allow for new selections
      setSelectedContinent("아시아/중동");
      setSelectedCountry("");
      setSelectedCity("");
      setSelectionLimitReached(false); // Reset the selection limit flag
    } else {
      setSelectionLimitReached(true); // Indicate that the selection limit has been reached
    }
  };

  const handleSelectionEnd = () => {
    onLocationSelect(selectedDestinations);
    closeModal();
  };

  const removeSelectedDestination = (index: number) => {
    const updatedDestinations = [...selectedDestinations];
    updatedDestinations.splice(index, 1);
    setSelectedDestinations(updatedDestinations);
  };

  return (
    <div className="mt-16 p-4 bg-white border rounded-md fixed top-20 left-96 w-1/2 h-3/5 overflow-y-auto">
      <h2 className="text-black-500 font-bold mb-2 text-3xl">주요 도시</h2>
      <div className="flex gap-4">
        <div className="w-1/2">
          <ul className="list-none p-0 mt-4 border border-blue-300 border-solid rounded-md">
            {continents.map((continent) => (
              <li
                key={continent.name}
                className={`cursor-pointer mt-4 mb-4 ml-32 ${
                  selectedContinent === continent.name
                    ? "text-blue-500 font-bold"
                    : "text-gray-700"
                }`}
                onClick={() => handleContinentSelect(continent.name)}
              >
                {continent.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-1/2">
          <ul className="list-none mt-4 p-0 border border-blue-300 border-solid rounded-md">
            {selectedContinent &&
              continents
                .find((c) => c.name === selectedContinent)
                ?.countries.map((country) => (
                  <li key={country.name}>
                    <div
                      className={`cursor-pointer mt-4 mb-4 ml-32 ${
                        selectedCountry === country.name
                          ? "text-blue-500 font-bold"
                          : "text-gray-700"
                      }`}
                      onClick={() => handleCountrySelect(country.name)}
                    >
                      {country.name}
                    </div>
                    {selectedCountry === country.name && (
                      <div className="mt-2">
                        <select
                          value={selectedCity}
                          onChange={(e) => handleCitySelect(e.target.value)}
                          className="w-full p-2 border rounded text-gray-700"
                        >
                          <option value="" disabled>
                            도시를 선택하세요.
                          </option>
                          {country.cities.map((city) => (
                            <option
                              key={city}
                              value={city}
                              className={
                                selectedCity === city
                                  ? "text-blue-500 font-bold"
                                  : "text-gray-700"
                              }
                            >
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </li>
                ))}
          </ul>
        </div>
      </div>

      {selectedDestinations.length > 0 && (
        <div className="mt-4">
          <p className="font-bold">선택된 여행지 : </p>
          {selectedDestinations.map((destination, index) => (
            <div key={index} className="flex items-center">
              <p className="my-1">{destination}</p>
              <button
                onClick={() => removeSelectedDestination(index)}
                className="ml-2 h-6 w-6 bg-red-500 text-white rounded hover:bg-red-600 font-bold"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
      {selectionLimitReached && (
        <p className="text-red-500">* 여행지는 최대 3개까지 선택 가능합니다!</p>
      )}

      <div className="w-full flex justify-end">
        <button
          onClick={handleSelectionComplete}
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold"
          disabled={!selectedContinent || !selectedCountry || !selectedCity}
        >
          선택
        </button>
        <button
          onClick={handleSelectionEnd}
          className="mt-4 ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold"
        >
          종료
        </button>
      </div>
    </div>
  );
}
