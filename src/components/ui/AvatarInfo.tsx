import { UserProfile } from "../../hooks/useUser";
import Avatar from "./Avatar";
import TravelStyle from "./TravelStyle";

interface Props {
  userProfile: UserProfile;
  userId?: number;
}

export default function AvatarInfo({ userProfile }: Props) {
  const { userNickname, userProfileImg, userTripStyleName } = userProfile;

  return (
    <div className="flex w-full flex-row gap-1 items-center">
      <div className="flex items-center gap-1">
        <Avatar img={userProfileImg} size="s" />
        <span>{userNickname}</span>
      </div>
      {userTripStyleName && <TravelStyle selectStyle={userTripStyleName} />}
    </div>
  );
}
