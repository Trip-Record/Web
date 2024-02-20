import { Link } from "react-router-dom";
import { SchedulePostData } from "../api/dummy";
import AvatarInfo from "./ui/AvatarInfo";
import LikeBtn from "./post/LikeBtn";
import CommentBtn from "./post/CommentBtn";
import CommentModal from "./comment/CommentModal";
import { useModal } from "../hooks/useModal";
import ModalButton from "./Modal";
import { UserProfile } from "../hooks/useUser";

interface SchedulePlace {
  placeCountry: string;
  placeName: string;
}

interface ScheduleDetail {
  scheduleDetailDate: string;
  scheduleContent: string;
}

interface ScheduleData {
  totalpage: number;
  pageNumber: number;
  schedules: SchedulePost[];
}

interface SchedulePost {
  userProfile: UserProfile;
  scheduleId: number;
  scheduleTitle: string;
  schedulePlaces: SchedulePlace[];
  scheduleStartDate: string;
  scheduleEndDate: string;
  scheduleDetails: ScheduleDetail[];
  isUserLiked: boolean;
  scheduleLikeCount: number;
  scheduleCommentCount: number;
}

interface Props {
  scheduleData: ScheduleData;
}

export default function SchedulePost({ scheduleData }: Props) {
  const [showModal, switchModal] = useModal();

  if (!scheduleData) return <></>;

  const { schedules } = scheduleData;
  const makeStartEndDateString = (startDate: string, endDate: string) => {
    return `${startDate.replace(/-/g, ".")} - ${endDate.replace(/-/g, ".")}`;
  };

  return (
    <div>
      {schedules.map((schedulePost: SchedulePost, index: number) => {
        return (
          <div
            className="flex flex-col gap-1 rounded-md p-2 bg-white shadow w-2/5 mx-auto my-3"
            key={schedulePost.scheduleId}
          >
            <AvatarInfo userProfile={schedulePost.userProfile} />
            <div className="flex gap-3">
              <p>{`${schedulePost.schedulePlaces[0].placeCountry}, ${schedulePost.schedulePlaces[0].placeName}`}</p>
              <p>{`${makeStartEndDateString(
                schedulePost.scheduleStartDate,
                schedulePost.scheduleEndDate
              )}`}</p>
            </div>
            <div>{schedulePost.scheduleTitle}</div>
            {schedulePost.scheduleDetails.map((date, index) => {
              return (
                <div className="border-2 rounded-lg shadow mb-1 p-2">
                  <div>{}</div>
                  <div className="flex" key={date.scheduleDetailDate}>
                    <h1 className="font-bold">{`DAY ${index + 1}`}</h1>
                    <p className="ml-3">{date.scheduleDetailDate}</p>
                  </div>
                  <p>{date.scheduleContent}</p>
                </div>
              );
            })}
            <div className="flex gap-2 justify-between">
              <LikeBtn count={1} />
              <Link to={`/schedule/0`}>모든 일정 보기</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
