import { useEffect, useState } from "react";
import { CommentData, useEditCommentMutation } from "../../api/comment";
import { useInput } from "../../hooks/useInput";
import AvatarInfo from "../ui/AvatarInfo";
import ColorButton from "../ui/ColorButton";
import { commentValidation } from "../../validations/comment";
import EditComment from "./EditComment";
import EditCommentButton from "./EditCommentButton";

interface Props {
  comment: CommentData;
  refetch?: () => void;
}
export default function CommentLine({ comment, refetch }: Props) {
  const {
    commentContent,
    commentCreatedTime,
    userProfile,
    commentId,
    isUserCreated,
  } = comment;
  const [isEditComment, setIsEditComment] = useState(false);
  const { value, onchange, handleSubmit } = useInput({
    init: commentContent,
    submitCallback(value) {
      editComment({ commentContent: value, commentId });
    },
    validateCallback: commentValidation.content,
  });
  const [editComment, { isSuccess }] = useEditCommentMutation();

  useEffect(() => {
    if (isSuccess) {
      refetch && refetch();
    }
  }, [isSuccess, refetch]);

  return (
    <div className="flex flex-col py-2 border-b last:border-none gap-1">
      <div className="flex items-center justify-between gap-2">
        <AvatarInfo userProfile={userProfile} />
        {isUserCreated && (
          <>
            <EditCommentButton
              onClick={() => setIsEditComment((prev) => !prev)}
            />
            <button className="w-10 text-nowrap" onClick={() => {}}>
              삭제
            </button>
          </>
        )}
      </div>
      <div>
        {isEditComment ? (
          <EditComment
            handleSubmit={handleSubmit}
            onchange={onchange}
            value={value}
          />
        ) : (
          commentContent
        )}
      </div>
      <div className="text-gray-400 text-sm">{commentCreatedTime}</div>
    </div>
  );
}
