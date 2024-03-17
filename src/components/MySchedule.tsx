import React, { useState, useEffect } from "react";
import axios from "axios";
import LikeBtn from "./post/LikeBtn";
import CommentBtn from "./post/CommentBtn";
import { Link, useSearchParams } from "react-router-dom";
import { UserProfile } from "../hooks/useUser";
import { HOST } from "../constants";
import { getLoginToken } from "../services/storage";
import PageNation from "./ui/PageNation";
import { useGetMySchedulePostsQuery } from "../api/schedule";

interface SchedulePlace {
  placeCountry: string;
  placeName: string;
}

interface ScheduleDetail {
  scheduleDetailDate: string;
  scheduleContent: string;
}

interface ScheduleInfo {
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

export interface MyScheduleData {
  totalPages: number;
  pageNumber: number;
  scheduleInfoList: ScheduleInfo[];
}

export default function MySchedule() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 0);
  const { data } = useGetMySchedulePostsQuery(page - 1);

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
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];

    return `${year}.${month}.${day} (${weekday})`;
  };

  console.log(data);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!data) return <div>작성한 게시물이 없습니다!</div>;

  return (
    <div>
      {data.scheduleInfoList.map(
        (schedulePost: ScheduleInfo, index: number) => {
          return (
            <div
              className="flex flex-col gap-1 rounded-md p-2 bg-white shadow max-w-screen-md mx-auto my-3"
              key={schedulePost.scheduleId + index}
            >
              <div className="flex gap-3">
                <p>{`${schedulePost.schedulePlaces[0].placeCountry}, ${schedulePost.schedulePlaces[0].placeName}`}</p>
                <p>{`${makeStartEndDateString(
                  schedulePost.scheduleStartDate,
                  schedulePost.scheduleEndDate
                )}`}</p>
              </div>
              <div>{schedulePost.scheduleTitle}</div>
              {schedulePost.scheduleDetails.map(
                (date: ScheduleDetail, index: number) => {
                  return (
                    <div
                      className="border-2 rounded-lg shadow mb-1 p-2"
                      key={date.scheduleDetailDate}
                    >
                      <div className="flex">
                        <h1 className="font-bold">{`DAY ${index + 1}`}</h1>
                        <p className="ml-3">
                          {formatDateWithWeekday(date.scheduleDetailDate)}
                        </p>
                      </div>
                      <p>{date.scheduleContent}</p>
                    </div>
                  );
                }
              )}
              <div className="flex gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <LikeBtn
                    count={schedulePost.scheduleLikeCount}
                    isLiked={schedulePost.isUserLiked} // 이 상태를 표시할 데이터가 없음
                    id={schedulePost.scheduleId}
                    type="schedules"
                  />
                  <CommentBtn count={schedulePost.scheduleCommentCount} />
                </div>
                <Link to={`/schedule/${schedulePost.scheduleId}`}>
                  모든 일정 보기
                </Link>
              </div>
            </div>
          );
        }
      )}
      <PageNation maxPage={data?.totalPages} showPage={5} />
    </div>
  );
}
