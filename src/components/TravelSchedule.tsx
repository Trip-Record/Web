import { Link } from "react-router-dom";
import { SchedulePostData } from "../api/dummy";
import AvatarInfo from "./ui/AvatarInfo";
import PageNation from "./ui/PageNation";
import SchedulePost from "./SchedulePostCard";
import AddRecordAndSchedule from "./ui/AddRecordAndSchedule";
import Posts from "./Posts";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import { useGetSchedulePostsQuery } from "../api/schedule";
import { UserProfile } from "../hooks/useUser";
import { useSearchParams } from "react-router-dom";

interface SchedulePlace {
  placeCountry: string;
  placeName: string;
}

interface ScheduleDetail {
  scheduleDetailDate: string;
  scheduleContent: string;
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

export default function TravelSchedule() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 0);
  const { data } = useGetSchedulePostsQuery(page - 1);
  const { user } = useUser();
  console.log(page);
  const [hoverState, setHoverState] = useState<"none" | "in" | "out">("none");

  const link_record = user ? "/write-record" : "/login";
  const link_schedule = user ? "/write-schedule" : "/login";

  const newClass = `h-12 mb-1 mx-auto aspect-square shadow-lg leading-none items-center justify-center text-white bg-black/50 rounded-full ${
    hoverState === "in" ? "flex" : "hidden"
  }`;
  if (!data) return <></>;
  return (
    <div className="flex flex-col w-screen">
      <SchedulePost scheduleData={data} />;
      <PageNation maxPage={data?.totalPages} showPage={5} />
      <AddRecordAndSchedule />
    </div>
  );
}
