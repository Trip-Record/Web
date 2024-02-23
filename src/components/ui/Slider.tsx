import { useState } from "react";
import DotBar from "../post/BotBar";
import { useModal } from "../../hooks/useModal";
import ModalButton from "../Modal";
import ModalImage from "../post/PostImage";
import PostImage from "./PostImage";
import SliderButton from "./SliderButton";

interface Props {
  images: string[];
  count?: number;
  onModal?: boolean;
}

export const IMG_BOX = "aspect-square max-h-[80vh] items-center gap-2 mx-auto";
export const IMG_BOX_MODAL = ` ${IMG_BOX}`;
export const IMG_BOX_NORMAL = `aspect-square ${IMG_BOX}`;
export default function Slider({ images, count = 0, onModal = false }: Props) {
  const [imageCount, setImageCount] = useState(count);

  const moveImage = (direct: 1 | -1) => {
    let page = 0;
    if (direct === 1) page = Math.floor(imageCount + direct);
    if (direct === -1) page = Math.ceil(imageCount + direct);
    setImageCount(page);
  };

  const onDotClick = (seq: number) => {
    setImageCount(seq);
  };

  return (
    <div className={`flex flex-col ${IMG_BOX}`}>
      <div className="relative flex border w-full h-full aspect-square overflow-hidden group">
        <div
          className="flex relative h-full"
          style={{
            transform: `translateX(${imageCount * -100}%)`,
            transition: "transform 500ms ease",
          }}
        >
          {images.map((image, i) =>
            onModal ? (
              <PostImage image={image} key={image + i} />
            ) : (
              <ModalImage images={images} key={image + i} count={i} />
            )
          )}
        </div>

        <SliderButton
          currnetImageCount={imageCount}
          isModal={onModal}
          maxCount={images.length}
          moveImage={moveImage}
          type="LEFT"
        />
        <SliderButton
          currnetImageCount={imageCount}
          isModal={onModal}
          maxCount={images.length}
          moveImage={moveImage}
          type="RIGHT"
        />
      </div>

      <DotBar
        length={images.length}
        currentSeq={imageCount}
        onDotClick={onDotClick}
      />
    </div>
  );
}
