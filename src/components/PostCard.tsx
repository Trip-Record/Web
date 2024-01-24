import { useNavigate } from "react-router-dom";
import { PostData, useGetCommentsQuery } from "../api/dummy";
import { useModal } from "../hooks/useModal";
import LikeAndcomment from "./LikeAndCommant";
import ModalButton from "./Modal";
import CommentModal from "./comment/CommentModal";
import CommentBtn from "./post/CommentBtn";
import LikeBtn from "./post/LikeBtn";
import Avatar from "./ui/Avatar";
import TravelStyle from "./ui/TravelStyle";
import AvatarInfo from "./ui/AvatarInfo";

interface Props {
  post: PostData;
  type?: "blog" | "instagram";
}
export default function PostCard({ post, type = "blog" }: Props) {
  const { body, id, title, userId } = post;

  const [showModal, switchModal] = useModal();
  const navi = useNavigate();

  const region = "대한민국, 부산";
  const signatureImg = "/logo192.png";
  if (type === "blog") {
    return (
      //TODO: 인스타형 포스트 onclick 적용
      <section className="flex flex-row w-full h-60 bg-white border-b last:border-b-white p-2 pb-5">
        <div className="flex flex-col flex-1 gap-1">
          <AvatarInfo userId={userId} />
          <div onClick={() => navi(`/record/${id}`)} className="cursor-pointer">
            <h2 className="text-gray-400 text-ellipsis text-sm">{region}</h2>
            <h2 className="font-bold line-clamp-1">{title}</h2>
            <div className="line-clamp-4">{body}</div>
          </div>
          <LikeAndcomment
            postId={id}
            isOpenModal={showModal}
            setModal={switchModal}
          />
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
      <section className="flex flex-col w-full items-center max-w-lg bg-white border shadow-sm rounded-md p-2">
        <AvatarInfo userId={userId} />
        <h2 className="text-gray-400 text-ellipsis text-sm w-full">{region}</h2>
        <div
          onClick={() => navi(`/record/${id}`)}
          className="flex flex-col justify-center items-center cursor-pointer"
        >
          <img
            src="/logo192.png"
            alt="travel_image"
            className="w-[80%] h-60 object-contain"
          />
          <div className="font-bold line-clamp-1">{title}</div>
          <div className="line-clamp-4">{body}</div>
        </div>
        <div className="flex items-center w-full mt-4 gap-3">
          <LikeBtn count={1} />
          <ModalButton
            button={<CommentBtn postId={id} />}
            modal={<CommentModal postId={id} />}
            isOpenModal={showModal}
            setModal={switchModal}
          />
        </div>
      </section>
    );
  }
}
