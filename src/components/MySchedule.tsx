import React, { useState, useEffect } from "react";
import axios from "axios";
import LikeBtn from "./post/LikeBtn";
import CommentBtn from "./post/CommentBtn";
import { Link } from "react-router-dom";
import { UserProfile } from "../hooks/useUser";
import { HOST } from "../constants";
import { getLoginToken } from "../services/storage";
import PageNation from "./ui/PageNation";

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
  scheduleLikeCount: number;
  scheduleCommentCount: number;
}

interface ScheduleData {
  totalPages: number;
  pageNumber: number;
  scheduleInfoList: ScheduleInfo[];
}

export default function MySchedule() {
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getLoginToken();
        const response = await axios.get(
          HOST + `/users/schedules?page=${scheduleData?.pageNumber}`,
          {
            headers: {
              method: "GET",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setScheduleData(response.data);
      } catch (error) {
        console.error("Error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!scheduleData) return null;

  return (
    <div>
      {scheduleData.scheduleInfoList.map(
        (schedulePost: ScheduleInfo, index: number) => {
          return (
            <div
              className="flex flex-col gap-1 rounded-md p-2 bg-white shadow w-2/5 mx-auto my-3"
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
                  <LikeBtn count={schedulePost.scheduleLikeCount} />
                  {/* <CommentBtn count={schedulePost.scheduleCommentCount} /> */}
                </div>
                <Link to={`/schedule/${schedulePost.scheduleId}`}>
                  모든 일정 보기
                </Link>
              </div>
            </div>
          );
        }
      )}
      <PageNation maxPage={scheduleData.totalPages} showPage={5} />
    </div>
  );
}
