import { useEffect, useState } from "react";
import {
  CommentData,
  useDeleteCommentMutation,
  useEditCommentMutation,
} from "../../api/comment";
import { useInput } from "../../hooks/useInput";
import AvatarInfo from "../ui/AvatarInfo";
import ColorButton from "../ui/ColorButton";
import { commentValidation } from "../../validations/comment";
import EditComment from "./EditComment";
import EditCommentButton from "./EditCommentButton";

interface Props {
  comment: CommentData;
  refetch?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}
export default function CommentLine({ comment, refetch, onDelete }: Props) {
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
  const [editComment, { isSuccess: editSuccess }] = useEditCommentMutation();
  const [deleteComment, { isSuccess: deleteSuccess }] =
    useDeleteCommentMutation();
  // TODO: 리팩토링
  useEffect(() => {
    if (editSuccess) {
      refetch && refetch();
    }
  }, [editSuccess, refetch]);

  useEffect(() => {
    if (deleteSuccess) {
      onDelete && onDelete();
      refetch && refetch();
    }
  }, [deleteSuccess, refetch, onDelete]);

  return (
    <div className="flex flex-col py-2 border-b last:border-none gap-1">
      <div className="flex items-center justify-between gap-2">
        <AvatarInfo userProfile={userProfile} />
        {isUserCreated && (
          <>
            <EditCommentButton
              onClick={() => setIsEditComment((prev) => !prev)}
            />
            <button
              className="w-10 text-nowrap"
              onClick={() => {
                deleteComment({ commentId: comment.commentId });
              }}
            >
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
