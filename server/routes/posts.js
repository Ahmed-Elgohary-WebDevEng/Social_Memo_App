import express from "express";
import {
   createPost,
   deletePost, getOnePost,
   getPosts, getPostsBySearch, likePost,
   updatePost,
} from "../controllers/PostController.js";
import auth from "../middleware/autn.js";

const router = express.Router();

// Posts Route
router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getOnePost)
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch('/:id/likePost', auth, likePost)

export default router;
