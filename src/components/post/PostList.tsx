import { useEffect, useRef } from "react";
import { useGetPostsQuery } from "../../api/dummy";
import PostCard from "../PostCard";
import { CardType } from "../Posts";
import SkeletonPostCard from "../ui/skeleton/SkeletonPostcard";
import { Record, useGetRecordsQuery } from "../../api/record";

interface Props {
  cardType: CardType;
  showCount: number;
  recordList: Record[];
}

export default function PostList({ cardType, showCount, recordList }: Props) {
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
