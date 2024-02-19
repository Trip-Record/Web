import { useEffect, useRef } from "react";
import { useGetPostsQuery } from "../../api/dummy";
import PostCard from "../PostCard";
import { CardType } from "../Posts";
import SkeletonPostCard from "../ui/skeleton/SkeletonPostcard";
import { useGetRecordsQuery } from "../../api/record";

interface Props {
  cardType: CardType;
  page: number;
}

export default function PostList({ cardType, page }: Props) {
  const { data, isLoading, isFetching, refetch, isError } =
    useGetPostsQuery(page);

  const { data: records } = useGetRecordsQuery({ page: 0, size: 5 });
  console.log(records);

  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  // TODO: 백엔드 Api 완성후 캐시 데이터 사용해보기
  useEffect(() => {
    refetch();
    window.scrollTo({
      top: 0, // 스크롤을 맨 위로 이동
      // behavior: "smooth", // 부드러운 스크롤 이동
    });
  }, [page, refetch]);

  // 임시로 배열로 만들어서 작업 중... 백엔드 API완성 후 삭제예정
  const posts = [data, data, data, data];

  if (isFetching || !records)
    return (
      <div ref={ref2}>
        {posts.map(() => (
          <SkeletonPostCard type="blog" />
        ))}
      </div>
    );

  const { recordList } = records;

  return (
    // <div ref={ref}>
    <>
      {recordList.map((record, i) =>
        record ? (
          <PostCard
            record={record}
            key={record.recordId + i + record.recordTitle}
            type={cardType}
          />
        ) : (
          <SkeletonPostCard key={i} type={cardType} />
        )
      )}
    </>
    // </div>
  );
}
