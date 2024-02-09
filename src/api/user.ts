import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLoginToken } from "../services/storage";
import { UserInfo } from "../hooks/useUser";

export const userApi = createApi({
  reducerPath: "user",
  // highlight-end
  baseQuery: fetchBaseQuery({
    baseUrl: "http://15.164.19.143:8080",
    // headers: { Authorization: `Bearer ${getLoginToken()}` },
    prepareHeaders: (headers, { getState }) => {
      const token = getLoginToken();

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserInfo: builder.query<UserInfo, void>({
      query: () => `users/informations`,
    }),
  }),
});

export const { useGetUserInfoQuery } = userApi;
