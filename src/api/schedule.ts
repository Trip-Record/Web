import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLoginToken } from "../services/storage";
import { ScheduleData, SchedulePost } from "../components/SchedulePostCard";
import { MyScheduleData } from "../components/MySchedule";
import { HOST } from "../constants";

interface SchedulePatch {
  scheduleId: string;
  scheduleTitle: string;
  placeIds: number[];
  scheduleStartDate: string;
  scheduleEndDate: string;
  scheduleDetails: ScheduleDetail[];
}

interface ScheduleDetail {
  scheduleDetailDate: string;
  scheduleDetailContent: string;
}

export const scheduleApi = createApi({
  reducerPath: "schedule",
  baseQuery: fetchBaseQuery({
    baseUrl: `${HOST}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getLoginToken();

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getSchedulePosts: builder.query<ScheduleData, number>({
      query: (pageNumber) => `schedules?page=${pageNumber}`,
    }),
    getMySchedulePosts: builder.query<MyScheduleData, number>({
      query: (pageNumber) => `/users/schedules?page=${pageNumber}`,
    }),
    getScheduleDetail: builder.query<SchedulePost, string | undefined>({
      query: (scheduleId) => `schedules/${scheduleId}`,
    }),
    patchScheduleDetail: builder.mutation<void, SchedulePatch>({
      query: (schedulePatchData) => {
        return {
          url: `/schedules/${schedulePatchData.scheduleId}`,
          method: "PATCH",
          body: schedulePatchData,
        };
      },
    }),
    deleteScheduleDetail: builder.mutation<void, string>({
      query: (scheduleId: string) => {
        return {
          url: `/schedules/${scheduleId}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetSchedulePostsQuery,
  useGetMySchedulePostsQuery,
  useGetScheduleDetailQuery,
  usePatchScheduleDetailMutation,
  useDeleteScheduleDetailMutation,
} = scheduleApi;
