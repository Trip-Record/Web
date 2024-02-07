import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "user",
  // highlight-end
  baseQuery: fetchBaseQuery({
    baseUrl: "http://15.164.19.143:8080",
  }),
  endpoints: (builder) => ({
    getUserInfo: builder.query<any, void>({
      query: () => `users/informations`,
    }),
  }),
});

export const { useGetUserInfoQuery } = api;
