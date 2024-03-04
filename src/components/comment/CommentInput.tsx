import { useInput } from "../../hooks/useInput";
import { commentValidation } from "../../validations/comment";
import Avatar from "../ui/Avatar";
import ColorButton from "../ui/ColorButton";

interface Props {
  addCommentSubmit: (inputValue: string) => void;
  userProfileImage?: string;
}

export default function CommentInput({
  addCommentSubmit,
  userProfileImage,
}: Props) {
  const { onchange, error, handleSubmit, value } = useInput({
    init: "",
    submitCallback: addCommentSubmit,
    validateCallback: commentValidation.content,
  });
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center gap-2 mt-auto"
    >
      <Avatar img={userProfileImage || ""} size="s" />
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
  );
}
