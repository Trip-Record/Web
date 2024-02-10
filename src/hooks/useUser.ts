import { useEffect, useState } from "react";
import { getLoginToken, setLoginToken } from "../services/storage";
import { HOST } from "../constants";
import { useGetUserInfoQuery } from "../api/user";

export interface UserProfile {
  userNickname: string;
  userProfileImg: string;
  userTripStyleImg: string;
  userTripStyleName: string;
}
export interface UserInfo {
  likeTotal: number;
  placeTotal: number;
  recordTotal: number;
  scheduleTotal: number;
  userProfile: UserProfile;
}

export interface UserInfoWithToken extends UserInfo {
  token: string | null;
}

// 1. 토큰이 있는지 확인
//1-1. 토큰이 없다면 null 리턴
//  1-2. 토큰이 있다면 서버에서 유저데이터 받아오기
// 2. 유저데이터 리턴
// 3. 만약 만료된 토큰이며 에러라면 토큰삭제(로그아웃과 같은 프로세스)
export function useUser(): {
  user: UserInfoWithToken | null;
  logout: () => void;
} {
  // const [user, setUser] = useState<UserInfoWithToken | null>(null);
  const token = getLoginToken();
  const { data } = useGetUserInfoQuery(undefined, { skip: !token });
  const logout = () => {
    setLoginToken("");
    window.location.reload();
  };

  const user = data ? { ...data, token } : null;
  return { logout, user };
}
