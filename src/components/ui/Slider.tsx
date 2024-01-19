import { useState } from "react";

interface Props {
  images: string[];
}
export default function Slider({ images }: Props) {
  const [imageCount, setImageCount] = useState(0);

  return (
    <div className="flex flex-col w-3/4 items-center gap-2">
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
          onClick={() => setImageCount((prev) => prev + 1)}
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
          onClick={() => setImageCount((prev) => prev - 1)}
          className={`z-10 absolute right-1 top-[50%] shadow-md rounded-full w-6 h-6 justify-center items-center bg-white flex group-hover:opacity-60 opacity-0 ${
            -1 * imageCount >= images.length - 1 && "hidden"
          }`}
        >
          {`→`}
        </button>
      </div>
      <div className="relative bg-gray-200 w-3/4 h-2 rounded-full">
        <div
          className="absolute bg-gray-400 rounded-full h-2"
          style={{
            width: `${100 / images.length}%`,
            transform: `translateX(${imageCount * 100 * -1}%)`,
            transition: "transform 500ms ease",
          }}
        ></div>
      </div>
    </div>
  );
}
