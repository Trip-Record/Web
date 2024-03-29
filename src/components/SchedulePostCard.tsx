import { Link } from "react-router-dom";
import { SchedulePostData } from "../api/dummy";
import AvatarInfo from "./ui/AvatarInfo";
import LikeBtn from "./post/LikeBtn";
import CommentBtn from "./post/CommentBtn";
import CommentModal from "./comment/CommentModal";
import { useModal } from "../hooks/useModal";
import ModalButton from "./Modal";
import { UserProfile } from "../hooks/useUser";
import { useId } from "react";

export interface SchedulePlace {
  placeCountry: string;
  placeName: string;
}

export interface ScheduleDetail {
  scheduleDetailDate: string;
  scheduleContent: string;
}

export interface ScheduleData {
  totalPages: number;
  pageNumber: number;
  schedules: SchedulePost[];
}

export interface SchedulePost {
  userProfile: UserProfile;
  scheduleId: number;
  scheduleTitle: string;
  schedulePlaces: SchedulePlace[];
  scheduleStartDate: string;
  scheduleEndDate: string;
  scheduleDetails: ScheduleDetail[];
  isUserLiked: boolean;
  scheduleLikeCount: number;
  isUserCreated: boolean;
  scheduleCommentCount: number;
}

interface Props {
  scheduleData: ScheduleData;
}

export default function SchedulePost({ scheduleData }: Props) {
  const [showModal, switchModal] = useModal();
  const id = useId();

  if (!scheduleData) return <></>;

  const { schedules } = scheduleData;
  const makeStartEndDateString = (startDate: string, endDate: string) => {
    const DATE_FORM_MINUS = /-/g;
    return `${startDate.replace(DATE_FORM_MINUS, ".")} - ${endDate.replace(
      DATE_FORM_MINUS,
      "."
    )}`;
  };

  const formatDateWithWeekday = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth()는 0부터 시작하므로 +1 필요
    const day = date.getDate().toString().padStart(2, "0");

    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];

    return `${year}.${month}.${day} (${weekday})`;
  };

  return (
    <div>
      {schedules.map((schedulePost: SchedulePost, index: number) => {
        return (
          <div
            className="flex flex-col rounded-md p-2 bg-white shadow  mx-auto my-3 max-w-screen-md w-full"
            key={`${id}`}
          >
            <AvatarInfo userProfile={schedulePost.userProfile} />
            <div className="flex gap-3 text-ellipsis text-sm text-gray-400">
              <p>{`${schedulePost.schedulePlaces[0].placeCountry}, ${schedulePost.schedulePlaces[0].placeName}`}</p>
              <p>{`${makeStartEndDateString(
                schedulePost.scheduleStartDate,
                schedulePost.scheduleEndDate
              )}`}</p>
            </div>
            <div className="font-bold mb-2">{schedulePost.scheduleTitle}</div>
            {schedulePost.scheduleDetails.slice(0, 3).map((date, index) => {
              return (
                <div className="border-2 rounded-lg shadow mb-1 p-2">
                  <div className="flex" key={date.scheduleDetailDate}>
                    <h1 className="font-bold">{`DAY ${index + 1}`}</h1>
                    <p className="ml-3">
                      {formatDateWithWeekday(date.scheduleDetailDate)}
                    </p>
                  </div>
                  <p>{date.scheduleContent}</p>
                </div>
              );
            })}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <LikeBtn
                  count={schedulePost.scheduleLikeCount}
                  isLiked={schedulePost.isUserLiked}
                  id={schedulePost.scheduleId}
                  type="schedules"
                />
                <CommentBtn count={schedulePost.scheduleCommentCount} />
              </div>
              <div>
                <Link to={`/schedule/${schedulePost.scheduleId}`}>
                  모든 일정 보기
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
