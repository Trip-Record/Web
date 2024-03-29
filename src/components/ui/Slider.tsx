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

export const IMG_BOX =
  "flex flex-col aspect-square w-full items-center gap-2 mx-auto";
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
    <div
      className={`${IMG_BOX} ${
        onModal
          ? "max-w-[48rem] w-[100vw] max-h-[90vh] outline-double border-none outline-none"
          : "max-w-[70%]"
      }`}
    >
      <div
        className={`relative flex border w-full h-full aspect-square overflow-hidden group border-none rounded-md`}
      >
        <div
          className="flex relative w-full h-full"
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
