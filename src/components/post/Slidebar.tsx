import { forwardRef, useState } from "react";

interface Props {
  length: number;
  leftX: number;
  setPosition: (value: { x: number; y: number }) => void;
}

const SlideBar = forwardRef<HTMLDivElement, Props>(
  ({ leftX, length, setPosition }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const [downXPos, setDownXPos] = useState(0);

    const handleMouseDown = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      if (!ref) return;
      //   @ts-ignore
      const divRect = ref?.current.getBoundingClientRect();

      setIsDragging(true);
      setDownXPos(e.clientX - divRect!.left);
    };

    const handleMouseMove = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      if (isDragging && ref) {
        //   @ts-ignore
        const parentRect = ref.current?.parentElement?.getBoundingClientRect();
        const newX = e.clientX - parentRect!.left - downXPos;

        if (
          newX < 0 || //   @ts-ignore
          newX > parentRect!.width - ref.current!.getBoundingClientRect()!.width
        )
          return;
        setPosition({ x: newX, y: 0 });
      }
    };

    return (
      <div
        className="relative bg-gray-200 w-3/4 h-[0.7rem] rounded-full"
        onMouseLeave={() => setIsDragging(false)}
        onMouseUp={() => setIsDragging(false)}
      >
        <div
          className="absolute bg-gray-400 rounded-full h-[0.7rem]"
          style={{
            width: `${100 / length}%`,
            // transform: `translateX(${barTranslateX}%)`,
            // transition: "left 10ms ease",
            left: leftX + "px",
          }}
          ref={ref}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          // onMouseUp={handleMouseUp}
        ></div>
      </div>
    );
  }
);

export default SlideBar;

// export default function SlideBar({ leftX, length, ref, setPosition }: Props) {
//   const [isDragging, setIsDragging] = useState(false);
//   const [downXPos, setDownXPos] = useState(0);

//   const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     const divRect = ref.current?.getBoundingClientRect();

//     setIsDragging(true);
//     setDownXPos(e.clientX - divRect!.left);
//   };

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     if (isDragging && ref) {
//       const parentRect = ref.current?.parentElement?.getBoundingClientRect();
//       const newX = e.clientX - parentRect!.left - downXPos;

//       if (
//         newX < 0 ||
//         newX > parentRect!.width - ref.current!.getBoundingClientRect()!.width
//       )
//         return;
//       setPosition({ x: newX, y: 0 });
//     }
//   };

//   return (
//     <div className="relative bg-gray-200 w-3/4 h-[0.7rem] rounded-full">
//       <div
//         className="absolute bg-gray-400 rounded-full h-[0.7rem]"
//         style={{
//           width: `${100 / length}%`,
//           // transform: `translateX(${barTranslateX}%)`,
//           // transition: "left 10ms ease",
//           left: leftX + "px",
//         }}
//         ref={ref}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         // onMouseUp={handleMouseUp}
//       ></div>
//     </div>
//   );
// }
