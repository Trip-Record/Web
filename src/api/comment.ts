import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserProfile } from "../hooks/useUser";
import { HOST } from "../constants";
import { getLoginToken } from "../services/storage";
import { formatDate, formatTime } from "../utils/dataFormat";

export interface CommentData {
  userProfile: UserProfile;
  commentContent: string;
  commentCreatedTime: string;
}

export interface ResponseComment {
  totalPages: number;
  pageNumber: number;
  recordComments: CommentData[];
}

export const commentApi = createApi({
  reducerPath: "comment",
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
  endpoints: (builder) => ({
    getComments2: builder.query<
      ResponseComment,
      { recordId: number; page: number }
    >({
      query: ({ page, recordId }) =>
        `records/${recordId}/comments?page=${page}`,
    }),

    addComments: builder.mutation<
      void,
      { content: string; user: UserProfile; recordId: number }
    >({
      query: ({ recordId, content }) => ({
        url: `records/${recordId}/comments`,
        method: "post",
        body: JSON.stringify({ commentContent: content }),
        headers: {
          "Content-Type": "application/json",
        },
      }),

      onQueryStarted: async ({ ...patch }, { dispatch, queryFulfilled }) => {
        console.log("onQueryStarted");
        const patchResult = dispatch(
          commentApi.util.updateQueryData(
            "getComments2",
            { page: 0, recordId: patch.recordId },
            (draft) => {
              // Object.assign(draft, patch);
              draft.recordComments.unshift({
                commentContent: patch.content,
                commentCreatedTime: formatTime(new Date()),
                userProfile: patch.user,
              });
            }
          )
        );

        try {
          console.log("시도");

          await queryFulfilled;
        } catch {
          console.log("실패");

          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetComments2Query, useAddCommentsMutation } = commentApi;
