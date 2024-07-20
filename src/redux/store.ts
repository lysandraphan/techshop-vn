import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// internal
import categoriesReducer from "./features/categories-slice";
import bannersReducer from "./features/banners-slice";
import filterReducer from "./features/filter-slice";
import sortReducer from "./features/sort-slice";
import brandsReducer from "./features/brands-slice";
import userReducer from "./features/user-slice";
import customStorage from "./storage";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  banners: bannersReducer,
  filter: filterReducer,
  sort: sortReducer,
  brands: brandsReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage: customStorage,
  whitelist: ["categories", "banners", "brands", "user"],
};

//
/**
 * Create a store instance per-request
 * Don't need persistence on the server side
 */
export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    let store = configureStore({
      reducer: rootReducer,
      devTools: process.env.NODE_ENV !== "production",
    });
    return store;
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store: any = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
      devTools: process.env.NODE_ENV !== "production",
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
