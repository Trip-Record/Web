import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLoginToken } from "../services/storage";
import { Record, ResponseRecords } from "./records";
import { CommentData } from "./dummy";

export interface recordData {
  recordTitle: string;
  recordContent: string;
  startDate: string;
  endDate: string;
  recordImages?: File[];
  placeIds: string[];
}

export interface ResponseComment {
  totalPages: number;
  pageNumber: number;
  recordComments: CommentData[];
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
    getComments2: builder.query<
      ResponseComment,
      { recordId: number; page: number }
    >({
      query: ({ page, recordId }) =>
        `records/${recordId}/comments?page=${page}`,
    }),
    getMyRecords: builder.query<ResponseRecords, void>({
      query: () => `users/records/`,
    }),
  }),
});

export const {
  useSetRecordMutation,
  useGetRecordQuery,
  useGetComments2Query,
  useGetMyRecordsQuery,
} = recordApi;
