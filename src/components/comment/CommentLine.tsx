import { CommentData } from "../../api/comment";
import AvatarInfo from "../ui/AvatarInfo";

interface Props {
  comment: CommentData;
}
export default function CommentLine({ comment }: Props) {
  const { commentContent, commentCreatedTime, userProfile } = comment;
  return (
    <div className="flex flex-col py-2 border-b last:border-none gap-1">
      <div className="flex items-center justify-between gap-2">
        <AvatarInfo userProfile={userProfile} />
        <button className="w-10 text-nowrap" onClick={() => {}}>
          수정
        </button>
        <button className="w-10 text-nowrap" onClick={() => {}}>
          삭제
        </button>
      </div>
      <div>{commentContent}</div>
      <div className="text-gray-400 text-sm">{commentCreatedTime}</div>
    </div>
  );
}
