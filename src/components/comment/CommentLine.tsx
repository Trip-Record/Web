import { CommentData } from "../../api/dummy";
import Avatar from "../ui/Avatar";
import TravelStyle from "../ui/TravelStyle";

interface Props {
  comment: CommentData;
}
export default function CommentLine({ comment }: Props) {
  const { body, name } = comment;
  return (
    <div className="flex flex-col p-2 border-b last:border-none gap-1">
      <div className="flex items-center gap-1">
        <Avatar img="/logo192.png" size="s" />
        <span className="text-gray-500">이름</span>
        <TravelStyle selectStyle="즉흥형" />
      </div>
      <div>{body}</div>
      <div className="text-gray-400 text-sm">2023.11.12 12:23</div>
    </div>
  );
}
