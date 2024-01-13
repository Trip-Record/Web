import { CommentData } from "../../api/dummy";
import { useInput } from "../../hooks/useInput";
import ColorButton from "../ui/ColorButton";

interface Props {
  comments: CommentData[];
}
const commentValidate = (value: string) => {
  if (value.length >= 5) return false;
};
const addCommentSubmit = (value: string) => {
  console.log(value, "전송됨,..");
};

export default function CommentModal({ comments }: Props) {
  const { onchange, error, handleSubmit } = useInput({
    init: "",
    submitCallback: addCommentSubmit,
    validateCallback: commentValidate,
  });

  return (
    <section className="w-[90vw] max-w-[50rem] h-[50vh] flex flex-col p-2 border">
      <h2 className="border-b text-2xl font-bold p-2 text-center">
        댓글 {comments.length}
      </h2>
      <div className="overflow-y-scroll">
        {comments.map(({ id, body }) => (
          <div key={id} className="p-2 border-b last:border-none">
            {body}
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center p-1 gap-2"
      >
        <input
          type="text"
          onChange={onchange}
          placeholder="댓글을 추가하세요"
          className={`w-full p-1 border-b outline-none ${
            error && "border-red-400"
          }`}
        />

        <ColorButton text="게시" className="w-14" />
      </form>
    </section>
  );
}
