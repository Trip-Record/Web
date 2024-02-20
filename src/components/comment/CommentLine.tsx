import { CommentData } from "../../api/dummy";
import Avatar from "../ui/Avatar";
import AvatarInfo from "../ui/AvatarInfo";
import TravelStyle from "../ui/TravelStyle";

interface Props {
  comment: CommentData;
}
export default function CommentLine({ comment }: Props) {
  const { commentContent, commentCreatedTime, userProfile } = comment;
  return (
    <div className="flex flex-col py-2 border-b last:border-none gap-1">
      <AvatarInfo userProfile={userProfile} />
      <div>{commentContent}</div>
      <div className="text-gray-400 text-sm">{commentCreatedTime}</div>
    </div>
  );
}
