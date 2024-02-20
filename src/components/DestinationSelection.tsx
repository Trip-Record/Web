import React, { useState, useEffect } from "react";
import axios from "axios";

interface Place {
  placeId: number;
  countryName: string;
  placeName: string;
}

interface Continent {
  continentName: string;
  placeBasicDataList: Place[];
}

interface Props {
  onLocationSelect: (locations: string[]) => void;
  setSelectedLocationIdArray: (locationId: number[]) => void;
  closeModal: () => void;
}

export default function DestinationSelection({
  setSelectedLocationIdArray,
  onLocationSelect,
  closeModal,
}: Props) {
  const [continents, setContinents] = useState<Continent[]>([]);
  const [selectedContinent, setSelectedContinent] =
    useState<string>("아시아/중동");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    []
  );
  const [selectionLimitReached, setSelectionLimitReached] =
    useState<boolean>(false);
  const [countries, setCountries] = useState<string[]>([]);
  // 선택된 도시들의 placeId를 저장할 상태 추가
  const [selectedPlaceIds, setSelectedPlaceIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get<Continent[]>(
          "http://15.164.19.143:8080/locations"
        );

        const continentsSet = new Set<string>();
        const countriesSet = new Set<string>();
        const citiesSet = new Set<string>();

        response.data.forEach((continent) => {
          continentsSet.add(continent.continentName);
          continent.placeBasicDataList.forEach((place) => {
            countriesSet.add(place.countryName);
            citiesSet.add(place.placeName);
          });
        });

        const uniqueContinents = Array.from(continentsSet);
        const uniqueCountries = Array.from(countriesSet);
        const uniqueCities = Array.from(citiesSet);

        setContinents(
          uniqueContinents.map((continentName) => ({
            continentName,
            placeBasicDataList: response.data
              .filter((continent) => continent.continentName === continentName)
              .flatMap((continent) => continent.placeBasicDataList),
          }))
        );
        setCountries(uniqueCountries);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  const handleContinentSelect = (continentName: string) => {
    setSelectedContinent(continentName);
    setSelectedCountry("");
    setSelectedCity("");
  };

  const handleCountrySelect = (countryName: string) => {
    setSelectedCountry(countryName);
    setSelectedCity("");
  };

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
  };

  // handleSelectionComplete 함수에서 선택된 도시의 placeId를 추출하여 저장하는 부분 수정
  const handleSelectionComplete = () => {
    let location = selectedContinent;
    let selectedPlaceId: number | null = null;
    if (selectedCountry) {
      location += ` > ${selectedCountry}`;
      if (selectedCity) {
        location += ` > ${selectedCity}`;
        const selectedCityData = continents
          .find((c) => c.continentName === selectedContinent)
          ?.placeBasicDataList.find(
            (place) =>
              place.countryName === selectedCountry &&
              place.placeName === selectedCity
          );
        if (selectedCityData) {
          selectedPlaceId = selectedCityData.placeId;
        }
      }
    }

    if (selectedDestinations.length < 3) {
      setSelectedDestinations([...selectedDestinations, location]);
      setSelectedContinent("아시아/중동");
      setSelectedCountry("");
      setSelectedCity("");
      setSelectionLimitReached(false);
      if (selectedPlaceId !== null) {
        // 선택된 도시의 placeId를 selectedPlaceIds에 추가
        setSelectedPlaceIds([...selectedPlaceIds, selectedPlaceId]);
      }
    } else {
      setSelectionLimitReached(true);
    }
  };

  // handleSelectionEnd 함수에서 콘솔에 선택된 도시들의 placeId를 출력하는 부분 추가
  const handleSelectionEnd = () => {
    setSelectedLocationIdArray(selectedPlaceIds);
    onLocationSelect(selectedDestinations);
    closeModal();
  };

  // removeSelectedDestination 함수에서 선택된 도시의 placeId를 목록에서 제거하는 부분 추가
  const removeSelectedDestination = (index: number) => {
    const removedDestination = selectedDestinations[index];
    const removedDestinationParts = removedDestination.split(" > ");
    const selectedContinentName = removedDestinationParts[0];
    const selectedCountryName = removedDestinationParts[1];
    const selectedCityName = removedDestinationParts[2];
    const removedDestinationData = continents
      .find((c) => c.continentName === selectedContinentName)
      ?.placeBasicDataList.find(
        (place) =>
          place.countryName === selectedCountryName &&
          place.placeName === selectedCityName
      );
    const removedPlaceId = removedDestinationData?.placeId;

    if (removedPlaceId !== undefined) {
      console.log("Removed placeId:", removedPlaceId);
      // 선택된 도시의 placeId를 목록에서 제거
      setSelectedPlaceIds(
        selectedPlaceIds.filter((id) => id !== removedPlaceId)
      );
    }

    const updatedDestinations = selectedDestinations.filter(
      (_, i) => i !== index
    );
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
                key={continent.continentName}
                className={`cursor-pointer mt-4 mb-4 ml-32 ${
                  selectedContinent === continent.continentName
                    ? "text-blue-500 font-bold"
                    : "text-gray-700"
                }`}
                onClick={() => handleContinentSelect(continent.continentName)}
              >
                {continent.continentName}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-1/2">
          <ul className="list-none mt-4 p-0 border border-blue-300 border-solid rounded-md">
            {selectedContinent &&
              countries
                .filter((country) =>
                  continents
                    .find((c) => c.continentName === selectedContinent)
                    ?.placeBasicDataList.find(
                      (place) => place.countryName === country
                    )
                )
                .map((country) => (
                  <li key={country}>
                    <div
                      className={`cursor-pointer mt-4 mb-4 ml-32 ${
                        selectedCountry === country
                          ? "text-blue-500 font-bold"
                          : "text-gray-700"
                      }`}
                      onClick={() => handleCountrySelect(country)}
                    >
                      {country}
                    </div>
                    {selectedCountry === country && (
                      <div className="mt-2">
                        <select
                          value={selectedCity}
                          onChange={(e) => handleCitySelect(e.target.value)}
                          className="w-full p-2 border rounded text-gray-700"
                        >
                          <option value="" disabled>
                            도시를 선택하세요.
                          </option>
                          {continents
                            .find((c) => c.continentName === selectedContinent)
                            ?.placeBasicDataList.map(
                              (place) =>
                                place.countryName === selectedCountry && (
                                  <option
                                    key={place.placeId}
                                    value={place.placeName}
                                  >
                                    {place.placeName}
                                  </option>
                                )
                            )}
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
          onClick={() => handleSelectionEnd()}
          className="mt-4 ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-bold"
        >
          종료
        </button>
      </div>
    </div>
  );
}
