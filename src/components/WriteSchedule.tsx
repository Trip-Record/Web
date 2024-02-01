import React, { useState } from "react";
import { MdSubtitles } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { LuCalendarCheck } from "react-icons/lu";
import { CiSquarePlus } from "react-icons/ci";
import Calendar from "./comment/Calendar";
import ModalButton from "./Modal";
import { SelectDate } from "./comment/Calendar";
import { useModal } from "../hooks/useModal";
import axios from "axios";
import DestinationSelection from "./DestinationSelection";

export default function WriteSchedule() {
  const [travelName, setTravelName] = useState("");
  const [testTravelArea, setTestTravelArea] = useState("");
  const [travelDetails, setTravelDetails] = useState("");
  const [calendar, setCalendar] = useState(false);
  const [selectedDays, setSelectedDays] = useState<SelectDate>([new Date()]);
  const [isModalOpen, setModal] = useModal();
  const [showTextArea, setShowTextArea] = useState(Array(0).fill(false));

  const makeDaysString = (days: string[]): string => {
    return days.join(" ~ ");
  };

  const sortDays = (selectDays: SelectDate) => {
    selectDays.sort((a, b) => {
      return a.getTime() - b.getTime();
    });
    return selectDays;
  };

  const dateFormat = (selectDays: SelectDate): string[] => {
    sortDays(selectDays);
    return selectDays.map((i) => {
      return (
        i.getFullYear() +
        "-" +
        (i.getMonth() + 1 < 10 ? "0" + (i.getMonth() + 1) : i.getMonth() + 1) +
        "-" +
        (i.getDate() < 10 ? "0" + i.getDate() : i.getDate())
      );
    });
  };

  const calendarToggle = () => {
    setCalendar(!calendar);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("travelName", travelName);
    formData.append("travelArea", testTravelArea);
    formData.append("travelDetails", travelDetails);

    try {
      const response = await axios.post("testAPI", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTestTravelArea = (location: string) => {
    setTestTravelArea(location);
  };

  const [isOpenDestinationModal, setDestinationModal] = useModal();

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
      scheduleItems.push(
        <div key={i} className="border border-gray-500 rounded-md p-2 mb-2">
          <p className="font-bold ml-2">
            DAY {i + 1} &nbsp; {dateFormat([currentDate])}
          </p>
          {showTextArea[i] ? (
            <textarea
              placeholder="여행 일정을 작성하세요."
              value={travelDetails}
              onChange={(e) => {
                setTravelDetails(e.target.value);
              }}
              rows={5}
              className="border-gray-300 border-2 shadow-sm rounded-md text-black p-2 w-full mt-2"
            />
          ) : (
            <div className="flex justify-center">
              <button
                className="flex justify-center items-center cursor-pointer mb-6"
                onClick={() => toggleShowTextArea(i)}
              >
                <CiSquarePlus size={40} color={"#60a4f9"} />
              </button>
            </div>
          )}
        </div>
      );
    }

    return <div className="flex flex-col space-y-2">{scheduleItems}</div>;
  };

  const toggleShowTextArea = (index: number) => {
    const newShowTextArea = [...showTextArea];
    newShowTextArea[index] = !newShowTextArea[index];
    setShowTextArea(newShowTextArea);
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
          <FaLocationDot size={60} color={"#60a4f9"} className="ml-1.5 mr-4" />
          <ModalButton
            button={
              <input
                type="text"
                placeholder="여행 장소를 선택해주세요."
                readOnly
                className="h-10 border border-black/20 shadow-sm rounded-md text-black p-2 w-full mt-1"
                value={testTravelArea ? `${testTravelArea}` : ""}
              />
            }
            modal={
              <DestinationSelection
                onLocationSelect={handleTestTravelArea}
                closeModal={setDestinationModal}
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
                  placeholder=" 여행 기간을 선택해주세요."
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
        {selectedDays.length > 0 && renderTravelScheduleBox()}
        {selectedDays.length > 0 && (
          <div className="flex justify-center">
            <input
              type="submit"
              value={"업로드"}
              className="h-10 mt-2 mb-2 rounded-md border border-black/20 text-white font-bold bg-blue-400 w-1/5"
            />
          </div>
        )}
      </form>
    </div>
  );
}
