import {createSlice} from "@reduxjs/toolkit";
import {createPost, deletePost, getOnePost, getPosts, getPostsBySearch, likePost, updatePost} from "./thunks/postThunk";

const initState = {
   posts: [],
   post: null,
   currentPage: null,
   numberOfPages: null
}

const postSlice = createSlice({
   name: "post",
   initialState: initState,
   extraReducers: {
      // Fetch all posts
      [getPosts.pending]: (state) => {
         state.loading = true
      },
      [getPosts.fulfilled]: (state, action) => {
         state.loading = false
         state.posts = action.payload.data
         state.currentPage = action.payload.currentPage
         state.numberOfPages = action.payload.numberOfPages

      },
      [getPosts.rejected]: (state) => {
         state.loading = false
      },
      // Fetch One posts
      [getOnePost.pending]: (state) => {
         state.loading = true
      },
      [getOnePost.fulfilled]: (state, action) => {
         state.loading = false
         state.post = action.payload

      },
      [getOnePost.rejected]: (state) => {
         state.loading = false
      },
      // Fetch all posts By Search
      [getPostsBySearch.pending]: (state) => {
         state.loading = true
      },
      [getPostsBySearch.fulfilled]: (state, action) => {
         state.loading = false
         state.posts = action.payload

      },
      [getPostsBySearch.rejected]: (state) => {
         state.loading = false
      },
      // Create Post
      [createPost.pending]: (state) => {
         state.loading = true
      },
      [createPost.fulfilled]: (state, action) => {
         state.loading = false
         state.posts = [...state.posts, action.payload]
      },
      [createPost.rejected]: (state) => {
         state.loading = false
      },
      // Update Post
      [updatePost.pending]: (state) => {
         state.loading = true
      },
      [updatePost.fulfilled]: (state, action) => {
         state.loading = false
         state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
      },
      [updatePost.rejected]: (state) => {
         state.loading = false
      },
      // Delete post
      [deletePost.pending]: (state) => {
         state.loading = true
      },
      [deletePost.fulfilled]: (state, action) => {
         state.loading = false
         state.posts = state.posts.filter(post => post._id !== action.payload)
      },
      [deletePost.rejected]: (state) => {
         state.loading = false
      },
      // Like Post
      [likePost.pending]: (state) => {
         state.loading = true
      },
      [likePost.fulfilled]: (state, action) => {
         state.loading = false
         state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
      },
      [likePost.rejected]: (state) => {
         state.loading = false
      },
   }
})

// Export Reducers
export default postSlice.reducer