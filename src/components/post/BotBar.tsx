interface Props {
  length: number;
  currentSeq: number;
  onDotClick: (seq: number) => void;
}
export default function DotBar({ length, onDotClick, currentSeq }: Props) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length })
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full bg-gray-200 cursor-pointer ${
              currentSeq === i * -1 && "bg-gray-500 cursor-default"
            }`}
            onClick={() => onDotClick(i)}
          ></div>
        ))}
    </div>
  );
}
