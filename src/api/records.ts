import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserProfile } from "../hooks/useUser";
import { HOST } from "../constants";
import { getLoginToken } from "../services/storage";

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
  isUserCreated: boolean;
}

export interface ResponseRecords {
  totalPages: number;
  pageNumber: string;
  recordList: Record[];
}

export const recordsApi = createApi({
  reducerPath: "records",
  // highlight-end
  baseQuery: fetchBaseQuery({
    baseUrl: HOST,
    prepareHeaders: (headers, { getState }) => {
      const token = getLoginToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getRecords: builder.query<ResponseRecords, { page: number; size: number }>({
      query: ({ page, size }) => `records?page=${page}&size=${size}`,
    }),
  }),
});

export const { useGetRecordsQuery } = recordsApi;
