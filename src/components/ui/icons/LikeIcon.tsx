import { AiFillLike, AiOutlineLike } from "react-icons/ai";
interface Props {
  active?: boolean;
  size?: number;
}
export default function LikeIcon({ active = false, size = 25 }: Props) {
  return active ? <AiFillLike size={size} /> : <AiOutlineLike size={size} />;
}
