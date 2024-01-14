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
  reducerPath: "todos",
  // highlight-end
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    // ...endpoints
    getTodos: builder.query<Data[], void>({
      query: () => `todos`,
    }),
    // TODO: 실제 데이터가 오면 배열로 바꿀것 : PostData[]
    getPosts: builder.query<PostData, number>({
      query: (page) => `posts/${page}`,
    }),
    getComments: builder.query<CommentData[], number>({
      query: (postId) => `comments?postId=${postId}`,
    }),
  }),
});

export const { useGetTodosQuery, useGetPostsQuery, useGetCommentsQuery } = api;
