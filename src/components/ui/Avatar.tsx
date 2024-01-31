type AvatarSize = "l" | "m" | "s";
interface Props {
  img: string;
  size: AvatarSize;
}
export default function Avatar({ img, size }: Props) {
  return (
    <img src={img} className={`${getSize(size)}`} alt="프로필_이미지"></img>
  );
}

function getSize(size: AvatarSize) {
  if (size === "l") return "w-8 h-8";
  else if (size === "m") return "w-8 h-8";
  else if (size === "s") return "w-8 h-8";
}
