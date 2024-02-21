import { switchModalFnType } from "../hooks/useModal";
import ModalButton from "./Modal";
import CommentModal from "./comment/CommentModal";
import CommentBtn from "./post/CommentBtn";
import LikeBtn from "./post/LikeBtn";

interface Props {
  postId: number;
  isOpenModal: boolean;
  setModal: switchModalFnType;
}
export default function LikeAndcomment({
  postId,
  isOpenModal,
  setModal,
}: Props) {
  // TODO: CommentBtn에 개수 전달 필요
  return (
    <div className="flex items-center mt-auto gap-3">
      <LikeBtn count={1} />
      <ModalButton
        button={<CommentBtn count={0} />}
        modal={<CommentModal postId={postId} />}
        isOpenModal={isOpenModal}
        setModal={setModal}
      />
    </div>
  );
}
