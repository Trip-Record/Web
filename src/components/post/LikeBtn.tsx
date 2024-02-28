import { useState } from "react";
import LikeIcon from "../ui/icons/LikeIcon";
import { HOST } from "../../constants";
import { useUser } from "../../hooks/useUser";
import { useLike } from "../../hooks/useLike";

interface Props {
  count: number;
  isLiked?: boolean;
  id?: number;
}

export default function LikeBtn({ count, isLiked = false, id }: Props) {
  const { active, clickLikeButton, like } = useLike({
    initCount: count,
    initLike: isLiked,
    recordId: id ?? -1,
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
