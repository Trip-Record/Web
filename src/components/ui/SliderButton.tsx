interface Props {
  type: "LEFT" | "RIGHT";
  isModal: boolean;
  currnetImageCount: number;
  maxCount: number;
  moveImage: (count: -1 | 1) => void;
}

const MOVERIGHT =
  "z-10 absolute right-1 top-[50%] shadow-md rounded-full w-6 h-6 justify-center items-center bg-white flex group-hover:opacity-60 opacity-0";
const MOVERIGHT_SM =
  "w-[50%] h-full md:w-6 md:h-6 md:top-[50%] z-10 absolute right-1 shadow-md rounded-full bg-white justify-center items-center bg-white flex md:group-hover:opacity-60 opacity-0";

const MOVELEFT =
  "z-10 absolute left-1 top-[50%] shadow-md rounded-full w-6 h-6 flex justify-center items-center bg-white group-hover:opacity-60 opacity-0";
const MOVELEFT_SM =
  "w-[50%] h-full md:w-6 md:h-6 md:top-[50%] z-10 absolute left-1 shadow-md rounded-full bg-white justify-center items-center bg-white flex md:group-hover:opacity-60 opacity-0";

export default function SliderButton({
  currnetImageCount,
  isModal,
  maxCount,
  type,
  moveImage,
}: Props) {
  const leftProps = {
    className: `${isModal ? MOVELEFT_SM : MOVELEFT} ${
      currnetImageCount === 0 && "hidden"
    }`,
    style: {
      transition: "opacity 500ms ease",
    },
    text: "←",
  };

  const rightProps = {
    className: `${isModal ? MOVERIGHT_SM : MOVERIGHT} ${
      currnetImageCount >= maxCount - 1 && "hidden"
    }`,
    text: "→",
  };

  return (
    <>
      {type === "LEFT" ? (
        <button
          onClick={() => moveImage(-1)}
          className={leftProps.className}
          style={leftProps.style}
        >
          {leftProps.text}
        </button>
      ) : (
        <button onClick={() => moveImage(1)} className={rightProps.className}>
          {rightProps.text}
        </button>
      )}
    </>
  );
}
