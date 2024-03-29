import { Link } from "react-router-dom";
import { SchedulePostData } from "../api/dummy";
import AvatarInfo from "./ui/AvatarInfo";
import PageNation from "./ui/PageNation";
import SchedulePost from "./SchedulePostCard";
import AddRecordAndSchedule from "./ui/AddRecordAndSchedule";
import Posts from "./Posts";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    window.scrollTo({
      top: 0, // 스크롤을 맨 위로 이동
      // behavior: "smooth", // 부드러운 스크롤 이동
    });
  }, [data]);

  if (!data) return <></>;
  return (
    <div className="flex flex-col">
      <SchedulePost scheduleData={data} />;
      <PageNation maxPage={data?.totalPages} showPage={5} />
      <AddRecordAndSchedule />
    </div>
  );
}
