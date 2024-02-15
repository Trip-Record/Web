import { Link } from "react-router-dom";
import { SchedulePostData } from "../api/dummy";
import AvatarInfo from "./ui/AvatarInfo";
import LikeBtn from "./post/LikeBtn";
import CommentBtn from "./post/CommentBtn";
import CommentModal from "./comment/CommentModal";
import { useModal } from "../hooks/useModal";
import ModalButton from "./Modal";
import { useGetSchedulePostsQuery } from "../api/schedule";

interface Props {
  schedulePost: SchedulePostData;
}

interface SchedulePlace {
  placeCountry: string;
  placeName: string;
}

interface ScheduleDetail {
  scheduleDetailDate: string;
  scheduleContent: string;
}
interface SchedulePost {
  //TODO:유저 프로필 부분 추후작성
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

export default function SchedulePost({ schedulePost }: Props) {
  const { id, title, userId } = schedulePost;
  const region = "대한민국, 부산";
  const signatureImg = "/logo192.png";
  const date = "2024.03.08 ~ 2024.03.10";
  const [showModal, switchModal] = useModal();

  const { data } = useGetSchedulePostsQuery(0);
  if (!data) return <></>;
  const scheduleCount = data.schedules;
  console.log(scheduleCount);

  const makeStartEndDateString = (startDate: string, endDate: string) => {
    return `${startDate.replace("-", ".")} - ${endDate.replace("-", ".")}`;
  };

  const createDateRangeArray = (
    scheduleStartDate: string,
    scheduleEndDate: string
  ): string[] => {
    const daysOfWeek: string[] = ["일", "월", "화", "수", "목", "금", "토"];
    const startDate: Date = new Date(scheduleStartDate);
    const endDate: Date = new Date(scheduleEndDate);

    let dateList: string[] = [];
    let currentDate: Date = new Date(startDate);

    while (currentDate <= endDate) {
      // Get the day of the week
      const dayOfWeek: string = daysOfWeek[currentDate.getDay()];

      // Format date as 'YYYY-MM-DD (Day)'
      const formattedDate: string = `${
        currentDate.toISOString().split("T")[0]
      } (${dayOfWeek})`;
      dateList.push(formattedDate);

      // Increment the date by one day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateList;
  };

  return (
    <div>
      {scheduleCount.map((schedulePost: SchedulePost, index: number) => {
        return (
          <div
            className="flex flex-col gap-1 rounded-md p-2 bg-white shadow w-2/5 mx-auto my-3"
            key={schedulePost.scheduleId}
          >
            <AvatarInfo userId={userId} />
            <div className="flex gap-3">
              <p>{`${schedulePost.schedulePlaces[0].placeCountry}, ${schedulePost.schedulePlaces[0].placeName}`}</p>
              <p>{`${makeStartEndDateString(
                schedulePost.scheduleStartDate,
                schedulePost.scheduleEndDate
              )}`}</p>
            </div>
            <div>{schedulePost.scheduleTitle}</div>
            {createDateRangeArray(
              schedulePost.scheduleStartDate,
              schedulePost.scheduleEndDate
            ).map((date, index) => {
              return (
                <div className="border-2 rounded-lg shadow mb-1 p-2">
                  <div className="flex" key={date}>
                    <h1 className="font-bold">{`DAY ${index + 1}`}</h1>
                    <p className="ml-3">{date}</p>
                  </div>
                  <p></p>
                </div>
              );
            })}
          </div>
        );
      })}
      <div className="flex flex-col gap-1 rounded-md p-2 bg-white shadow w-2/5 mx-auto my-3">
        <AvatarInfo userId={userId} />
        <div className="flex justify-between">
          <div className="flex gap-2">
            <LikeBtn count={1} />
            <ModalButton
              button={<CommentBtn postId={id} />}
              modal={<CommentModal postId={id} />}
              isOpenModal={showModal}
              setModal={switchModal}
            />
          </div>
          <Link to={`/schedule/${id}`}>모든 일정 보기</Link>
        </div>
      </div>
    </div>
  );
}
