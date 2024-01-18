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

export default function WriteRecord() {
  const [travelName, setTravelName] = useState("");
  const [error, setError] = useState<FormError>({});
  const [calendar, setCalendar] = useState(false);
  const [selectedDays, setSelectedDays] = useState<SelectDate>([new Date()]);
  const [showSelectDays, setShowSelectDays] = useState("");

  const { showModal, switchModal } = useModal();

  const calendarToggle = () => {
    if (calendar) {
      setCalendar(false);
    } else {
      setCalendar(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="">
      <div></div>

      <form
        onSubmit={handleSubmit}
        className="flex w-1/3 flex-col mx-auto shadow bg-white gap-3 rounded-md p-5"
      >
        <div className="flex  border-black border-b-[2px] pb-2 items-center">
          <MdSubtitles size={40} color={"#60a4f9"} className="mr-3" />
          <input
            type="text"
            placeholder="기록할 여행의 제목을 입력해주세요"
            className="h-10 border border-black/20 shadow-sm rounded-md text-black p-2 w-full mt-1"
          />
        </div>
        <div className="flex border-black border-b-2 pb-2 items-center">
          <FaLocationDot size={40} color={"#60a4f9"} className="mr-3" />
          <input
            placeholder=" 여행 장소를 선택해주세요"
            type="text"
            readOnly
            className="h-10 border border-black/20 shadow-sm rounded-md text-black p-2 w-full mt-1"
          />
        </div>
        <div className="flex border-black border-b-2 pb-2 items-center">
          <LuCalendarCheck size={40} color={"#60a4f9"} className="mr-3" />
          <ModalButton
            showModal={showModal}
            switchModal={switchModal}
            button={
              <input
                placeholder=" 여행 기간을 선택해주세요"
                type="text"
                readOnly
                className="h-10 border border-black/20 shadow-sm rounded-md text-black p-2 w-full mt-1"
                onClick={calendarToggle}
                value={showSelectDays}
              />
            }
            modal={
              <Calendar
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
                setShowSelectDays={setShowSelectDays}
                isPrevMonth={true}
                isNextMonth={true}
                switchmodal={switchModal}
              />
            }
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
    </div>
  );
}
