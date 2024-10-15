import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
  name: "videoMetadata",
  initialState: {
    metadata: {},
  },
  reducers: {
    setVideo: (state, action) => {
      state.metadata = action.payload;
    },
  },
});

export const { setVideo } = videoSlice.actions;
export default videoSlice.reducer;