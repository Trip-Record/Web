import { IMG_BOX } from "./Slider";

interface Props {
  image: string;
  onClick?: () => void;
}
export default function PostImage({ image, onClick }: Props) {
  return (
    <div className={IMG_BOX}>
      <img
        src={image}
        alt="포스트 이미지"
        className="object-contain bg-black w-full h-full"
        key={image}
        onClick={onClick}
      />
    </div>
  );
}
