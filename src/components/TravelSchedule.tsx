import { Link } from "react-router-dom";
import { SchedulePostData } from "../api/dummy";
import AvatarInfo from "./ui/AvatarInfo";
import PageNation from "./ui/PageNation";
import SchedulePost from "./SchedulePosts";
import AddRecordAndSchedule from "./ui/AddRecordAndSchedule";

import Posts from "./Posts";
import { useUser } from "../hooks/useUser";
import { useState } from "react";

export default function TravelSchedule() {
  const imsiPostNubmer = [1, 1, 1, 1, 1];
  const dummySchedulePost = {
    userId: 1,
    id: 2,
    date: 5,
    title: "임시 제목",
  };
  const { user } = useUser();
  // console.log();
  const [hoverState, setHoverState] = useState<"none" | "in" | "out">("none");

  const link_record = user ? "/write-record" : "/login";
  const link_schedule = user ? "/write-schedule" : "/login";

  const newClass = `h-12 mb-1 mx-auto aspect-square shadow-lg leading-none items-center justify-center text-white bg-black/50 rounded-full ${
    hoverState === "in" ? "flex" : "hidden"
  }`;

  return (
    <div className="flex flex-col w-screen">
      <SchedulePost />;
      <PageNation maxPage={12} showPage={5} />
      <AddRecordAndSchedule />
    </div>
  );
}
