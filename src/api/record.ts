import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLoginToken } from "../services/storage";
import { Record, ResponseRecords } from "./records";
import { CommentData } from "./comment";
import { RecordData } from "../components/MyRecord";

export interface recordData {
  recordTitle: string;
  recordContent: string;
  startDate: string;
  endDate: string;
  recordImages?: File[];
  placeIds: string[];
}

export interface Place {
  placeId?: number;
  placeCountry: string;
  placeName: string;
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
    getMyRecords: builder.query<RecordData, number>({
      query: (pageNumber) => `users/records?page=${pageNumber}`,
    }),
    deleteRecordDetail: builder.mutation<void, number>({
      query: (recordId: number) => {
        return {
          url: `records/${recordId}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useSetRecordMutation,
  useGetRecordQuery,
  useGetMyRecordsQuery,
  useDeleteRecordDetailMutation,
} = recordApi;
