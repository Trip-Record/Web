import AvatarInfo from "./ui/AvatarInfo";
import LikeBtn from "./post/LikeBtn";
import ModalButton from "./Modal";
import { useModal } from "../hooks/useModal";
import CommentBtn from "./post/CommentBtn";
import CommentModal from "./comment/CommentModal";
import PageNation from "./ui/PageNation";

interface Props {
  scheduleId: number;
}

export default function ScheduleDetail({ scheduleId }: Props) {
  const { userId, title, dateList, body } = {
    userId: 1,
    title: "임시제목",
    dateList: [1, 2, 3, 4],
    body: "가나다라마바사아무튼내용임",
  };
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
        <div className="border-2 rounded-lg shadow mb-1 p-2">
          <h1 className="font-bold">DAY2</h1>
          <p>
            의무교육은 무상으로 한다. 모든 국민은 사생활의 비밀과 자유를
            침해받지 아니한다. 대통령이 궐위되거나 사고로 인하여 직무를 수행할
            수 없을 때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을
            대행한다. 각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은
            법률로 정한다.
          </p>
        </div>
        <div className="border-2 rounded-lg shadow mb-1 p-2">
          <h1 className="font-bold">DAY3</h1>
          <p>
            의무교육은 무상으로 한다. 모든 국민은 사생활의 비밀과 자유를
            침해받지 아니한다. 대통령이 궐위되거나 사고로 인하여 직무를 수행할
            수 없을 때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을
            대행한다. 각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은
            법률로 정한다.
          </p>
        </div>
        <div className="border-2 rounded-lg mb-1 shadow p-2">
          <h1 className="font-bold">DAY4</h1>
          <p>
            의무교육은 무상으로 한다. 모든 국민은 사생활의 비밀과 자유를
            침해받지 아니한다. 대통령이 궐위되거나 사고로 인하여 직무를 수행할
            수 없을 때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을
            대행한다. 각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은
            법률로 정한다.
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 mt-2">
            <LikeBtn count={1} />
            <ModalButton
              button={<CommentBtn postId={scheduleId} />}
              modal={<CommentModal postId={scheduleId} />}
              isOpenModal={showModal}
              setModal={switchModal}
            />
          </div>
        </div>
      </div>
      <hr className="my-2" />
      <div>
        <AvatarInfo userId={userId} />
        <p>
          의무교육은 무상으로 한다. 모든 국민은 사생활의 비밀과 자유를 침해받지
          아니한다. 대통령이 궐위되거나 사고로 인하여 직무를 수행할 수 없을
          때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을 대행한다.
          각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
        </p>
        <p>2024.02.04 21:43</p>
      </div>
      <hr className="my-2" />
      <div>
        <AvatarInfo userId={userId} />
        <p>
          의무교육은 무상으로 한다. 모든 국민은 사생활의 비밀과 자유를 침해받지
          아니한다. 대통령이 궐위되거나 사고로 인하여 직무를 수행할 수 없을
          때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을 대행한다.
          각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
        </p>
        <p>2024.02.04 21:43</p>
      </div>
      <hr className="my-2" />
      <div>
        <AvatarInfo userId={userId} />
        <p>
          의무교육은 무상으로 한다. 모든 국민은 사생활의 비밀과 자유를 침해받지
          아니한다. 대통령이 궐위되거나 사고로 인하여 직무를 수행할 수 없을
          때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을 대행한다.
          각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
        </p>
        <p>2024.02.04 21:43</p>
      </div>
      <PageNation maxPage={12} showPage={5} />
    </div>
  );
}
