import { useNavigate } from "react-router-dom";
import { PostData } from "../api/dummy";
import { useModal } from "../hooks/useModal";
import ModalButton from "./Modal";
import CommentModal from "./comment/CommentModal";
import CommentBtn from "./post/CommentBtn";
import LikeBtn from "./post/LikeBtn";
import AvatarInfo from "./ui/AvatarInfo";
import { Record } from "../api/records";
import { formatPlace } from "../utils/dataFormat";
import { MyRecord } from "./MyRecord";

interface Props {
  record: Record | MyRecord;
  type?: "blog" | "instagram";
}

function isRecord(record: Record | MyRecord): record is Record {
  return (record as Record).recordUserProfile !== undefined;
}
export default function PostCard({ record, type = "blog" }: Props) {
  // if(typeof record === MyRecord){}
  const {
    recordId,
    recordTitle,
    recordContent,
    likeCount,
    isUserLiked,
    commentCount,
    recordImages,
    recordPlaces,
  } = record;

  const [showModal, switchModal] = useModal();
  const navi = useNavigate();

  const region = formatPlace(recordPlaces);
  const signatureImg = "/logo192.png";

  const recordUserProfile = isRecord(record)
    ? record.recordUserProfile
    : undefined;

  if (type === "blog") {
    return (
      //TODO: 인스타형 포스트 onclick 적용
      <section className="flex flex-row w-full h-60 bg-white border-b last:border-b-white p-2 pb-5">
        <div className="flex flex-col flex-1 gap-1">
          {recordUserProfile && <AvatarInfo userProfile={recordUserProfile} />}
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
        {recordImages[0]?.recordImageUrl && (
          <img
            src={recordImages[0]?.recordImageUrl}
            className="w-24 md:w-56 object-cover rounded-md shadow-md"
            alt="travel_sinature"
          ></img>
        )}
      </section>
    );
  } else {
    return (
      <section className="flex flex-col w-full items-center max-w-lg bg-white p-5 border-b gap-2">
        {recordUserProfile && <AvatarInfo userProfile={recordUserProfile} />}
        <h2 className="text-gray-400 text-ellipsis text-sm w-full">{region}</h2>
        <div
          onClick={() => navi(`/record/${recordId}`)}
          className="w-full flex flex-col gap-2 justify-center items-center cursor-pointer"
        >
          {recordImages[0]?.recordImageUrl && (
            <img
              src={recordImages[0]?.recordImageUrl}
              alt="travel_sinature"
              className="w-[80%] h-60 object-cover shadow-md rounded-md"
            />
          )}
          <div className="font-bold line-clamp-1">{recordTitle}</div>
          <div className="line-clamp-4">{recordContent}</div>
        </div>
        <div className="flex items-center w-full mt-4 gap-3">
          <LikeBtn count={likeCount} id={recordId} isLiked={isUserLiked} />
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
