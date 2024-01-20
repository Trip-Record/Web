import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
  images: string[];
}

export default function Slider({ images }: Props) {
  const [imageCount, setImageCount] = useState(0);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [downXPos, setDownXPos] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const divRect = divRef.current?.getBoundingClientRect();

    setIsDragging(true);
    setDownXPos(e.clientX - divRect!.left);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging && divRef) {
      const parentRect = divRef.current?.parentElement?.getBoundingClientRect();
      const newX = e.clientX - parentRect!.left - downXPos;

      if (
        newX < 0 ||
        newX >
          parentRect!.width - divRef.current!.getBoundingClientRect()!.width
      )
        return;
      setPosition({ x: newX, y: position.y });
    }
  };

  useEffect(() => {
    const divRect = divRef.current?.getBoundingClientRect();
    setImageCount((position.x / divRect!.width) * -1);
  }, [position.x]);

  const moveImage = (direct: 1 | -1) => {
    let page = 0;
    if (direct === -1) page = Math.ceil(imageCount + direct);
    if (direct === 1) page = Math.floor(imageCount + direct);
    // const page = Math.floor(imageCount + direct);
    setImageCount(page);
    const divRect = divRef.current?.getBoundingClientRect();
    const newX = divRect!.width * (page * -1);
    setPosition({ x: newX, y: position.y });
  };

  return (
    <div
      className="flex flex-col w-3/4 items-center gap-2"
      onMouseLeave={() => setIsDragging(false)}
      onMouseUp={() => setIsDragging(false)}
    >
      <div className="relative flex border w-full aspect-square overflow-hidden group">
        <div
          className="flex relative h-full"
          style={{
            transform: `translateX(${imageCount * 100}%)`,
            transition: "transform 500ms ease",
          }}
        >
          {images.map((image, i) => (
            <img
              src={image}
              key={i}
              alt="포스트 이미지"
              className="object-contain p-2 bg-black"
            />
          ))}
        </div>
        {/* <img src={images[0]} alt="포스트 이미지" className="" /> */}
        <button
          onClick={() => moveImage(1)}
          className={`z-10 absolute left-1 top-[50%] shadow-md rounded-full w-6 h-6 flex justify-center items-center bg-white group-hover:opacity-60 opacity-0 ${
            imageCount === 0 && "hidden"
          }`}
          style={{
            transition: "opacity 500ms ease",
          }}
        >
          ←
        </button>
        <button
          onClick={() => moveImage(-1)}
          className={`z-10 absolute right-1 top-[50%] shadow-md rounded-full w-6 h-6 justify-center items-center bg-white flex group-hover:opacity-60 opacity-0 ${
            -1 * imageCount >= images.length - 1 && "hidden"
          }`}
        >
          {`→`}
        </button>
      </div>
      <div className="relative bg-gray-200 w-3/4 h-[0.7rem] rounded-full">
        <div
          className="absolute bg-gray-400 rounded-full h-[0.7rem]"
          style={{
            width: `${100 / images.length}%`,
            // transform: `translateX(${barTranslateX}%)`,
            // transition: "left 10ms ease",
            left: position.x + "px",
          }}
          ref={divRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          // onMouseUp={handleMouseUp}
        ></div>
      </div>
    </div>
  );
}
