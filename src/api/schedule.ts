import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLoginToken } from "../services/storage";
import { ScheduleData, SchedulePost } from "../components/SchedulePostCard";

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
    getSchedulePosts: builder.query<ScheduleData, number>({
      query: (pageNumber) => `schedules?page=${pageNumber}`,
    }),
    getScheduleDetail: builder.query<SchedulePost, string | undefined>({
      query: (scheduleId) => `schedules/${scheduleId}`,
    }),
  }),
});

export const { useGetSchedulePostsQuery, useGetScheduleDetailQuery } =
  scheduleApi;
