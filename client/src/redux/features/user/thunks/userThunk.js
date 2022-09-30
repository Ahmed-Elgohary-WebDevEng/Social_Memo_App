import * as api from "../../../../api/index"
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signIn = createAsyncThunk(
    "users/signIn",
    async ({formData, navigate}, rejectWithValue) => {
       try {
          const response = await api.signIn(formData)

          navigate('/')
          return response.data
       } catch (error) {
          rejectWithValue(error.response.data)
       }
    }
)

export const signUp = createAsyncThunk(
    "users/signUp",
    async ({formData, navigate}, rejectWithValue) => {
       try {
          const response = await api.signUp(formData)

          navigate('/')
          return response.data
       } catch (error) {
          rejectWithValue(error)
       }
    }
)