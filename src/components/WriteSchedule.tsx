import React, { useState } from "react";
import TitleIcon from "./writing-icons/TitleIcon.png";
import LocationIcon from "./writing-icons/LocationIcon.png";
import DateIcon from "./writing-icons/DateIcon.png";
import ModalButton from "./Modal";
import DestinationSelection from "./DestinationSelection";
import { useModal } from "../hooks/useModal";

export default function WriteSchedule() {
  const [tripTitle, setTripTitle] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  const [isOpenDestinationModal, setDestinationModal] = useModal();
  const [isOpenPeriodModal, setPeriodModal] = useModal();

  return (
    <div className="WriteSchedule">
      <div className="mt-4 relative">
        <img
          src={TitleIcon}
          alt="Title Icon"
          className="absolute left-40 top-1/2 transform -translate-y-1/2 w-7 h-7"
        />
        <input
          type="text"
          id="tripTitle"
          placeholder="여행의 제목을 입력해주세요."
          className="w-4/5 p-2 pl-10 border-b border-black mt-1 outline-none mx-40"
          value={tripTitle}
          onChange={(e) => setTripTitle(e.target.value)}
        />
      </div>
      <div className="mt-4 relative flex p-2">
        <img
          src={LocationIcon}
          alt="Location Icon"
          className="absolute left-40 top-1/2 transform -translate-y-1/2 w-7 h-7"
        />
        <ModalButton
          button={
            <div className="mx-40 w-full p-2 pl-10 border-b border-black mt-1 outline-none bg-white">
              {selectedLocation
                ? `${selectedLocation}`
                : "여행 장소를 선택해주세요."}
            </div>
          }
          modal={
            <DestinationSelection onLocationSelect={handleLocationSelect} />
          }
          isOpenModal={isOpenDestinationModal}
          setModal={setDestinationModal}
        />
        <img
          src={DateIcon}
          alt="Date Icon"
          className="absolute left-1/2 top-1/2 transform -translate-y-1/2 w-7 h-7"
        />
        <ModalButton
          button={
            <div className="ml-48 w-full p-2 pl-10 border-b border-black mt-1 outline-none bg-white">
              여행 기간을 선택해주세요.
            </div>
          }
          modal={<div>여행 기간 선택 화면</div>}
          isOpenModal={isOpenPeriodModal}
          setModal={setPeriodModal}
        />
      </div>
    </div>
  );
}
