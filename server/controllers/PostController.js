import mongoose from "mongoose";
import Post from "../models/Post.js";
import Posts from "../routes/posts.js";

/**
 * @function {Get All Posts}
 * @param {*} req
 * @param {*} res
 */
export const getPosts = async (req, res) => {
   const {page} = req.query;


   try {
      const LIMIT = 8;
      const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

      const total = await Post.countDocuments({});


      const posts = await Post.find({}).sort({_id: -1}).limit(LIMIT).skip(startIndex);

      res.json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});

      // console.log(done)
   } catch (error) {
      res.status(404).json({message: error.message});
   }
};

export const getOnePost = async (req, res) => {
   const {id} = req.params

   try {
      const post = await Post.findById(id)

      res.status(200).json(post)
   } catch (error) {
      res.status(500).json({message: error.message})
   }
}

export const getPostsBySearch = async (req, res) => {
   const {searchQuery, tags} = req.query
   // prepare search title with insensitive case
   const title = new RegExp(searchQuery, 'i')
   try {
      const posts = await Post.find({$or: [{title}, {tags: {$in: tags.split(',')}}]})

      console.log(posts)

      res.status(200).json(posts)
   } catch (error) {
      res.status(404).json({message: error.message})
   }
}

/**
 * @function () => Create new post
 * @param {*} req
 * @param {*} res
 */
export const createPost = async (req, res) => {
   const post = req.body;

   const newPost = new Post({...post, creator: req.userId, createdAt: new Date().toISOString()});
   try {
      await newPost.save();

      res.status(201).json(newPost);
   } catch (error) {
      res.status(409).json({message: error.message});
   }
};

/**
 * @function () => Update specific post
 * @param {*} req
 * @param {*} res
 */
export const updatePost = async (req, res) => {
   const {id: _id} = req.params;
   const post = req.body;

   if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send({message: "No post with id"});
   }

   // Find the post and update it as a new post
   const updatedPost = await Post.findByIdAndUpdate(
       _id,
       {...post, _id},
       {new: true}
   );

   res.status(201).json(updatedPost);
};

/**
 * @function () => Update specific post
 * @param {*} req
 * @param {*} res
 */
export const deletePost = async (req, res) => {
   const {id} = req.params;

   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send({message: "No post with id"});
   }

   await Post.findByIdAndRemove(id);

   res.json({message: "Post deleted successfully"});
};

/**
 * @function () => Create new post
 * @param {*} req
 * @param {*} res
 */
export const likePost = async (req, res) => {
   const {id} = req.params

   //Check if the user is authenticated
   if (!req.userId) {
      return res.json({message: "Unauthenticated"})
   }

   // Check the validity of id
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send({message: "No post with id"});
   }

   const post = await Post.findById(id)

   // Get the like index of the array
   const index = post.likes.findIndex((id) => id === String(req.userId))

   if (index === -1) {
      // like the post
      post.likes.push(req.userId)
   } else {
      // Dislike the post
      post.likes = post.likes.filter(id => id !== String(req.userId))
   }

   const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true})

   res.json(updatedPost)
}
