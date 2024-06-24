import { configureStore } from "@reduxjs/toolkit";
// Import your slices here
import user from "./user";

const store = configureStore({
  reducer: {
    user,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
