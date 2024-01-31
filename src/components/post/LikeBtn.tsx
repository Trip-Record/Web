import { useState } from "react";
import LikeIcon from "../ui/icons/LikeIcon";

interface Props {
  count: number;
}

// TODO: 리덕스로 전환
export default function LikeBtn({ count }: Props) {
  const [active, setActive] = useState(false);
  const [like, setLike] = useState(count);

  const addLike = () => {};
  const removeLike = () => {};

  return (
    <div
      className="flex items-center gap-1 cursor-pointer"
      onClick={() => {
        if (active) {
          setLike(like - 1);
          removeLike();
        } else {
          setLike(like + 1);
          addLike();
        }
        setActive(!active);
      }}
    >
      <LikeIcon active={active} /> {like}
    </div>
  );
}
