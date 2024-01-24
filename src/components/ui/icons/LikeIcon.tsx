import { IconBaseProps } from "react-icons";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
interface Props extends IconBaseProps {
  active?: boolean;
  size?: number;
}
export default function LikeIcon({ active = false, size = 25 }: Props) {
  return active ? <AiFillLike size={size} /> : <AiOutlineLike size={size} />;
}
