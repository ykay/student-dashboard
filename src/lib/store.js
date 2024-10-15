import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "@/lib/features/videoSlice";

export const store = configureStore({
  reducer: {
    video: videoReducer,
  },
});