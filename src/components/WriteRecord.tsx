import RegisterStringInput from "./form/RegisterInput";
import { useState } from "react";
import { FormError } from "./RegisterPage";
import { MdSubtitles } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { LuCalendarCheck } from "react-icons/lu";
import { CiSquarePlus } from "react-icons/ci";
import Calendar from "./comment/Calendar";
import ModalButton from "./Modal";
import { SelectDate } from "./comment/Calendar";
import { useModal } from "../hooks/useModal";
import axios from "axios";

export default function WriteRecord() {
  const [travelName, setTravelName] = useState("");
  const [testTravelArea, setTestTravelArea] = useState("테스트 지역");
  const [travelDetails, setTravelDetails] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [calendar, setCalendar] = useState(false);
  const [selectedDays, setSelectedDays] = useState<SelectDate>([new Date()]);
  const [isModalOpen, setModal] = useModal();

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
    if (calendar) {
      setCalendar(false);
    } else {
      setCalendar(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("travelName", travelName);
    formData.append("travelArea", testTravelArea);
    formData.append("travelDetails", travelDetails);

    images.forEach((image) => formData.append("images", image));
    for (let key of formData.keys()) {
      console.log(key);
    }
    for (let value of formData.values()) {
      console.log(value);
    }
    console.log(formData);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setImages([...e.target.files]);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex w-1/3 flex-col mx-auto shadow bg-white gap-3 rounded-md p-5 mt-10"
        //method="post"
        //encType="multipart/form-data"
      >
        <div className="flex  border-black border-b-[2px] pb-2 items-center">
          <MdSubtitles size={40} color={"#60a4f9"} className="mr-3" />
          <input
            type="text"
            name="travelName"
            value={travelName}
            onChange={(e) => {
              setTravelName(e.target.value);
            }}
            placeholder="기록할 여행의 제목을 입력해주세요"
            className="h-10 border border-black/20 shadow-sm rounded-md text-black p-2 w-full mt-1"
          />
        </div>
        <div className="flex border-black border-b-2 pb-2 items-center">
          <FaLocationDot size={40} color={"#60a4f9"} className="mr-3" />
          <input
            placeholder=" 여행 장소를 선택해주세요"
            type="text"
            name="travelArea"
            value={testTravelArea}
            readOnly
            className="h-10 border border-black/20 shadow-sm rounded-md text-black p-2 w-full mt-1"
          />
        </div>
        <div className="flex border-black border-b-2 pb-2 items-center">
          <LuCalendarCheck size={40} color={"#60a4f9"} className="mr-3" />
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
        <textarea
          placeholder="여행 내용"
          name="travelDetails"
          value={travelDetails}
          onChange={(e) => {
            setTravelDetails(e.target.value);
          }}
          rows={10}
          className="border-black border-2 shadow-sm rounded-md text-black p-2 w-full"
        />
        <div>
          <label className="flex flex-col gap-3">
            <div className="font-bold">사진 &#40; 최대 10개 &#41;</div>
            <input
              type="file"
              id="chooseFile"
              name="photo"
              accept="image/*"
              onChange={handleImageChange}
              multiple
              className="file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
            />
          </label>
        </div>
        <input
          type="submit"
          value={"업로드"}
          className="h-10 mt-2 mb-2 rounded-md border border-black/20 text-white font-bold bg-blue-400"
        />
      </form>
    </div>
  );
}
