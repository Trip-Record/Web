import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLoginToken } from "../services/storage";

interface SchedulePosts {
  userProfile: number;
  placeTotal: number;
  recordTotal: number;
  scheduleTotal: number;
}

export const scheduleApi = createApi({
  reducerPath: "schedule",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://15.164.19.143:8080",
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
    getSchedulePosts: builder.query<any, any>({
      query: (pageNumber) => `schedules?page=${pageNumber}`,
    }),
  }),
});

export const { useGetSchedulePostsQuery } = scheduleApi;