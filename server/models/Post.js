import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   message: {
      type: String,
      required: true
   },
   name: String,
   creator: String,
   tags: [String],
   selectedFile: String,
   likes: {
      type: [String],
      default: []
   },
   createdAt: {
      type: Date,
      default: new Date()
   }
})

const Post = mongoose.model('Post', postSchema)

export default Post

