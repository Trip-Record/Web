import { switchModalFnType } from "../hooks/useModal";
import ModalButton from "./Modal";
import CommentModal from "./comment/CommentModal";
import CommentBtn from "./post/CommentBtn";
import LikeBtn from "./post/LikeBtn";

interface Props {
  postId: number;
  showModal: boolean;
  switchModal: switchModalFnType;
}
export default function LikeAndcomment({
  postId,
  showModal,
  switchModal,
}: Props) {
  return (
    <div className="flex items-center mt-auto gap-3">
      <LikeBtn count={1} />
      <ModalButton
        button={<CommentBtn postId={postId} />}
        modal={<CommentModal postId={postId} />}
        showModal={showModal}
        switchModal={switchModal}
      />
    </div>
  );
}
