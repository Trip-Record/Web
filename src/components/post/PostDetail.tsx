import Slider from "../ui/Slider";
import { useGetPostQuery } from "../../api/dummy";
import DeleteIcon from "../ui/icons/DeleteIcon";
import ModifyIcon from "../ui/icons/ModifyIcon";
import AvatarInfo from "../ui/AvatarInfo";
import SkeletonDetail from "../ui/skeleton/SkeletonDetail";
import LikeBtn from "./LikeBtn";
import Comments from "../comment/Comments";
import { useGetRecordQuery } from "../../api/record";

interface Props {
  postId: number;
}

export default function PostDetail({ postId }: Props) {
  // const { data, isLoading } = useGetPostQuery(postId);
  const { data } = useGetRecordQuery(postId);

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

  const startPlace = recordPlaces[0];
  const endPlace = recordPlaces[1];
  const nothingImage = images.length === 0;

  return (
    <main className="w-full max-w-screen-md flex flex-col gap-2">
      <h2 className="font-semibold">{recordTitle}</h2>
      <AvatarInfo userProfile={recordUserProfile} />
      <div className="flex items-center justify-between border-b border-black/80 pb-2">
        <div className="flex gap-2 text-gray-500 flex-col md:flex-row">
          <span>
            {startPlace?.countryName}, {startPlace?.placeName}
            {endPlace && (
              <>
                - {endPlace?.countryName}, {endPlace?.placeName}
              </>
            )}
          </span>
          <span>
            {tripStartDate}-{tripEndDate}
          </span>
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
