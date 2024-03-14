import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserProfile } from "../hooks/useUser";
import { HOST } from "../constants";
import { getLoginToken } from "../services/storage";
import { formatDate, formatTime } from "../utils/dataFormat";
import { PostTypes } from "../hooks/useLike";

export interface CommentData {
  userProfile: UserProfile;
  commentContent: string;
  commentCreatedTime: string;
  commentId: number;
  isUserCreated: boolean;
}

export interface ResponseComment {
  totalPages: number;
  pageNumber: number;
}

export interface ResponseRecordComments extends ResponseComment {
  recordComments: CommentData[];
}

export interface ResponseScheduleComments extends ResponseComment {
  scheduleComments: CommentData[];
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
      ResponseScheduleComments | ResponseRecordComments,
      { recordId: number; page: number; type: PostTypes }
    >({
      query: ({ page, recordId, type }) =>
        `${type}/${recordId}/comments?page=${page}`,
    }),

    addComments: builder.mutation<
      void,
      { content: string; user: UserProfile; recordId: number; type: PostTypes }
    >({
      query: ({ recordId, content, type }) => {
        const body =
          type === "records" ? { commentContent: content } : { content };
        return {
          url: `${type}/${recordId}/comments`,
          method: "post",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        };
      },

      // onQueryStarted: async ({ ...patch }, { dispatch, queryFulfilled }) => {
      //   console.log("onQueryStarted");
      //   const patchResult = dispatch(
      //     commentApi.util.updateQueryData(
      //       "getComments2",
      //       { page: 0, recordId: patch.recordId },
      //       (draft) => {
      //         // Object.assign(draft, patch);
      //         draft.recordComments.unshift({
      //           commentContent: patch.content,
      //           commentCreatedTime: formatTime(new Date()),
      //           userProfile: patch.user,
      //           commentId: Math.random(),
      //         });
      //       }
      //     )
      //   );

      //   try {
      //     console.log("시도");

      //     await queryFulfilled;
      //   } catch {
      //     console.log("실패");

      //     patchResult.undo();
      //   }
      // },
    }),
    editComment: builder.mutation<
      { message: string },
      { commentId: number; commentContent: string; type: PostTypes }
    >({
      query: ({ commentId, commentContent, type }) => {
        const body =
          type === "records"
            ? { commentContent: commentContent }
            : { content: commentContent };
        return {
          url: `${type}/comments/${commentId}`,
          method: "PATCH",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),

    deleteComment: builder.mutation<
      { message: string },
      { commentId: number; type: PostTypes }
    >({
      query: ({ commentId, type }) => ({
        url: `${type}/comments/${commentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetComments2Query,
  useAddCommentsMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
