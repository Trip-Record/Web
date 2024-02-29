import { useRef } from "react";
import { useInput } from "../../hooks/useInput";
import ColorButton from "../ui/ColorButton";
import CommentLine from "./CommentLine";
import {
  useAddCommentsMutation,
  useGetComments2Query,
} from "../../api/comment";

interface Props {
  postId: number;
}

export default function CommentModal({ postId }: Props) {
  const { data: comments } = useGetComments2Query({
    recordId: postId,
    page: 0,
  });
  const [updatePost, result] = useAddCommentsMutation();
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

  return (
    <section className="w-[90vw] max-w-[50rem] h-[70vh] flex flex-col p-2 border overflow-hidden rounded-md bg-white">
      {/* TODO: 중복제거 */}
      {/* <div className="border-b border-black p-2 flex justify-center items-center relative">
        <span className="text-2xl font-bold">댓글 {comments?.length}</span>
        <span className="text-sm absolute right-2 border p-1">게시글 보기</span>
      </div>
      <div
        className="overflow-y-scroll p-3 mt-2 scrollbar-hide"
        ref={commentRef}
      >
        {comments?.map((comment) => (
          <CommentLine comment={comment} key={comment.id} />
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center p-1 gap-2 mt-auto"
      >
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
      </form> */}
    </section>
  );
}
