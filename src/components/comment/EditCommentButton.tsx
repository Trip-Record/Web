import { MouseEvent, MouseEventHandler } from "react";

interface Props {
  onClick: (e?: MouseEvent<HTMLButtonElement>) => void;
}
export default function EditCommentButton({ onClick }: Props) {
  return (
    <button className="w-10 text-nowrap" onClick={(e) => onClick(e)}>
      수정
    </button>
  );
}
