import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api/dummy";
import { userApi } from "./api/user";
import { recordApi } from "./api/record";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [recordApi.reducerPath]: recordApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(userApi.middleware)
      .concat(recordApi.middleware),
  // getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);
