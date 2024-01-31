import LikeIcon from "../ui/icons/LikeIcon";

interface Props {
  count: number;
}
export default function LikeBtn({ count }: Props) {
  return (
    <div className="flex items-center gap-1 cursor-pointer">
      <LikeIcon active={false} /> {count}
    </div>
  );
}
