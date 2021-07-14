import { createSlice, configureStore } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogList: [],
    isLoading: true,
  },
  reducers: {
    updateBlogs(state, action) {
      state.blogList = [...action.payload];
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

const store = configureStore({
  reducer: blogSlice.reducer,
});

export const blogActions = blogSlice.actions;

export default store;
//  blogList: [
//       {
//         id: "1",
//         title: "Some random blog post",
//         author: "Mike Stanley",
//         image:
//           "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
//         description: {
//           description1:
//             "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis quas labore sapiente velit molestias quibusdam repellendus eaque porro distinctio, quos inventore at veritatis recusandae expedita dicta aut eum, dolor veniam magni et saepe assumenda. Eius explicabo nulla iure molestiae, quis dolorum sint cumque laborum? Unde tempora deserunt amet natus quasi nihil ea, repellat aut sint ullam aliquid sapiente magni illum quisquam eius culpa provident harum et voluptate! Corrupti maxime inventore repellat, vel vitae assumenda expedita dicta! Voluptas cupiditate fugiat quis ullam, ea dolorem exercitationem recusandae adipisci eum doloremque minima facere laborum doloribus eaque, voluptatem minus, illo aliquid illum consequuntur modi.",
//           description2:
//             "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis quas labore sapiente velit molestias quibusdam repellendus eaque porro distinctio, quos inventore at veritatis recusandae expedita dicta aut eum, dolor veniam magni et saepe assumenda. Eius explicabo nulla iure molestiae, quis dolorum sint cumque laborum? Unde tempora deserunt amet natus quasi nihil ea, repellat aut sint ullam aliquid sapiente magni illum quisquam eius culpa provident harum et voluptate! Corrupti maxime inventore repellat, vel vitae assumenda expedita dicta! Voluptas cupiditate fugiat quis ullam, ea dolorem exercitationem recusandae adipisci eum doloremque minima facere laborum doloribus eaque, voluptatem minus, illo aliquid illum consequuntur modi.",
//         },
//         date: "20/8/2021",
//       },
//       {
//         id: "2",
//         title: "Some random blog post",
//         author: "Mike Stanley",
//         image:
//           "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
//         description: {
//           description1: "some description",
//         },
//         date: "20/8/2021",
//       },
//       {
//         id: "3",
//         title: "Some random blog post",
//         author: "Stan Stanley",
//         image:
//           "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
//         description: {
//           description1:
//             "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis quas labore sapiente velit molestias quibusdam repellendus eaque porro distinctio, quos inventore at veritatis recusandae expedita dicta aut eum, dolor veniam magni et saepe assumenda. Eius explicabo nulla iure molestiae, quis dolorum sint cumque laborum? Unde tempora deserunt amet natus quasi nihil ea, repellat aut sint ullam aliquid sapiente magni illum quisquam eius culpa provident harum et voluptate! Corrupti maxime inventore repellat, vel vitae assumenda expedita dicta! Voluptas cupiditate fugiat quis ullam, ea dolorem exercitationem recusandae adipisci eum doloremque minima facere laborum doloribus eaque, voluptatem minus, illo aliquid illum consequuntur modi.",
//           description2:
//             "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis quas labore sapiente velit molestias quibusdam repellendus eaque porro distinctio, quos inventore at veritatis recusandae expedita dicta aut eum, dolor veniam magni et saepe assumenda. Eius explicabo nulla iure molestiae, quis dolorum sint cumque laborum? Unde tempora deserunt amet natus quasi nihil ea, repellat aut sint ullam aliquid sapiente magni illum quisquam eius culpa provident harum et voluptate! Corrupti maxime inventore repellat, vel vitae assumenda expedita dicta! Voluptas cupiditate fugiat quis ullam, ea dolorem exercitationem recusandae adipisci eum doloremque minima facere laborum doloribus eaque, voluptatem minus, illo aliquid illum consequuntur modi.",
//         },
//         date: "20/8/2021",
//       },
//     ],
