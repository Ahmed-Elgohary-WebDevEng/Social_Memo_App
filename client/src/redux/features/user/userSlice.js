import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "./thunks/userThunk";

const initialState = {
   authData: null
}
const userSlice = createSlice({
   name: 'auth',
   initialState: initialState,
   reducers: {
      auth: (state, action) => {
         localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
         state.authData = { ...action.payload }
      },
      logout: (state) => {
         localStorage.clear()
         state.authData = null
      }
   },
   extraReducers: {
      [signIn.pending]: (state) => {
         state.loading = true
      },
      [signIn.fulfilled]: (state, action) => {
         state.loading = false
         localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
         state.authData = {... action.payload}
      },
      [signIn.rejected]: (state) => {
         state.loading = false
      },
      [signUp.pending]: (state) => {
         state.loading = true
      },
      [signUp.fulfilled]: (state, action) => {
         state.loading = false
         localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
         state.authData = {... action.payload}
      },
      [signUp.rejected]: (state) => {
         state.loading = false
      },
   }
})

export default userSlice.reducer;

export const { auth, logout } = userSlice.actions