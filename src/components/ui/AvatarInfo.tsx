import Avatar from "./Avatar";
import TravelStyle from "./TravelStyle";

interface Props {
  userId: number;
}

export default function AvatarInfo({ userId }: Props) {
  //TODO: userId로 사용자 정보 가져오는 작업 필요
  return (
    <div className="flex w-full flex-row gap-1 items-center">
      <div className="flex items-center">
        <Avatar img="/logo192.png" size="s" />
        <span>이름</span>
      </div>
      <TravelStyle selectStyle="인생 사진형" />
    </div>
  );
}
