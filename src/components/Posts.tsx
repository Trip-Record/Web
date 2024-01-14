import { useSearchParams } from "react-router-dom";
import { useAddCommentsMutation, useGetPostsQuery } from "../api/dummy";
import PostCard from "./PostCard";
import PageNation from "./ui/PageNation";
import { useEffect } from "react";

export default function Posts() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const { data, isLoading, isFetching, refetch } = useGetPostsQuery(page);

  // TODO: 백엔드 Api 완성후 캐시 데이터 사용해보기
  useEffect(() => {
    refetch();
  }, [page, refetch]);
  // 임시로 배열로 만들어서 작업 중... 백엔드 API완성 후 삭제예정
  const posts = [data, data, data, data];

  if (isLoading || isFetching) return <>loading...</>;

  return (
    <main className="flex flex-col items-center justify-center w-full bg-white px-10">
      {posts.map(
        (post, i) => post && <PostCard post={post} key={post.id + i} />
      )}
      <PageNation maxPage={12} showPage={5} />
    </main>
  );
}
