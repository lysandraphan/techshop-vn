import { configureStore } from "@reduxjs/toolkit";

import categoriesReducer from "./features/categories-slice";

// Create a store instance per-request
export const makeStore = () => {
  return configureStore({
    reducer: {
      categories: categoriesReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
