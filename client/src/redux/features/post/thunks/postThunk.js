import * as api from "../../../../api/index"
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
    "post/getPosts",
    async (page, rejectWithValue) => {
       try {
          const {data} = await api.fetchPosts(page)

          return data
       } catch (error) {
          return rejectWithValue(error.response.data)
       }
    }
)

export const getOnePost = createAsyncThunk(
    "post/getOnePost",
    async (id, rejectWithValue) => {
       try {
          const response = await api.fetchOnePost(id)

          return response.data
       } catch (error) {
          return rejectWithValue(error.response.data)
       }
    }
)

export const getPostsBySearch = createAsyncThunk(
    "post/getPostsBySearch",
    async (searchQuery, rejectWithValue) => {
       try {
          const response = await api.fetchPostsBySearch(searchQuery)

          return response.data
       } catch (error) {
          return rejectWithValue(error.response.data)
       }
    }
)

export const createPost = createAsyncThunk(
    "post/createPost",
    async (post, rejectWithValue) => {
       try {
          const response = await api.createPost(post)

          return response.data
       } catch (error) {
          return rejectWithValue(error.response.data)
       }
    }
)


export const updatePost = createAsyncThunk(
    "post/updatePost",
    async ({id, post}, rejectWithValue) => {
       try {
          const response = await api.updatePost(id, post)

          return response.data
       } catch (error) {
          return rejectWithValue(error.response.data)
       }
    }
)

export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (id, rejectWithValue) => {
       try {
          const response = await api.deletePost(id)

          return response.data
       } catch (error) {
          return rejectWithValue(error.response.data)
       }
    }
)

export const likePost = createAsyncThunk(
    'post/likePost',
    async (id, rejectWithValue) => {
       try {
          const response = await api.likePost(id)

          return response.data
       } catch (error) {
          rejectWithValue(error.response.data)
       }
    }
)