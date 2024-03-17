import Slider from "../ui/Slider";
import DeleteIcon from "../ui/icons/DeleteIcon";
import ModifyIcon from "../ui/icons/ModifyIcon";
import AvatarInfo from "../ui/AvatarInfo";
import SkeletonDetail from "../ui/skeleton/SkeletonDetail";
import LikeBtn from "./LikeBtn";
import Comments from "../comment/Comments";
import { useUser } from "../../hooks/useUser";
import { useRecord } from "../../hooks/useRecord";
import { Place, ResponseImage } from "../../api/records";
import LocationIcon from "../ui/icons/LocationIcon.png";
import DateIcon from "../ui/icons/DateIcon.png";
import { useDeleteRecordDetailMutation } from "../../api/record";
import { useNavigate } from "react-router-dom";
import noimage from "../ui/icons/noimage.png";

interface Props {
  postId: number;
}

const getDateYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const dateString = year + "." + month + "." + day;
  return dateString;
};

export default function PostDetail({ postId }: Props) {
  // const { data, isLoading } = useGetPostQuery(postId);
  const { data, deleteRecord } = useRecord(postId);
  const { user } = useUser();
  const [deleteRecordDetail] = useDeleteRecordDetailMutation();
  const navi = useNavigate();

  if (!data) return <SkeletonDetail />;
  const {
    recordTitle,
    recordContent,
    recordUserProfile,
    tripStartDate,
    tripEndDate,
    recordImages,
    likeCount,
    recordPlaces,
    isUserLiked,
    commentCount,
  } = data;

  const images = recordImages.map((image) => image.recordImageUrl);

  const place = recordPlaces
    .map((place) => `${place.countryName}, ${place.placeName}`)
    .join("/");

  const nothingImage = images.length === 0;

  // TODO: 유저 고유 ID 검증 필요
  const isMyRecord =
    recordUserProfile.userNickname === user?.userProfile.userNickname;

  const handleDeleteClick = (recordId: number) => {
    const deleteCheck = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (deleteCheck) {
      deleteRecordDetail(recordId)
        .unwrap()
        .then(() => {
          alert("게시글이 삭제되었습니다.");
          navi("/travel-record");
        })
        .catch((error) => {
          console.error("Deleting record failed", error);
          alert("게시글 삭제에 실패하였습니다.");
        });
    }
  };

  return (
    <main className="w-full max-w-screen-md flex flex-col gap-2">
      <h2 className="font-semibold">{recordTitle}</h2>
      <AvatarInfo userProfile={recordUserProfile} />
      <div className="flex items-center justify-between border-b border-black/80 pb-2">
        <div className="flex text-gray-500 flex-col">
          <div className="flex gap-2">
            <img src={LocationIcon} width="25" />
            <span>{place}</span>
          </div>
          <div className="flex gap-2">
            <img src={DateIcon} width="25" />
            <span>
              {getDateYYYYMMDD(new Date(tripStartDate))} ~{" "}
              {getDateYYYYMMDD(new Date(tripEndDate))}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {isMyRecord && (
            <>
              <button className="flex items-center">
                <ModifyIcon size={16} /> 수정
              </button>
              <button
                className="flex items-center"
                onClick={() => {
                  handleDeleteClick(postId);
                }}
              >
                <DeleteIcon size={18} /> 삭제
              </button>
            </>
          )}
        </div>
      </div>
      <article className={`flex flex-col items-center justify-center`}>
        {nothingImage ? (
          <img
            src={noimage}
            className="w-24 md:w-56 object-cover rounded-md shadow-md"
            alt="travel_sinature"
          ></img>
        ) : (
          <div className="p-10">
            <Slider images={images} onModal={false} />
          </div>
        )}
        <div>{recordContent}</div>
      </article>
      <div className="mt-auto">
        <LikeBtn
          count={likeCount}
          isLiked={isUserLiked}
          id={postId}
          type="records"
        />
      </div>

      <Comments postId={postId} commentCount={commentCount} type="records" />
    </main>
  );
}
