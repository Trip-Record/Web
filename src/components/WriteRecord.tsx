import RegisterStringInput from "./form/RegisterInput";
import { useEffect, useState } from "react";
import { FormError } from "./RegisterPage";
import { MdSubtitles } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { LuCalendarCheck } from "react-icons/lu";
import { CiSquarePlus } from "react-icons/ci";
import Calendar from "./comment/Calendar";
import ModalButton from "./Modal";
import { SelectDate } from "./comment/Calendar";
import { useModal } from "../hooks/useModal";
import DestinationSelection from "./DestinationSelection";
import {
  recordApi,
  useDeleteRecordDetailMutation,
  useSetRecordMutation,
} from "../api/record";
import { useNavigate } from "react-router-dom";
import { Record, ResponseImage } from "../api/records";

export interface editRecordInitProps {
  editData?: Record;
  onSubmit?: (formdata: FormData) => void;
}

async function imageUrlToFile(imageUrl: string, filename: string) {
  // 이미지를 Fetch API를 사용해 가져옴
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${imageUrl}: ${response.statusText}`);
  }
  // 응답을 Blob으로 변환
  const imageBlob = await response.blob();
  // Blob을 File로 변환
  const file = new File([imageBlob], filename, { type: imageBlob.type });
  return file;
}

async function getfileData(imageUrls: ResponseImage[]) {
  // TODO: CORS 해결
  return [];
  const files = await Promise.all(
    imageUrls.map((url, i) => imageUrlToFile(url.recordImageUrl, i + ""))
  );
  return files;
}

function getSelectedDays(startDay?: string, endDay?: string) {
  if (!startDay && !endDay) {
    return undefined;
  }

  if (startDay)
    return endDay
      ? [new Date(startDay), new Date(endDay)]
      : [new Date(startDay)];
}

export default function WriteRecord({
  editData,
  onSubmit,
}: editRecordInitProps) {
  const initData = {
    travelName: editData?.recordTitle,
    travelDetails: editData?.recordContent,
    images: [],
    selectedDays: getSelectedDays(
      editData?.tripStartDate,
      editData?.tripEndDate
    ),
    selectedDestinations: editData?.recordPlaces.map(
      (place) => `${place.countryName} > ${place.placeName}`
    ),
    selectedLocation: editData?.recordPlaces.map(
      (place) => `${place.countryName} > ${place.placeName}`
    ),
    selectedLocationIdArray: editData?.recordPlaces.map(
      (place) => place.placeId
    ),
  };

  useEffect(() => {
    getfileData(editData?.recordImages ?? []).then((images) =>
      setImages(images)
    );
  }, [editData]);

  //서버로 보낼 데이터
  const [travelName, setTravelName] = useState(initData.travelName ?? "");
  const [travelDetails, setTravelDetails] = useState(
    initData.travelDetails ?? ""
  );
  const [images, setImages] = useState<File[]>(initData.images ?? []);
  const [selectedDays, setSelectedDays] = useState<SelectDate>(
    initData.selectedDays ?? [new Date()]
  );
  const [selectedLocationIdArray, setSelectedLocationIdArray] = useState<
    number[]
  >(initData.selectedLocationIdArray ?? []);

  //화면에 만 보일 데이터
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    initData.selectedDestinations ?? []
  );
  const [selectedLocation, setSelectedLocation] = useState<string[]>(
    initData.selectedLocation ?? []
  );

  //기타 state
  const [calendar, setCalendar] = useState(false);
  const [isModalOpen, setModal] = useModal();
  const [isOpenDestinationModal, setDestinationModal] = useModal();
  const [isOpenPeriodModal, setPeriodModal] = useModal();
  const navi = useNavigate();

  const handleLocationSelect = (location: string[]) => {
    setSelectedLocation(location);
  };

  const resetSelectedLocation = () => {
    setSelectedLocation([]);
    setDestinationModal();
  };

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

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해주고, 두 자리로 만듭니다.
    const day = date.getDate().toString().padStart(2, "0"); // 일을 두 자리로 만듭니다.

    return `${year}-${month}-${day}`;
  };

  const calendarToggle = () => {
    if (calendar) {
      setCalendar(false);
    } else {
      setCalendar(true);
    }
  };

  const [setRecord, { isLoading, isSuccess, isError, error }] =
    recordApi.useSetRecordMutation();

  const [deleteRecordDetail] = useDeleteRecordDetailMutation();

  const handleDeleteClick = (recordId: number) => {
    // const deleteCheck = window.confirm("해당 게시글을 삭제하시겠습니까?");
    // if (deleteCheck) {
    deleteRecordDetail(recordId).unwrap();
    // }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("recordTitle", travelName);
    formData.append("recordContent", travelDetails);
    images.forEach((image) => formData.append("recordImages", image));
    console.log(selectedLocationIdArray);
    selectedLocationIdArray.forEach((area) =>
      formData.append("placeIds", area.toString())
    );
    formData.append("startDate", formatDate(selectedDays[0]));
    if (selectedDays.length !== 2) {
      formData.append("endDate", formatDate(selectedDays[0]));
    } else {
      formData.append("endDate", formatDate(selectedDays[1]));
    }
    // 수정인경우
    if (editData) {
      console.log("삭제", editData?.recordId);
      await handleDeleteClick(editData?.recordId);
    }
    try {
      const response = await setRecord(formData).unwrap();
      navi("/travel-record");
      console.log(response);
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
    <div className="p-2 sm:max-w-[800px] mx-auto">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex flex-col  shadow bg-white gap-3 rounded-md p-5 mt-10"
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
          <ModalButton
            button={
              <input
                className="h-10 border border-black/20 shadow-sm rounded-md text-black p-2 w-full mt-1"
                placeholder=" 여행 장소를 선택해 주세요"
                value={selectedLocation.join(", ")}
              />
            }
            modal={
              <DestinationSelection
                setSelectedLocationIdArray={setSelectedLocationIdArray}
                onLocationSelect={handleLocationSelect}
                closeModal={setDestinationModal}
                selectedDestinations={selectedDestinations}
                setSelectedDestinations={setSelectedDestinations}
                key={isOpenDestinationModal.toString()}
              />
            }
            isOpenModal={isOpenDestinationModal}
            setModal={setDestinationModal}
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
