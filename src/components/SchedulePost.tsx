import { Link } from "react-router-dom";
import { SchedulePostData } from "../api/dummy";
import AvatarInfo from "./ui/AvatarInfo";
import LikeBtn from "./post/LikeBtn";
import CommentBtn from "./post/CommentBtn";
import CommentModal from "./comment/CommentModal";
import { useModal } from "../hooks/useModal";
import ModalButton from "./Modal";

interface Props {
  schedulePost: SchedulePostData;
}

export default function SchedulePost({ schedulePost }: Props) {
  //TODO: 추후 데이터 추가
  const { id, title, userId } = schedulePost;
  const region = "대한민국, 부산";
  const signatureImg = "/logo192.png";
  const date = "2024.03.08 ~ 2024.03.10";
  const [showModal, switchModal] = useModal();

  return (
    <div className="flex flex-col gap-1 rounded-md p-2 bg-white shadow w-2/5 mx-auto my-3">
      <AvatarInfo userId={userId} />
      <div className="flex gap-3">
        <p>{region}</p>
        <p>{date}</p>
      </div>
      <div>{title}</div>
      <div>
        <div className="border-2 rounded-lg shadow mb-1 p-2">
          <h1 className="font-bold">DAY1</h1>
          <p>
            의무교육은 무상으로 한다. 모든 국민은 사생활의 비밀과 자유를
            침해받지 아니한다. 대통령이 궐위되거나 사고로 인하여 직무를 수행할
            수 없을 때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을
            대행한다. 각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은
            법률로 정한다.
          </p>
        </div>
        <div className="border-2 rounded-lg shadow p-2">
          <h1 className="font-bold">DAY2</h1>
          <p>
            의무교육은 무상으로 한다. 모든 국민은 사생활의 비밀과 자유를
            침해받지 아니한다. 대통령이 궐위되거나 사고로 인하여 직무를 수행할
            수 없을 때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을
            대행한다. 각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은
            법률로 정한다.
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex  gap-2">
          <LikeBtn count={1} />
          <ModalButton
            button={<CommentBtn postId={id} />}
            modal={<CommentModal postId={id} />}
            isOpenModal={showModal}
            setModal={switchModal}
          />
        </div>
        <Link to={"/"}>모든 일정 보기</Link>
      </div>
    </div>
  );
}
