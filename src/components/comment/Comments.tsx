import CommentLine from "../comment/CommentLine";
import ColorButton from "../ui/ColorButton";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInput } from "../../hooks/useInput";
import Avatar from "../ui/Avatar";
import { useUser } from "../../hooks/useUser";
import {
  ResponseRecordComments,
  ResponseScheduleComments,
  useAddCommentsMutation,
  useGetComments2Query,
} from "../../api/comment";
import PageNation from "../ui/PageNation";
import { useNavigate } from "react-router-dom";
import { useCurrentPage } from "../../hooks/useCurrentPage";
import CommentInput from "./CommentInput";
import CommentHeader from "./CommentHeader";
import { PostTypes } from "../../hooks/useLike";

interface Props {
  postId: number;
  commentCount: number;
  type: PostTypes;
}

function instanceOfRecord(object: any): object is ResponseRecordComments {
  return "recordComments" in object;
}

function instanceOfSchedule(object: any): object is ResponseScheduleComments {
  return "scheduleComments" in object;
}

export default function Comments({ postId, commentCount, type }: Props) {
  const { user } = useUser();
  const page = useCurrentPage();
  const navigate = useNavigate();
  const { data, refetch } = useGetComments2Query({
    recordId: postId,
    page,
    type,
  });
  const [setComment, { isLoading, isSuccess }] = useAddCommentsMutation();
  const commentRef = useRef<HTMLDivElement>(null);

  const addCommentSubmit = async (value: string) => {
    commentRef.current?.scrollTo(0, 0);
    if (!user) return;
    setComment({
      content: value,
      user: user.userProfile,
      recordId: postId,
      type,
    });
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
    if (instanceOfRecord(data) && data?.recordComments.length === 1)
      navigate("?page=" + page);
    else if (instanceOfSchedule(data) && data?.scheduleComments.length === 1) {
      navigate("?page=" + page);
    }
  }, [data, navigate, page]);

  if (!data) return <>Loading...</>;
  const comments = instanceOfRecord(data)
    ? data.recordComments
    : data.scheduleComments;
  return (
    <>
      <CommentHeader count={comments?.length || commentCount} />
      <div className="overflow-y-scroll mt-2 scrollbar-hide" ref={commentRef}>
        {comments?.map((comment, index) => (
          <CommentLine
            comment={comment}
            key={comment.commentCreatedTime + comment.commentContent + index}
            refetch={refetch}
            onDelete={onDelete}
            type={type}
          />
        ))}
      </div>
      <PageNation maxPage={data.totalPages} showPage={4} />
      <CommentInput addCommentSubmit={addCommentSubmit} />
    </>
  );
}
