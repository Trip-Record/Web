import { useGetPostQuery } from "../api/dummy";
import { useGetRecordQuery } from "../api/record";
import { PostTypes } from "../hooks/useLike";
import { switchModalFnType } from "../hooks/useModal";
import ModalButton from "./Modal";
import CommentModal from "./comment/CommentModal";
import CommentBtn from "./post/CommentBtn";
import LikeBtn from "./post/LikeBtn";

interface Props {
  postId: number;
  isOpenModal: boolean;
  setModal: switchModalFnType;
  likeType: PostTypes;
}
export default function LikeAndcomment({
  postId,
  isOpenModal,
  setModal,
  likeType,
}: Props) {
  // TODO: CommentBtn에 개수 전달 필요

  const { data } = useGetRecordQuery(postId);

  if (!data) return <></>;

  const { likeCount, isUserLiked } = data;

  return (
    <div className="flex items-center mt-auto gap-3">
      <LikeBtn
        count={likeCount}
        id={postId}
        isLiked={isUserLiked}
        type={likeType}
      />
      <ModalButton
        button={<CommentBtn count={0} />}
        modal={<CommentModal postId={postId} />}
        isOpenModal={isOpenModal}
        setModal={setModal}
      />
    </div>
  );
}
