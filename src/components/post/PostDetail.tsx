import { useSearchParams } from "react-router-dom";
import Avatar from "../ui/Avatar";
import LikeAndcomment from "../LikeAndCommant";
import { useModal } from "../../hooks/useModal";
import TravelStyle from "../ui/TravelStyle";
import Slider from "../ui/Slider";
import { useGetCommentsQuery, useGetPostQuery } from "../../api/dummy";
import DeleteIcon from "../ui/icons/DeleteIcon";
import ModifyIcon from "../ui/icons/ModifyIcon";

interface Props {
  postId: number;
}

export default function PostDetail({ postId }: Props) {
  const [isOpenModal, setModal] = useModal();
  const { data, isLoading } = useGetPostQuery(postId);
  const images = ["/logo192.png", "/naverLogin.png", "/profile-icons/Cat.png"];

  if (!data) return <>loading...</>;
  const { body, title } = data;

  return (
    <main className="w-full max-w-lg flex flex-col gap-2">
      <h2 className="font-semibold">{title}</h2>
      <div className="flex items-center gap-1">
        <Avatar img="/logo192.png" size="s" />
        <span>이름</span>
        <TravelStyle selectStyle="눈으로 담기형" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 text-gray-500 flex-col md:flex-row">
          <span>대한민국, 부산</span>
          <span>2023.10.22-2023.10.24</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="flex items-center">
            <ModifyIcon size={16} /> 수정
          </button>
          <button className="flex items-center">
            <DeleteIcon size={18} /> 삭제
          </button>
        </div>
      </div>
      {/* 포스트 내용 */}
      <section className="flex flex-col items-center justify-center">
        {/* TODO: 슬라이드 */}
        {/* <img src="/logo192.png" alt="포스트 이미지" /> */}
        <Slider images={images} />
        <div>{body}</div>
      </section>
      <LikeAndcomment
        postId={postId}
        isOpenModal={isOpenModal}
        setModal={setModal}
      />
    </main>
  );
}
