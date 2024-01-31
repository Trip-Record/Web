import { useSearchParams } from "react-router-dom";
import { useAddCommentsMutation, useGetPostsQuery } from "../api/dummy";
import PostCard from "./PostCard";
import PageNation from "./ui/PageNation";
import { useEffect, useState } from "react";
import BlogIcon from "./ui/icons/BlogIcon";
import CardIcon from "./ui/icons/CardIcon";

export default function Posts() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const { data, isLoading, isFetching, refetch } = useGetPostsQuery(page);

  const [cardType, setCardType] = useState<"blog" | "instagram">("blog");

  // TODO: 백엔드 Api 완성후 캐시 데이터 사용해보기
  useEffect(() => {
    refetch();
  }, [page, refetch]);
  // 임시로 배열로 만들어서 작업 중... 백엔드 API완성 후 삭제예정
  const posts = [data, data, data, data];

  if (isLoading || isFetching) return <>loading...</>;

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
      {posts.map(
        (post, i) =>
          post && <PostCard post={post} key={post.id + i} type={cardType} />
      )}
      <PageNation maxPage={12} showPage={5} />
    </main>
  );
}
