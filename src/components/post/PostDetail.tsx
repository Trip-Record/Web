import Slider from "../ui/Slider";
import { useGetPostQuery } from "../../api/dummy";
import DeleteIcon from "../ui/icons/DeleteIcon";
import ModifyIcon from "../ui/icons/ModifyIcon";
import AvatarInfo from "../ui/AvatarInfo";
import SkeletonDetail from "../ui/skeleton/SkeletonDetail";
import LikeBtn from "./LikeBtn";
import Comments from "../comment/Comments";
import { useGetRecordQuery } from "../../api/record";
import { HOST } from "../../constants";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

interface Props {
  postId: number;
}

export default function PostDetail({ postId }: Props) {
  // const { data, isLoading } = useGetPostQuery(postId);
  const { data } = useGetRecordQuery(postId);
  const { user } = useUser();
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
  } = data;

  const images = recordImages.map((image) => image.recordImageUrl);

  const place = recordPlaces
    .map((place) => `${place.countryName}, ${place.placeName}`)
    .join("/");

  const nothingImage = images.length === 0;
  const deleteRecord = () => {
    fetch(`${HOST}/records/${postId}`, {
      method: "DELETE",
      headers: {
        AUTHORIZATION: `Bearer ${user?.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("삭제되었습니다");
          navi("/");
        } else {
          alert("삭제에 실패하였습니다");
        }
      })
      .catch(() => {
        alert("삭제 중 오류가 발생하였습니다. 네트워크 상태를 확인하세요");
      });
  };

  return (
    <main className="w-full max-w-screen-md flex flex-col gap-2">
      <h2 className="font-semibold">{recordTitle}</h2>
      <AvatarInfo userProfile={recordUserProfile} />
      <div className="flex items-center justify-between border-b border-black/80 pb-2">
        <div className="flex text-gray-500 flex-col">
          <div>
            <span>[아이콘자리]</span>
            <span>{place}</span>
          </div>
          <div>
            [아이콘자리]
            <span>
              {tripStartDate} - {tripEndDate}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="flex items-center">
            <ModifyIcon size={16} /> 수정
          </button>
          <button className="flex items-center" onClick={() => deleteRecord()}>
            <DeleteIcon size={18} /> 삭제
          </button>
        </div>
      </div>
      <article
        className={`flex flex-col items-center justify-center ${
          nothingImage && "h-52"
        }`}
      >
        {!nothingImage && <Slider images={images} onModal={false} />}
        <div>{recordContent}</div>
      </article>
      <div className="mt-auto">
        <LikeBtn count={likeCount} isLiked={isUserLiked} />
      </div>

      <Comments postId={postId} />
    </main>
  );
}
