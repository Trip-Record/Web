import { useSearchParams } from "react-router-dom";
import Avatar from "../ui/Avatar";
import LikeAndcomment from "../LikeAndCommant";
import { useModal } from "../../hooks/useModal";

interface Props {
  postId: number;
}

export default function PostDetail({ postId }: Props) {
  const title =
    "타이틀타이틀타이틀타이틀타이틀타이틀타이틀타이틀타이틀타이틀타이틀타이틀";
  const body =
    "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용";

  const { showModal, switchModal } = useModal();

  return (
    <main className="w-full flex flex-col">
      <h2>{title}</h2>
      <div className="flex items-center">
        <Avatar img="/logo192.png" size="s" />
        <span>이름</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex">
          <span>대한민국, 부산</span>
          <span>2023.10.22-2023.10.24</span>
        </div>
        <div className="flex items-center">
          <span>수정</span>
          <span>삭제</span>
        </div>
      </div>
      {/* 포스트 내용 */}
      <section className="flex flex-col items-center justify-center">
        {/* TODO: 슬라이드 */}
        <img src="/logo192.png" alt="포스트 이미지" />
        <div>{body}</div>
      </section>
      <LikeAndcomment
        postId={postId}
        showModal={showModal}
        switchModal={switchModal}
      />
    </main>
  );
}
