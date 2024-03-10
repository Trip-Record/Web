import { useState } from "react";
import LikeIcon from "../ui/icons/LikeIcon";
import { HOST } from "../../constants";
import { useUser } from "../../hooks/useUser";
import { PostTypes, useLike } from "../../hooks/useLike";

interface Props {
  count: number;
  isLiked: boolean;
  id: number;
  type: PostTypes;
}

export default function LikeBtn({ count, isLiked = false, id, type }: Props) {
  const { active, clickLikeButton, like } = useLike({
    initCount: count,
    initLike: isLiked,
    id: id ?? -1,
    type,
  });

  return (
    <div
      className="flex items-center gap-1 cursor-pointer"
      onClick={clickLikeButton}
    >
      <LikeIcon active={active} /> {like}
    </div>
  );
}
