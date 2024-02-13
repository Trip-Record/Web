import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api/dummy";
import { userApi } from "./api/user";
import { scheduleApi } from "./api/schedule";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(userApi.middleware)
      .concat(scheduleApi.middleware),
  // getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);
