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
  const { onchange, error, handleSubmit, value } = useInput({
    init: "",
    submitCallback: addCommentSubmit,
    validateCallback: commentValidate,
  });

  const [setComment, { isLoading }] = useAddCommentsMutation();

  const commentRef = useRef<HTMLDivElement>(null);

  if (!data) return <>Loading...</>;
  const comments = data.recordComments;

  return (
    <>
      <div className="flex justify-start items-center relative mt-10">
        <span className="text-2xl font-bold">댓글 {commentCount}개</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center gap-2 mt-auto"
      >
        <Avatar img={user?.userProfile.userProfileImg || ""} size="s" />
        <input
          type="text"
          value={value}
          onChange={onchange}
          placeholder="댓글을 추가하세요"
          className={`w-full p-1 border-b outline-none ${
            error && "border-red-400"
          }`}
        />

        <ColorButton text="게시" className="w-14" />
      </form>
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
