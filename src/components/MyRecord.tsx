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
import PostCard from "./PostCard";
import { Record } from "../api/records";

interface Place {
  placeId: number;
  countryName: string;
  placeName: string;
}

interface ResponseImage {
  recordImageId: number;
  recordImageUrl: string;
}

export type MyRecord = Omit<Record, "recordUserProfile">;

export interface RecordData {
  totalPages: number;
  pageNumber: string;
  recordInfoList: MyRecord[];
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
        <PostCard record={record} key={record.recordId} />
      ))}
      <PageNation maxPage={data?.totalPages} showPage={5} />
    </div>
  );
}
