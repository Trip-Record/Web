import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api/dummy";
import { userApi } from "./api/user";
import { recordsApi } from "./api/records";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [recordsApi.reducerPath]: recordsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(userApi.middleware)
      .concat(recordsApi.middleware),
  // getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);
