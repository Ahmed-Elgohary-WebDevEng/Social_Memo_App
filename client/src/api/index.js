import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" })
// Code --> to enable middleware
API.interceptors.request.use((req) => {
   if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
   }

   return req
})

// ******** Posts API *********
export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchOnePost = (id) => API.get(`/posts/${id}`)
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post("/posts", newPost)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

// ******** Users API *********
export const signIn = (formData) => API.post("/users/signIn", formData)
export const signUp = (formData) => API.post("/users/signUp", formData)