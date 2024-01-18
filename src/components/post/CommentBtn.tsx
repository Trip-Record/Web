import { useRef } from "react";
import CommentIcon from "../ui/icons/CommentIcon";
import { useGetCommentsQuery } from "../../api/dummy";

interface Props {
  postId: number;
}
export default function CommentBtn({ postId }: Props) {
  //   const ref = useRef<HTMLDialogElement>(null);
  const { data: commentData } = useGetCommentsQuery(postId);

  return (
    <>
      <div className="flex items-center gap-1 cursor-pointer">
        <CommentIcon /> {commentData?.length}
      </div>
    </>
  );
}
