import { STYLES } from "../SelectTravelStyle";
export type Travel_Style =
  | "쇼핑형"
  | "명소 방문형"
  | "빡센 일정형"
  | "힐링 휴양형"
  | "즉흥형"
  | "계획형"
  | "눈으로 담기형"
  | "인생 사진형";

interface Props {
  selectStyle: Travel_Style;
}

export default function TravelStyle({ selectStyle }: Props) {
  const findStyle = STYLES.find((style) => style.title === selectStyle);
  const img = findStyle?.image;

  return (
    <div className="flex items-center gap-1 h-7 bg-blue-200 p-1 px-2 rounded-full">
      <img src={img} alt="travel_style" className="h-full"></img>
      <span className="hidden sm:block">{selectStyle}</span>
    </div>
  );
}
