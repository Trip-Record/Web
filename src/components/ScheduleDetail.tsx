import AvatarInfo from "./ui/AvatarInfo";
import LikeBtn from "./post/LikeBtn";
import ModalButton from "./Modal";
import CommentBtn from "./post/CommentBtn";
import CommentModal from "./comment/CommentModal";
import PageNation from "./ui/PageNation";
import ModifyIcon from "./ui/icons/ModifyIcon";
import DeleteIcon from "./ui/icons/DeleteIcon";
import { useParams } from "react-router-dom";
import {
  useGetScheduleDetailQuery,
  usePatchScheduleDetailMutation,
  useDeleteScheduleDetailMutation,
} from "../api/schedule";
import { useNavigate } from "react-router-dom";
import Comments from "./comment/Comments";
import LocationIcon from "./ui/icons/LocationIcon.png";
import DateIcon from "./ui/icons/DateIcon.png";

export default function ScheduleDetail() {
  const { scheduleId } = useParams();
  const { data } = useGetScheduleDetailQuery(scheduleId);
  const [deleteScheduleDetail] = useDeleteScheduleDetailMutation();
  const navi = useNavigate();

  if (!scheduleId) return <>페이지 없음...</>;
  if (!+scheduleId) return <>페이지 없음...</>;
  if (!data) return <>로딩중...</>;

  const handleDeleteClick = (scheduleId: string) => {
    const deleteCheck = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (deleteCheck) {
      deleteScheduleDetail(scheduleId)
        .unwrap()
        .then(() => {
          alert("게시글이 삭제되었습니다.");
          navi("/travel-schedule");
        })
        .catch((error) => {
          console.error("Deleting schedule failed", error);
          alert("게시글 삭제에 실패하였습니다.");
        });
    }
  };

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
    <div className="flex flex-col gap-1 rounded-md p-2 bg-white shadow w-2/5 mx-auto my-3">
      <div className="flex justify-between ">
        <AvatarInfo userProfile={data.userProfile} />
      </div>
      <div className="flex flex-col text-gray-500">
        <div className="flex gap-2">
          <img src={LocationIcon} width="25" />
          <div className="flex gap-2">
            {data.schedulePlaces.map((place) => {
              //추후 "/" 넣기
              return <p>{`${place.placeCountry},${place.placeName}`}</p>;
            })}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <img src={DateIcon} width="25" />
            <p>
              {makeStartEndDateString(
                data.scheduleStartDate,
                data.scheduleEndDate
              )}
            </p>
          </div>

          {data.isUserCreated && (
            <div className="flex items-center gap-1">
              <button
                className="flex items-center"
                onClick={() => {
                  navi(`/modify-schedule/${scheduleId}`);
                }}
              >
                <ModifyIcon size={16} /> <div className="w-10">수정</div>
              </button>
              <button
                className="flex items-center"
                onClick={() => {
                  handleDeleteClick(scheduleId);
                }}
              >
                <DeleteIcon size={18} /> <div className="w-10">삭제</div>
              </button>
            </div>
          )}
        </div>
      </div>
      <div>{data.scheduleTitle}</div>
      <div>
        {data.scheduleDetails.map((schedule, index) => {
          return (
            <div className="border-2 rounded-lg shadow mb-1 p-2">
              <div className="flex" key={schedule.scheduleDetailDate}>
                <h1 className="font-bold">{`DAY ${index + 1}`}</h1>
                <p className="ml-3">
                  {formatDateWithWeekday(schedule.scheduleDetailDate)}
                </p>
              </div>
              <p>{schedule.scheduleContent}</p>
            </div>
          );
        })}
        <div className="flex gap-2 justify-between">
          <LikeBtn
            count={data.scheduleLikeCount}
            id={data.scheduleId}
            isLiked={data.isUserLiked}
            type="schedules"
          />
        </div>
      </div>
      <Comments
        postId={+scheduleId}
        commentCount={data.scheduleCommentCount}
        type="schedules"
      />
      {/* <PageNation maxPage={} showPage={5} /> */}
    </div>
  );
}
