import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api/dummy";
import { userApi } from "./api/user";
import { scheduleApi } from "./api/schedule";
import { recordsApi } from "./api/records";
import { recordApi } from "./api/record";
import { commentApi } from "./api/comment";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [recordsApi.reducerPath]: recordsApi.reducer,
    [recordApi.reducerPath]: recordApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(userApi.middleware)
      .concat(scheduleApi.middleware)
      .concat(recordsApi.middleware)
      .concat(recordApi.middleware)
      .concat(commentApi.middleware),

  // getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);
