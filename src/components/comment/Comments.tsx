import CommentLine from "../comment/CommentLine";
import ColorButton from "../ui/ColorButton";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInput } from "../../hooks/useInput";
import Avatar from "../ui/Avatar";
import { useUser } from "../../hooks/useUser";
import {
  useAddCommentsMutation,
  useGetComments2Query,
} from "../../api/comment";
import PageNation from "../ui/PageNation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCurrentPage } from "../../hooks/useCurrentPage";
import CommentInput from "./CommentInput";
import CommentHeader from "./CommentHeader";

interface Props {
  postId: number;
  commentCount: number;
}
export default function Comments({ postId, commentCount }: Props) {
  // TODO: 마지막페이지로 이동
  const { user } = useUser();
  const page = useCurrentPage();
  const navigate = useNavigate();
  const { data, refetch } = useGetComments2Query({
    recordId: postId,
    page,
  });
  const [setComment, { isLoading, isSuccess }] = useAddCommentsMutation();
  const commentRef = useRef<HTMLDivElement>(null);

  const addCommentSubmit = async (value: string) => {
    commentRef.current?.scrollTo(0, 0);
    if (!user) return;
    setComment({ content: value, user: user.userProfile, recordId: postId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch().then((data) => {
        const page = data.data?.totalPages;
        navigate("?page=" + page);
      });
    }
  }, [isSuccess, navigate, refetch]);

  // 페이지 이동후 refetch
  useEffect(() => {
    refetch();
  }, [page, refetch]);

  // 삭제 후 해당 페이지에 댓글이 없다면 -1페이지로 이동
  const onDelete = useCallback(() => {
    if (data?.recordComments.length === 1) navigate("?page=" + page);
  }, [data, navigate, page]);

  if (!data) return <>Loading...</>;
  const comments = data.recordComments;

  return (
    <>
      <CommentHeader count={commentCount} />
      <div className="overflow-y-scroll mt-2 scrollbar-hide" ref={commentRef}>
        {comments?.map((comment, index) => (
          <CommentLine
            comment={comment}
            key={comment.commentCreatedTime + comment.commentContent + index}
            refetch={refetch}
            onDelete={onDelete}
          />
        ))}
      </div>
      <PageNation maxPage={data.totalPages} showPage={4} />
      <CommentInput addCommentSubmit={addCommentSubmit} />
    </>
  );
}
