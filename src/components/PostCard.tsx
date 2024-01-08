import { PostData } from "../api/dummy";

interface Props {
  post: PostData;
}
export default function PostCard({ post }: Props) {
  const { body, id, title, userId } = post;
  const region = "대한민국, 부산";
  const signatureImg = "/logo192.png";
  return (
    <section className="flex flex-row justify-center w-full h-56 bg-white border-b last:border-b-white p-2">
      {/* 아바타 / 사용자이름 */} {/* 여행타입 */}
      <div className="flex flex-col">
        <h2 className="text-gray-500 text-ellipsis">{region}</h2>
        <h2 className="font-bold line-clamp-1">{title}</h2>
        <div className="line-clamp-4">{body}</div>
        <div className="mt-auto">
          <span>좋아요</span>
          <span>댓글</span>
        </div>
      </div>
      <img
        src={signatureImg}
        className="w-24 md:w-56 object-contain"
        alt="signature"
      ></img>
    </section>
  );
}
