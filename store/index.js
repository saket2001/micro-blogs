import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import blogSlice from "./blog";

const store = configureStore({
  reducer: {
    auth: authSlice,
    blog: blogSlice,
  },
});

export default store;
