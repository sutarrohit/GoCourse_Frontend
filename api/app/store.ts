import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import stateVariableReducer from "../feature/stateVariable";
import { courseAPI } from "../services/courseAPI";
import { userAPI } from "../services/userAPI";
import authSlice from "../feature/authSlice";

export const store = configureStore({
  reducer: {
    stateVariable: stateVariableReducer,
    userAuth: authSlice,
    [courseAPI.reducerPath]: courseAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(courseAPI.middleware, userAPI.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
