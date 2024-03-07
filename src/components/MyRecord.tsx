import React, { useState, useEffect } from "react";
import { getLoginToken } from "../services/storage";
import { HOST } from "../constants";
import { useModal } from "../hooks/useModal";
import LikeAndcomment from "./LikeAndCommant";
import axios from "axios";
import CommentBtn from "./post/CommentBtn";
import LikeBtn from "./post/LikeBtn";
import PageNation from "./ui/PageNation";
import { useGetMyRecordsQuery } from "../api/record";
import { Link, useSearchParams } from "react-router-dom";

interface Place {
  placeId: number;
  countryName: string;
  placeName: string;
}

interface ResponseImage {
  recordImageId: number;
  recordImageUrl: string;
}

interface Record {
  recordPlaces: Place[];
  recordId: number;
  recordTitle: string;
  recordContent: string;
  tripStartDate: string;
  tripEndDate: string;
  recordImages: ResponseImage[];
  isUserLiked: boolean;
  likeCount: number;
  commentCount: number;
}

export interface RecordData {
  totalPages: number;
  pageNumber: string;
  recordInfoList: Record[];
}

export default function MyRecord() {
  const [showModal, switchModal] = useModal();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 0);
  const { data } = useGetMyRecordsQuery(page - 1);

  if (!data)
    return (
      <div className="max-w-screen-md mx-auto">작성한 게시물이 없습니다!</div>
    );

  return (
    <div className="max-w-screen-md mx-auto">
      {data.recordInfoList.map((record) => (
        <section
          key={record.recordId}
          className="flex flex-row w-full h-60 bg-white border-b last:border-b-white p-2 pb-5 cursor-pointer"
          onClick={() => `${record.recordId}`}
        >
          <div className="flex flex-col flex-1 gap-1">
            <h2 className="text-gray-400 text-ellipsis text-sm">
              {record.recordPlaces[0].countryName},{" "}
              {record.recordPlaces[0].placeName}
            </h2>
            <h2 className="font-bold line-clamp-1">{record.recordTitle}</h2>
            <div className="line-clamp-4">{record.recordContent}</div>
            <div className="mt-auto flex items-center gap-2">
              <LikeBtn
                count={record.likeCount}
                isLiked={record.isUserLiked}
                id={record.recordId}
              />
              <CommentBtn count={record.commentCount} />
            </div>
          </div>
          {record.recordImages.length > 0 && (
            <img
              src={record.recordImages[0].recordImageUrl}
              className="w-24 md:w-56 object-contain"
              alt="signature"
            />
          )}
        </section>
      ))}
      <PageNation maxPage={data?.totalPages} showPage={5} />
    </div>
  );
}
