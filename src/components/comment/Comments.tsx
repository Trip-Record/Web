import { useAddCommentsMutation, useGetCommentsQuery } from "../../api/dummy";
import CommentLine from "../comment/CommentLine";
import ColorButton from "../ui/ColorButton";
import { useRef } from "react";
import { useInput } from "../../hooks/useInput";
import Avatar from "../ui/Avatar";
import { useGetComments2Query } from "../../api/record";
import { useUser } from "../../hooks/useUser";

interface Props {
  postId: number;
}
export default function Comments({ postId }: Props) {
  // const { data: comments } = useGetCommentsQuery(postId);
  const { user } = useUser();
  const { data } = useGetComments2Query({
    recordId: postId,
    page: 0,
  });

  // const [updatePost, result] = useAddCommentsMutation();
  const commentRef = useRef<HTMLDivElement>(null);
  const commentValidate = (value: string) => {
    if (value.length === 0) return false;
  };

  const addCommentSubmit = async (value: string) => {
    // updatePost({
    //   id: 1,
    //   body: value,
    //   email: "testemail",
    //   name: "testname",
    //   postId,
    // });

    commentRef.current?.scrollTo(0, 0);

    console.log(value, "전송됨,..");
  };
  const { onchange, error, handleSubmit, value } = useInput({
    init: "",
    submitCallback: addCommentSubmit,
    validateCallback: commentValidate,
  });

  if (!data) return <>Loading...</>;
  const comments = data.recordComments;

  return (
    <>
      <div className="flex justify-start items-center relative mt-10">
        <span className="text-2xl font-bold">댓글 {comments?.length}개</span>
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
        {comments?.map((comment) => (
          <CommentLine comment={comment} key={comment.commentContent} />
        ))}
      </div>
    </>
  );
}
