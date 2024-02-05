import { useState } from "react";
import { getLoginToken } from "../services/storage";

export interface UserInfo {
  email: string;
  token: string;
}
export function useUser() {
  //   const [] = useState();
  const token = getLoginToken();
  return token;
}
