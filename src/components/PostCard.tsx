import { PostData, useGetCommentsQuery } from "../api/dummy";
import ModalButton from "./Modal";
import CommentModal from "./comment/CommentModal";
import CommentBtn from "./post/CommentBtn";
import LikeBtn from "./post/LikeBtn";
import Avatar from "./ui/Avatar";
import TravelStyle from "./ui/TravelStyle";

interface Props {
  post: PostData;
  type?: "blog" | "instagram";
}
export default function PostCard({ post, type = "blog" }: Props) {
  const { body, id, title, userId } = post;

  const { data: commentData } = useGetCommentsQuery(id);

  const region = "대한민국, 부산";
  const signatureImg = "/logo192.png";
  if (type === "blog") {
    return (
      //TODO: h-56 삭제
      <section className="flex flex-row w-full h-60 bg-white border-b last:border-b-white p-2 pb-5">
        <div className="flex flex-col flex-1 gap-1">
          <div className="flex items-center gap-1">
            <Avatar img="/logo192.png" size="s" />
            <span className="text-gray-500">이름</span>
            <TravelStyle selectStyle="인생 사진형" />
          </div>
          <h2 className="text-gray-400 text-ellipsis text-sm">{region}</h2>
          <h2 className="font-bold line-clamp-1">{title}</h2>
          <div className="line-clamp-4">{body}</div>
          <div className="flex items-center mt-auto gap-3">
            <LikeBtn count={1} />
            {/* <CommentBtn count={1} /> */}
            {commentData && (
              <ModalButton
                button={<CommentBtn count={commentData.length} />}
                modal={<CommentModal comments={commentData} />}
              />
            )}
          </div>
        </div>
        <img
          src={signatureImg}
          className="w-24 md:w-56 object-contain"
          alt="signature"
        ></img>
      </section>
    );
  } else {
    return (
      <section className="flex flex-col w-full items-center max-w-lg bg-white border shadow-sm rounded-md p-2">
        <div className="flex w-full flex-row justify-between">
          <div className="flex items-center">
            <Avatar img="/logo192.png" size="s" />
            <span>이름</span>
          </div>
          <TravelStyle selectStyle="인생 사진형" />
        </div>
        <h2 className="text-gray-400 text-ellipsis text-sm w-full">{region}</h2>
        <img
          src="/logo192.png"
          alt="travel_image"
          className="w-[80%] h-60 object-contain"
        />
        <div className="font-bold line-clamp-1">{title}</div>
        <div className="line-clamp-4">{body}</div>
        <div className="flex items-center w-full mt-4 gap-3">
          <LikeBtn count={1} />
          {/* <CommentBtn count={1} /> */}
          {commentData && (
            <ModalButton
              button={<CommentBtn count={commentData.length} />}
              modal={<CommentModal comments={commentData} />}
            />
          )}
        </div>
      </section>
    );
  }
}
