import React, { useEffect, useState } from "react";
import { MdSubtitles } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { LuCalendarCheck } from "react-icons/lu";
import { CiSquarePlus } from "react-icons/ci";
import Calendar from "./comment/Calendar";
import ModalButton from "./Modal";
import { SelectDate } from "./comment/Calendar";
import { useModal } from "../hooks/useModal";
import DestinationSelection from "./DestinationSelection";
import { useNavigate, useParams } from "react-router-dom";
import { useGetScheduleDetailQuery } from "../api/schedule";
import { Place } from "../api/record";
import { usePatchScheduleDetailMutation } from "../api/schedule";
import axios from "axios";

export default function ModifySchedule() {
  const [travelName, setTravelName] = useState("");
  const [testTravelArea, setTestTravelArea] = useState<string[]>([]);
  const [scheduleDetails, setScheduleDetails] = useState<any[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    []
  );
  const patchApi = usePatchScheduleDetailMutation();
  const patch = patchApi[0];
  const [calendar, setCalendar] = useState(false);
  const [selectedDays, setSelectedDays] = useState<SelectDate>([new Date()]);
  const [isModalOpen, setModal] = useModal();
  const [showTextArea, setShowTextArea] = useState(Array(0).fill(false));
  const [selectedLocationIdArray, setSelectedLocationIdArray] = useState<
    number[]
  >([]);
  const [isOpenDestinationModal, setDestinationModal] = useModal();
  const navi = useNavigate();
  const { scheduleId } = useParams();
  const { data } = useGetScheduleDetailQuery(scheduleId);
  const [scheduleContents, setScheduleContents] = useState<ScheduleContents>(
    {}
  );
  let response: any;

  interface Continent {
    continentName: string;
    placeBasicDataList: Place[];
  }

  interface ScheduleContents {
    [key: string]: string;
  }

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        response = await axios.get("http://15.164.19.143:8080/locations");
      } catch (error) {
        console.log(error);
      }
    };
  });

  console.log("리렌더링");

  useEffect(() => {
    if (data) {
      setData();
    }
  }, [data]);

  useEffect(() => {
    setShowTextArea(Array(selectedDays.length).fill(false));
  }, [selectedDays.length]);

  if (!data) return <></>;
  const setData = () => {
    setTravelName(data.scheduleTitle);
    setSelectedDays([
      makeStringtoDate(data.scheduleStartDate),
      makeStringtoDate(data.scheduleEndDate),
    ]);
    setTestTravelArea(formatSchedulePlaces(data.schedulePlaces));
    setScheduleDetails(data.scheduleDetails);

    // scheduleDetails에서 scheduleContents 상태로 변환
    const initialScheduleContents = data.scheduleDetails.reduce(
      (acc: any, detail) => {
        acc[detail.scheduleDetailDate] = detail.scheduleContent;
        return acc;
      },
      {}
    );

    setScheduleContents(initialScheduleContents);
  };

  const formatSchedulePlaces = (schedulePlaces: Place[]) => {
    const formattedPlaces = schedulePlaces.map(
      (place) => `${place.placeCountry}/${place.placeName}`
    );

    return formattedPlaces;
  };

  const makeDaysString = (days: string[]): string => {
    return days.join(" ~ ");
  };

  const handleScheduleContentChange = (dateString: string, content: string) => {
    setScheduleContents((prevContents: any) => ({
      ...prevContents,
      [dateString]: content,
    }));
  };

  const makeStringtoDate = (stringDay: string) => {
    const parts = stringDay.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    return new Date(Date.UTC(year, month, day));
  };

  const sortDays = (selectDays: SelectDate) => {
    selectDays.sort((a, b) => {
      return a.getTime() - b.getTime();
    });
    return selectDays;
  };

  const cancelModify = () => {
    const cancel = window.confirm("수정을 취소하시겠습니까?");
    if (cancel) {
      navi("/travel-schedule");
    }
  };

  const dateFormat = (selectDays: SelectDate): string[] => {
    return selectDays.map((date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    });
  };

  const calendarToggle = () => {
    setCalendar(!calendar);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해주고, 두 자리로 만듭니다.
    const day = date.getDate().toString().padStart(2, "0"); // 일을 두 자리로 만듭니다.

    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(selectedDays);

    let endDate = selectedDays[0];
    if (selectedDays.length === 2) {
      endDate = selectedDays[1];
    }

    const scheduleDetails = Object.entries(scheduleContents).map(
      ([date, content]) => ({
        scheduleDetailDate: date,
        scheduleDetailContent: content,
      })
    );

    try {
      console.log(selectedDays);
      const json = {
        scheduleId: scheduleId,
        scheduleTitle: travelName,
        placeIds: selectedLocationIdArray,
        scheduleStartDate: formatDate(selectedDays[0]),
        scheduleEndDate: formatDate(endDate),
        scheduleDetails,
      };
      console.log(scheduleDetails);
      patch(json);
      navi("/travel-schedule");
    } catch (error) {
      console.error(error);
    }
  };

  const handleTestTravelArea = (locations: string[]) => {
    setTestTravelArea(locations);
  };

  const toggleShowTextArea = (index: number) => {
    const newShowTextArea = [...showTextArea];
    newShowTextArea[index] = !newShowTextArea[index];
    setShowTextArea(newShowTextArea);
  };

  const findPlaceIds = (data: any, searchPlaces: string[]) => {
    const placeIds: number[] = [];
    // 데이터를 순회하면서 검색 조건에 맞는 장소의 ID를 찾음
    data?.forEach((continent: any) => {
      continent.placeBasicDataList.forEach((place: any) => {
        const fullPlaceName = `${place.countryName}/${place.placeName}`;
        if (searchPlaces.includes(fullPlaceName)) {
          placeIds.push(place.placeId);
        }
      });
    });

    return placeIds;
  };

  const renderTravelScheduleBox = () => {
    const startDate = selectedDays[0];
    const endDate = selectedDays[selectedDays.length - 1];
    const numberOfDays =
      Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
      ) + 1;

    const scheduleItems = [];

    for (let i = 0; i < numberOfDays; i++) {
      const currentDate = new Date(startDate.getTime() + i * 1000 * 3600 * 24);
      const currentDateString = currentDate.toISOString().split("T")[0];

      scheduleItems.push(
        <div key={i} className="border border-gray-500 rounded-md p-2 mb-2">
          <p className="font-bold ml-2">
            DAY {i + 1} &nbsp; {dateFormat([currentDate])}
          </p>
          <textarea
            className="border-gray-300 border-2 shadow-sm rounded-md text-black p-2 w-full mt-2"
            value={scheduleContents[currentDateString] || ""}
            onChange={(e) =>
              handleScheduleContentChange(currentDateString, e.target.value)
            }
            rows={5}
          />
        </div>
      );
    }

    return <div className="flex flex-col space-y-2">{scheduleItems}</div>;
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto shadow bg-white gap-3 rounded-md p-5 mt-10 w-[50%]"
      >
        <div className="flex items-center">
          <MdSubtitles size={40} color={"#60a4f9"} className="mr-3" />
          <input
            type="text"
            name="travelName"
            value={travelName}
            onChange={(e) => {
              setTravelName(e.target.value);
            }}
            placeholder="여행의 제목을 입력해주세요."
            className="h-10 border border-black/20 shadow-sm rounded-md text-black p-2 w-full mt-1"
          />
        </div>
        <div className="flex items-center">
          <FaLocationDot size={60} color={"#60a4f9"} className="ml-1 mr-4" />
          <ModalButton
            button={
              <input
                type="text"
                placeholder="여행 장소를 선택해주세요."
                readOnly
                className="h-10 border border-black/20 shadow-sm rounded-md text-black p-2 w-full mt-1"
                value=""
              />
            }
            modal={
              <DestinationSelection
                setSelectedLocationIdArray={setSelectedLocationIdArray}
                onLocationSelect={handleTestTravelArea}
                closeModal={setDestinationModal}
                selectedDestinations={selectedDestinations}
                setSelectedDestinations={setSelectedDestinations}
                key={isOpenDestinationModal.toString()}
              />
            }
            isOpenModal={isOpenDestinationModal}
            setModal={setDestinationModal}
          />
          <LuCalendarCheck size={80} color={"#60a4f9"} className="mx-3" />
          <ModalButton
            isOpenModal={isModalOpen}
            setModal={setModal}
            button={
              <label>
                <div className="h-10 border border-black/20 shadow-sm rounded-md text-black p-2 w-full mt-1">
                  {makeDaysString(dateFormat(selectedDays))}
                </div>
                <input
                  placeholder=" 여행 기간을 선택해주세요"
                  type="text"
                  readOnly
                  className="hidden"
                  onClick={calendarToggle}
                  value={dateFormat(selectedDays)}
                />
              </label>
            }
            modal={
              <Calendar
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
                isPrevMonth={true}
                isNextMonth={true}
                setModal={setModal}
              />
            }
          />
        </div>
        {testTravelArea && (
          <div className="flex flex-col mt-4">
            <div className="flex items-center">
              <FaLocationDot
                size={20}
                color={"#60a4f9"}
                className="ml-1 mr-2"
              />
              <h2 className="font-bold mr-2">선택된 여행지</h2>
            </div>
            <div className="flex items-center">
              <p>[ {testTravelArea.join(", ")} ]</p>
            </div>
          </div>
        )}
        {selectedDays.length > 0 && renderTravelScheduleBox()}
        {selectedDays.length > 0 && (
          <div className="flex justify-center gap-5">
            <input
              type="submit"
              value="수정"
              className="h-10 mt-2 mb-2 rounded-md border border-black/20 text-white font-bold bg-blue-400 w-1/5"
            />
            <button
              onClick={() => {
                cancelModify();
              }}
              className="h-10 mt-2 mb-2 rounded-md border border-black/20 text-white font-bold bg-blue-400 w-1/5"
            >
              취소
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
