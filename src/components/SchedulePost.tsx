import { Link } from "react-router-dom";
import { SchedulePostData } from "../api/dummy";
import AvatarInfo from "./ui/AvatarInfo";
import LikeBtn from "./post/LikeBtn";
import CommentBtn from "./post/CommentBtn";
import CommentModal from "./comment/CommentModal";
import { useModal } from "../hooks/useModal";
import ModalButton from "./Modal";
import { useGetSchedulePostsQuery } from "../api/schedule";

interface Props {
  schedulePost: SchedulePostData;
}

interface SchedulePlace {
  placeCountry: string;
  placeName: string;
}

interface ScheduleDetail {
  scheduleDetailDate: string;
  scheduleContent: string;
}
interface SchedulePost {
  //TODO:유저 프로필 부분 추후작성
  scheduleId: number;
  scheduleTitle: string;
  schedulePlaces: SchedulePlace[];
  scheduleStartDate: string;
  scheduleEndDate: string;
  scheduleDetails: ScheduleDetail[];
  isUserLiked: boolean;
  scheduleLikeCount: number;
  scheduleCommentCount: number;
}

export default function SchedulePost({ schedulePost }: Props) {
  const { id, title, userId } = schedulePost;
  const region = "대한민국, 부산";
  const signatureImg = "/logo192.png";
  const date = "2024.03.08 ~ 2024.03.10";
  const [showModal, switchModal] = useModal();

  //const scheduleData = useGetSchedulePostsQuery(0);
  //const scheduleCount = scheduleData.data.schedules;

  const scheduleData = {
    totalPages: 1,
    pageNumber: 0,
    schedules: [
      {
        userProfile: {
          userNickname: "테스트계정",
          userProfileImg:
            "https://triprecord-bucket.s3.ap-northeast-2.amazonaws.com/Basic_Profile_Rabbit.png",
          userTripStyleName: "눈으로 담기형",
          userTripStyleImg:
            "https://triprecord-bucket.s3.ap-northeast-2.amazonaws.com/TripStyle_EyeCatcher.png",
        },
        scheduleId: 9,
        scheduleTitle: "일정 테스트입니당~",
        schedulePlaces: [
          {
            placeCountry: "대한민국",
            placeName: "서울",
          },
          {
            placeCountry: "대한민국",
            placeName: "부산",
          },
          {
            placeCountry: "대한민국",
            placeName: "대구",
          },
        ],
        scheduleStartDate: "2024-02-06",
        scheduleEndDate: "2024-02-15",
        scheduleDetails: [
          {
            scheduleDetailDate: "2024-02-06",
            scheduleContent: "첫쨋날!",
          },
          {
            scheduleDetailDate: "2024-02-07",
            scheduleContent: "둘쨋날!",
          },
          {
            scheduleDetailDate: "2024-02-15",
            scheduleContent: "마지막날!",
          },
        ],
        isUserLiked: false,
        scheduleLikeCount: 0,
        scheduleCommentCount: 2,
      },
      {
        userProfile: {
          userNickname: "seoyeon",
          userProfileImg:
            "https://triprecord-bucket.s3.ap-northeast-2.amazonaws.com/Basic_Profile_Rabbit.png",
          userTripStyleName: null,
          userTripStyleImg: null,
        },
        scheduleId: 7,
        scheduleTitle: "일정제목",
        schedulePlaces: [
          {
            placeCountry: "대한민국",
            placeName: "서울",
          },
          {
            placeCountry: "대한민국",
            placeName: "부산",
          },
          {
            placeCountry: "대한민국",
            placeName: "대전",
          },
        ],
        scheduleStartDate: "2024-03-22",
        scheduleEndDate: "2024-03-24",
        scheduleDetails: [
          {
            scheduleDetailDate: "2024-03-22",
            scheduleContent: "신난다",
          },
          {
            scheduleDetailDate: "2024-03-23",
            scheduleContent: "야호!",
          },
        ],
        isUserLiked: false,
        scheduleLikeCount: 0,
        scheduleCommentCount: 0,
      },
      {
        userProfile: {
          userNickname: "seoyeon",
          userProfileImg:
            "https://triprecord-bucket.s3.ap-northeast-2.amazonaws.com/Basic_Profile_Rabbit.png",
          userTripStyleName: null,
          userTripStyleImg: null,
        },
        scheduleId: 6,
        scheduleTitle: "일정제목",
        schedulePlaces: [
          {
            placeCountry: "대한민국",
            placeName: "서울",
          },
          {
            placeCountry: "대한민국",
            placeName: "부산",
          },
          {
            placeCountry: "대한민국",
            placeName: "대전",
          },
        ],
        scheduleStartDate: "2024-03-22",
        scheduleEndDate: "2024-03-24",
        scheduleDetails: [
          {
            scheduleDetailDate: "2024-03-22",
            scheduleContent: "신난다",
          },
          {
            scheduleDetailDate: "2024-03-23",
            scheduleContent: "야호!",
          },
        ],
        isUserLiked: false,
        scheduleLikeCount: 0,
        scheduleCommentCount: 0,
      },
      {
        userProfile: {
          userNickname: "seoyeon",
          userProfileImg:
            "https://triprecord-bucket.s3.ap-northeast-2.amazonaws.com/Basic_Profile_Rabbit.png",
          userTripStyleName: null,
          userTripStyleImg: null,
        },
        scheduleId: 5,
        scheduleTitle: "일정제목",
        schedulePlaces: [
          {
            placeCountry: "일본",
            placeName: "후쿠오카",
          },
          {
            placeCountry: "이탈리아",
            placeName: "로마",
          },
        ],
        scheduleStartDate: "2024-12-22",
        scheduleEndDate: "2024-12-24",
        scheduleDetails: [
          {
            scheduleDetailDate: "2024-12-22",
            scheduleContent: "신난다",
          },
          {
            scheduleDetailDate: "2024-12-23",
            scheduleContent: "야호!",
          },
        ],
        isUserLiked: false,
        scheduleLikeCount: 0,
        scheduleCommentCount: 0,
      },
      {
        userProfile: {
          userNickname: "seoyeon",
          userProfileImg:
            "https://triprecord-bucket.s3.ap-northeast-2.amazonaws.com/Basic_Profile_Rabbit.png",
          userTripStyleName: "인생 사진형",
          userTripStyleImg:
            "https://triprecord-bucket.s3.ap-northeast-2.amazonaws.com/TripStyle_Photo.png",
        },
        scheduleId: 4,
        scheduleTitle: "일정제목",
        schedulePlaces: [
          {
            placeCountry: "대한민국",
            placeName: "서울",
          },
          {
            placeCountry: "대한민국",
            placeName: "부산",
          },
          {
            placeCountry: "대한민국",
            placeName: "대구",
          },
        ],
        scheduleStartDate: "2024-01-22",
        scheduleEndDate: "2024-01-24",
        scheduleDetails: [
          {
            scheduleDetailDate: "2024-01-22",
            scheduleContent: "첫쨋날!",
          },
          {
            scheduleDetailDate: "2024-01-23",
            scheduleContent: "둘쨋날!",
          },
        ],
        isUserLiked: false,
        scheduleLikeCount: 0,
        scheduleCommentCount: 0,
      },
    ],
  };
  console.log(scheduleData);
  const scheduleCount = scheduleData.schedules;
  //const scheduleDate = scheduleData.data.console.log(scheduleData.data);
  console.log(scheduleCount);

  const makeStartEndDateString = (startDate: string, endDate: string) => {
    return `${startDate.replace("-", ".")} - ${endDate.replace("-", ".")}`;
  };
  return (
    <div>
      {scheduleCount.map((schedulePost: SchedulePost, index: number) => {
        return (
          <div
            className="flex flex-col gap-1 rounded-md p-2 bg-white shadow w-2/5 mx-auto my-3"
            key={schedulePost.scheduleId}
          >
            <AvatarInfo userId={userId} />
            <div className="flex gap-3">
              <p>{`${schedulePost.schedulePlaces[0].placeCountry}, ${schedulePost.schedulePlaces[0].placeName}`}</p>
              <p>{`${makeStartEndDateString(
                schedulePost.scheduleStartDate,
                schedulePost.scheduleEndDate
              )}`}</p>
            </div>
            <div>{schedulePost.scheduleTitle}</div>
            <div className="border-2 rounded-lg shadow mb-1 p-2">
              <h1 className="font-bold">DAY1</h1>
              <p>{}</p>
            </div>
          </div>
        );
      })}
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
          <Link to={`/schedule/${id}`}>모든 일정 보기</Link>
        </div>
      </div>
    </div>
  );
}
