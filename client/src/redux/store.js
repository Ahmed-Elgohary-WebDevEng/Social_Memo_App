import {configureStore} from "@reduxjs/toolkit";
import postReducer from "./features/post/postSlice"
import authReducer from "./features/user/userSlice"

const store = configureStore({
   reducer: {
      post: postReducer,
      auth: authReducer
   }
})

export default store