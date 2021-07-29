import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogList: [],
    isLoading: true,
    searchedBlog: [],
  },
  reducers: {
    updateBlogs(state, action) {
      state.blogList = [...action.payload];
    },
    updateSearchedBlogs(state, action) {
      state.searchedBlog = [...action.payload];
    },
    toggleLoading(state) {
      state.isLoading = !state.isLoading;
    },
    addBlog(state, action) {
      const newBlog = action.payload;
      state.blogList.unshift(newBlog);
    },
    removeBlog(state, action) {
      const id = action.payload;
      state.blogList = state.blogList.filter((blog) => blog.id !== id);
    },
  },
});

export const blogActions = blogSlice.actions;

export default blogSlice.reducer;
