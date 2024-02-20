import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLoginToken } from "../services/storage";
import { Record } from "./records";

export interface recordData {
  recordTitle: string;
  recordContent: string;
  startDate: string;
  endDate: string;
  recordImages?: File[];
  placeIds: string[];
}

export const recordApi = createApi({
  reducerPath: "record",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://15.164.19.143:8080",
    prepareHeaders: (headers, { getState }) => {
      const token = getLoginToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    setRecord: builder.mutation<void, FormData>({
      query: (formData: FormData) => {
        return {
          url: "/records",
          method: "POST",
          body: formData,
          formData: true,
        };
      },
    }),
    getRecord: builder.query<Record, number>({
      query: (recordId) => `records/${recordId}`,
    }),
  }),
});

export const { useSetRecordMutation, useGetRecordQuery } = recordApi;
