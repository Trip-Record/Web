import { useState } from "react";
import LikeIcon from "../ui/icons/LikeIcon";

interface Props {
  count: number;
  isLiked?: boolean;
}

// TODO: 리덕스로 전환
export default function LikeBtn({ count, isLiked = false }: Props) {
  const [active, setActive] = useState(isLiked);
  const [like, setLike] = useState(count);

  const addLike = () => {};
  const removeLike = () => {};

  const clickLikeButton = () => {
    if (active) {
      setLike(like - 1);
      removeLike();
    } else {
      setLike(like + 1);
      addLike();
    }
    setActive(!active);
  };

  return (
    <div
      className="flex items-center gap-1 cursor-pointer"
      onClick={clickLikeButton}
    >
      <LikeIcon active={active} /> {like}
    </div>
  );
}
