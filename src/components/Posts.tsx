import { useSearchParams } from "react-router-dom";
import { useAddCommentsMutation, useGetPostsQuery } from "../api/dummy";
import PostCard from "./PostCard";
import PageNation from "./ui/PageNation";
import { useEffect, useState } from "react";
import BlogIcon from "./ui/icons/BlogIcon";
import CardIcon from "./ui/icons/CardIcon";
import PostList from "./post/PostList";

export type CardType = "blog" | "instagram";

export default function Posts() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const [cardType, setCardType] = useState<CardType>("blog");

  return (
    <main className="flex flex-col items-center justify-center w-full bg-white px-10 py-5 gap-5">
      <div className="ml-auto border flex items-center p-1">
        <button className="border-r p-2" onClick={() => setCardType("blog")}>
          <BlogIcon />
        </button>
        <button className="p-2" onClick={() => setCardType("instagram")}>
          <CardIcon />
        </button>
      </div>
      <PostList cardType={cardType} page={page} />
      <PageNation maxPage={12} showPage={5} />
    </main>
  );
}
