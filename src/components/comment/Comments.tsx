import CommentLine from "../comment/CommentLine";
import ColorButton from "../ui/ColorButton";
import { useRef } from "react";
import { useInput } from "../../hooks/useInput";
import Avatar from "../ui/Avatar";
import { useUser } from "../../hooks/useUser";
import {
  useAddCommentsMutation,
  useGetComments2Query,
} from "../../api/comment";
import PageNation from "../ui/PageNation";
import { useSearchParams } from "react-router-dom";
import { useCurrentPage } from "../../hooks/useCurrentPage";
import CommentInput from "./CommentInput";

interface Props {
  postId: number;
  commentCount: number;
}
export default function Comments({ postId, commentCount }: Props) {
  const { user } = useUser();
  const page = useCurrentPage();
  const { data } = useGetComments2Query({
    recordId: postId,
    page,
  });
  const commentValidate = (value: string) => {
    if (value.length === 0) return false;
  };

  const addCommentSubmit = async (value: string) => {
    commentRef.current?.scrollTo(0, 0);
    if (!user) return;
    setComment({ content: value, user: user.userProfile, recordId: postId });
  };

  const [setComment, { isLoading }] = useAddCommentsMutation();

  const commentRef = useRef<HTMLDivElement>(null);

  if (!data) return <>Loading...</>;
  const comments = data.recordComments;

  return (
    <>
      <div className="flex justify-start items-center relative mt-10">
        <span className="text-2xl font-bold">댓글 {commentCount}개</span>
      </div>
      {/*  */}
      <CommentInput
        addCommentSubmit={addCommentSubmit}
        commentValidate={commentValidate}
        userProfileImage={user?.userProfile.userProfileImg}
      />
      <div className="overflow-y-scroll mt-2 scrollbar-hide" ref={commentRef}>
        {comments?.map((comment, index) => (
          <CommentLine
            comment={comment}
            key={comment.commentCreatedTime + comment.commentContent + index}
          />
        ))}
      </div>
      <PageNation maxPage={Math.ceil(commentCount / 4)} showPage={4} />
    </>
  );
}
