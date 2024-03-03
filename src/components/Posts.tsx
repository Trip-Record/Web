import { Link, useSearchParams } from "react-router-dom";
import PostCard from "./PostCard";
import PageNation from "./ui/PageNation";
import { useEffect, useState } from "react";
import BlogIcon from "./ui/icons/BlogIcon";
import CardIcon from "./ui/icons/CardIcon";
import PostList from "./post/PostList";
import { useGetRecordsQuery } from "../api/records";
import SkeletonPostCard from "./ui/skeleton/SkeletonPostcard";
import { useRecordList } from "../hooks/useRecordList";
import NotFound from "./ui/NotFound";
import { transformPageQuery } from "../utils/transformPageQuery";

export type CardType = "blog" | "instagram";

export default function Posts() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 0);

  const showPageCount = 5;
  const { cardType, records, setCardType } = useRecordList(
    transformPageQuery(page),
    showPageCount
  );

  if (!records)
    return (
      <div className="max-w-screen-md mx-auto">
        {Array(showPageCount)
          .fill(0)
          .map((_, i) => (
            <SkeletonPostCard type="blog" key={i} />
          ))}
      </div>
    );

  if (records?.recordList.length === 0)
    return (
      <div className="pt-10">
        <NotFound />
      </div>
    );
  return (
    <main className="flex flex-col items-center justify-center w-full bg-white px-10 py-5 gap-5">
      <div className="flex flex-col items-center w-full max-w-screen-md">
        <div className="ml-auto border flex items-center justify-end p-1">
          <button className="border-r p-2" onClick={() => setCardType("blog")}>
            <BlogIcon />
          </button>
          <button className="p-2" onClick={() => setCardType("instagram")}>
            <CardIcon />
          </button>
        </div>
        <PostList
          cardType={cardType}
          showCount={showPageCount}
          recordList={records.recordList}
        />
        <PageNation maxPage={records?.totalPages} showPage={showPageCount} />
      </div>
    </main>
  );
}
