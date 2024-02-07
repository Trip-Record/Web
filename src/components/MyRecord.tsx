import { useNavigate } from "react-router-dom";
import { PostData } from "../api/dummy";
import { useModal } from "../hooks/useModal";
import LikeAndcomment from "./LikeAndCommant";

interface Props {
  myPost: PostData;
}

export default function MyRecord({ myPost }: Props) {
  const { body, id, title, userId } = myPost;

  const [showModal, switchModal] = useModal();
  const navi = useNavigate();

  const region = "대한민국, 부산";
  const signatureImg = "/logo192.png";

  return (
    <section className="flex flex-row w-4/5 h-60 bg-white shadow border-b last:border-b-white p-2 pb-5 ml-36">
      <div className="flex flex-col flex-1 gap-1">
        <div onClick={() => navi(`/record/${id}`)} className="cursor-pointer">
          <h2 className="font-bold">{region}</h2>
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
}
