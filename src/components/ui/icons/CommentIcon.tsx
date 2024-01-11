import { FaRegCommentDots } from "react-icons/fa";

interface Props {
  size?: number;
}
export default function CommentIcon({ size = 25 }: Props) {
  return <FaRegCommentDots size={size} />;
}
