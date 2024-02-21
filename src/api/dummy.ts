import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserProfile } from "../hooks/useUser";

export interface Data {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface SchedulePostData {
  userId: number;
  id: number;
  title: string;
}

export interface CommentData {
  userProfile: UserProfile;
  commentContent: string;
  commentCreatedTime: string;
}

export const api = createApi({
  reducerPath: "posts",
  // highlight-end
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    // TODO: 실제 데이터가 오면 배열로 바꿀것 : PostData[]
    getPosts: builder.query<PostData, number>({
      query: (page) => `posts/${page}`,
    }),
    getPost: builder.query<PostData, number>({
      query: (postId) => `posts/${postId}`,
    }),
    getComments: builder.query<CommentData[], number>({
      query: (postId) => `comments?postId=${postId}`,
    }),
    addComments: builder.mutation<void, CommentData>({
      query: (comment) => ({
        url: "posts",
        method: "post",
        body: {
          title: "foo",
          body: "bar",
          userId: 1,
        },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),

      // onQueryStarted: async (
      //   { postId, ...patch },
      //   { dispatch, queryFulfilled }
      // ) => {
      //   const patchResult = dispatch(
      //     api.util.updateQueryData("getComments", postId, (draft) => {
      //       // Object.assign(draft, patch);

      //       draft.unshift({
      //         id: patch.id,
      //         body: patch.body,
      //         email: patch.email,
      //         name: patch.name,
      //         postId: postId,
      //       });
      //     })
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
  }),
});

export const {
  useGetPostsQuery,
  useGetCommentsQuery,
  useAddCommentsMutation,
  useGetPostQuery,
} = api;
