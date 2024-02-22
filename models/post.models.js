import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  post: {
    type: String
  },
  image:{
    type: String
  }
},{timestamps:true,})

const PostModel = mongoose.model('post',PostSchema)

export default PostModel