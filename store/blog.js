import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogList: [],
    isLoading: true,
    searchedBlog: [],
    savedBlogs: [],
    UserBlogs: [],
  },
  reducers: {
    turnOffLoader(state, action) {
      state.isLoading = action.payload;
    },
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
    updateSavedBlogs(state, action) {
      state.savedBlogs = [...action.payload];
      console.log(state.savedBlogs);
    },
    updateUserBlogs(state, action) {
      state.UserBlogs = [...action.payload];
      console.log(state.UserBlogs);
    },
    saveToFavorites(state, action) {
      const b_id = action.payload;
      state.savedBlogs = state.blogList.filter((blog) => blog._id === b_id);
    },
  },
});

export const blogActions = blogSlice.actions;

export default blogSlice.reducer;
