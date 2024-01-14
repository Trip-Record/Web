import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export interface CommentData {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
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
    getComments: builder.query<CommentData[], number>({
      query: (postId) => `comments?postId=${postId}`,
    }),
    addComments: builder.mutation<
      void,
      Pick<CommentData, "id"> & Partial<CommentData>
    >({
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

      onQueryStarted: async (
        { id, ...patch },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          api.util.updateQueryData("getComments", id, (draft) => {
            // Object.assign(draft, patch);

            draft.push({
              id,
              body: patch.body ?? "",
              email: patch.email ?? "",
              name: patch.name ?? "",
              postId: patch.postId ?? 0,
            });
          })
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

export const { useGetPostsQuery, useGetCommentsQuery, useAddCommentsMutation } =
  api;
