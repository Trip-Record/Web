import { useState } from "react";
import DotBar from "../post/BotBar";
import { useModal } from "../../hooks/useModal";
import ModalButton from "../Modal";
import PostImage from "../post/PostImage";

interface Props {
  images: string[];
  count?: number;
  onModal?: boolean;
}

const MOVERIGHT =
  "z-10 absolute right-1 top-[50%] shadow-md rounded-full w-6 h-6 justify-center items-center bg-white flex group-hover:opacity-60 opacity-0";
const MOVERIGHT_SM =
  "w-[50%] h-full md:w-6 md:h-6 md:top-[50%] z-10 absolute right-1 shadow-md rounded-full bg-white justify-center items-center bg-white flex md:group-hover:opacity-60 opacity-0";

const MOVELEFT =
  "z-10 absolute left-1 top-[50%] shadow-md rounded-full w-6 h-6 flex justify-center items-center bg-white group-hover:opacity-60 opacity-0";
const MOVELEFT_SM =
  "w-[50%] h-full md:w-6 md:h-6 md:top-[50%] z-10 absolute left-1 shadow-md rounded-full bg-white justify-center items-center bg-white flex md:group-hover:opacity-60 opacity-0";

export default function Slider({ images, count = 0, onModal = false }: Props) {
  const [imageCount, setImageCount] = useState(count);

  // Slider사용시 주석해제 *count* -1 고려할것*
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  // const divRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   const divRect = divRef.current?.getBoundingClientRect();
  //   setImageCount((position.x / divRect!.width) * -1);
  // }, [position.x]);

  const moveImage = (direct: 1 | -1) => {
    let page = 0;
    if (direct === 1) page = Math.floor(imageCount + direct);
    if (direct === -1) page = Math.ceil(imageCount + direct);
    setImageCount(page);

    // Slider사용시 주석해제 *count* -1 고려할것*
    // const divRect = divRef.current?.getBoundingClientRect();
    // const newX = divRect!.width * (page * -1);
    // setPosition({ x: newX, y: position.y });
  };

  const onDotClick = (seq: number) => {
    setImageCount(seq);
  };

  return (
    <div
      className={`flex flex-col ${
        onModal ? "w-full" : "w-3/4"
      } max-h-[80vh] aspect-square items-center gap-2 mx-auto`}
    >
      <div className="relative flex border w-full aspect-square overflow-hidden group">
        <div
          className="flex relative h-full"
          style={{
            transform: `translateX(${imageCount * -100}%)`,
            transition: "transform 500ms ease",
          }}
        >
          {images.map((image, i) =>
            onModal ? (
              <img
                src={image}
                alt="포스트 이미지"
                className="object-contain p-2 bg-black"
                key={image}
              />
            ) : (
              <PostImage image={image} key={image} count={imageCount} />
            )
          )}
        </div>
        {/* <img src={images[0]} alt="포스트 이미지" className="" /> */}
        <button
          onClick={() => moveImage(-1)}
          className={`${onModal ? MOVELEFT_SM : MOVELEFT} ${
            imageCount === 0 && "hidden"
          }`}
          style={{
            transition: "opacity 500ms ease",
          }}
        >
          ←
        </button>
        <button
          onClick={() => moveImage(1)}
          className={`${onModal ? MOVERIGHT_SM : MOVERIGHT} ${
            imageCount >= images.length - 1 && "hidden"
          }`}
        >
          {`→`}
        </button>
      </div>
      {/* <SlideBar
        setPosition={setPosition}
        leftX={position.x}
        length={images.length}
        ref={divRef}
      /> */}
      <DotBar
        length={images.length}
        currentSeq={imageCount}
        onDotClick={onDotClick}
      />
    </div>
  );
}
