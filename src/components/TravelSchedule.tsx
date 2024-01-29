import { Link } from "react-router-dom";
import { SchedulePostData } from "../api/dummy";
import AvatarInfo from "./ui/AvatarInfo";
import SchedulePost from "./SchedulePost";

export default function TravelSchedule() {
  const imsiPostNubmer = [1, 1, 1, 1, 1];
  const dummySchedulePost = {
    userId: 1,
    id: 2,
    date: 5,
    title: "임시 제목",
  };
  return (
    <div className="flex flex-col bg-blue-200 w-screen">
      <div>
        {imsiPostNubmer.map(() => {
          return <SchedulePost schedulePost={dummySchedulePost}></SchedulePost>;
        })}
      </div>
      <Link to="/write-schedule" className="">
        일정 작성하기
      </Link>
    </div>
  );
}
