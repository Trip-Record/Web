import { useRef } from "react";
import CommentIcon from "../ui/icons/CommentIcon";

interface Props {
  count: number;
}
export default function CommentBtn({ count }: Props) {
  //   const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <div className="flex items-center gap-1 cursor-pointer">
        <CommentIcon /> {count}
      </div>
    </>
  );
}
