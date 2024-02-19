import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserProfile } from "../hooks/useUser";
import { HOST } from "../constants";

export interface Place {
  placeId: number;
  countryName: string;
  placeName: string;
}

export interface ResponseImage {
  recordImageId: number;
  recordImageUrl: string;
}

export interface Record {
  recordUserProfile: UserProfile;
  recordPlaces: Place[];
  recordId: number;
  recordTitle: string;
  recordContent: string;
  tripStartDate: string;
  tripEndDate: string;
  recordImages: ResponseImage[];
  isUserLiked: boolean;
  likeCount: number;
  commentCount: number;
}

export interface ResponseRecords {
  totalPages: number;
  pageNumber: string;
  recordList: Record[];
}

export const recordApi = createApi({
  reducerPath: "records",
  // highlight-end
  baseQuery: fetchBaseQuery({
    baseUrl: HOST,
  }),
  endpoints: (builder) => ({
    getRecords: builder.query<ResponseRecords, { page: number; size: number }>({
      query: ({ page, size }) => `records?page=${page}&size=${size}`,
    }),
  }),
});

export const { useGetRecordsQuery } = recordApi;
