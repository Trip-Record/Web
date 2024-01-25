import { useEffect } from "react";
import { useGetPostsQuery } from "../../api/dummy";
import PostCard from "../PostCard";
import { CardType } from "../Posts";
import SkeletonPostCard from "../ui/skeleton/SkeletonPostcard";

interface Props {
  cardType: CardType;
  page: number;
}

export default function PostList({ cardType, page }: Props) {
  const { data, isLoading, isFetching, refetch, isError } =
    useGetPostsQuery(page);
  // TODO: 백엔드 Api 완성후 캐시 데이터 사용해보기
  useEffect(() => {
    refetch();
  }, [page, refetch]);
  // 임시로 배열로 만들어서 작업 중... 백엔드 API완성 후 삭제예정
  const posts = [data, data, data, data];

  console.log(isLoading);

  //   if (isLoading || isFetching || isError)
  return (
    <>
      {posts.map((post, i) =>
        post ? (
          <PostCard post={post} key={post.id + i} type={cardType} />
        ) : (
          <SkeletonPostCard key={i} type={cardType} />
        )
      )}
    </>
  );
}
