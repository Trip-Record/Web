import { useNavigate } from "react-router-dom";
import { PostData } from "../api/dummy";
import { useModal } from "../hooks/useModal";
import ModalButton from "./Modal";
import CommentModal from "./comment/CommentModal";
import CommentBtn from "./post/CommentBtn";
import LikeBtn from "./post/LikeBtn";
import AvatarInfo from "./ui/AvatarInfo";
import { Record } from "../api/records";

interface Props {
  record: Record;
  type?: "blog" | "instagram";
}
export default function PostCard({ record, type = "blog" }: Props) {
  const {
    recordUserProfile,
    recordId,
    recordTitle,
    recordContent,
    likeCount,
    isUserLiked,
    commentCount,
  } = record;

  const [showModal, switchModal] = useModal();
  const navi = useNavigate();

  const region = "대한민국, 부산";
  const signatureImg = "/logo192.png";

  console.log(recordUserProfile);

  if (type === "blog") {
    return (
      //TODO: 인스타형 포스트 onclick 적용
      <section className="flex flex-row w-full h-60 bg-white border-b last:border-b-white p-2 pb-5">
        <div className="flex flex-col flex-1 gap-1">
          <AvatarInfo userProfile={recordUserProfile} />
          <div
            onClick={() => navi(`/record/${recordId}`)}
            className="cursor-pointer"
          >
            <h2 className="text-gray-400 text-ellipsis text-sm">{region}</h2>
            <h2 className="font-bold line-clamp-1">{recordTitle}</h2>
            <div className="line-clamp-4">{recordContent}</div>
          </div>
          <div className="mt-auto flex items-center gap-2">
            <LikeBtn count={likeCount} isLiked={isUserLiked} id={recordId} />
            <CommentBtn count={record.commentCount} />
          </div>
        </div>
        <img
          src={signatureImg}
          className="w-24 md:w-56 object-contain"
          alt="signature"
        ></img>
      </section>
    );
  } else {
    return (
      <section className="flex flex-col w-full items-center max-w-lg bg-white p-5 border-b gap-2">
        <AvatarInfo userProfile={recordUserProfile} />
        <h2 className="text-gray-400 text-ellipsis text-sm w-full">{region}</h2>
        <div
          onClick={() => navi(`/record/${recordId}`)}
          className="w-full flex flex-col gap-2 justify-center items-center cursor-pointer"
        >
          <img
            src="/logo192.png"
            alt="travel_image"
            className="w-[80%] h-60 object-contain shadow-md rounded-md"
          />
          <div className="font-bold line-clamp-1">{recordTitle}</div>
          <div className="line-clamp-4">{recordContent}</div>
        </div>
        <div className="flex items-center w-full mt-4 gap-3">
          <LikeBtn count={1} id={recordId} />
          <ModalButton
            button={<CommentBtn count={commentCount} />}
            modal={<CommentModal postId={recordId} />}
            isOpenModal={showModal}
            setModal={switchModal}
          />
        </div>
      </section>
    );
  }
}
