import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Data {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
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
  }),
});

export const { useGetTodosQuery } = api;
