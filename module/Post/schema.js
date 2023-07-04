import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
  url: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
}, { timestamps: true })

export const Post = mongoose.model("Post", PostSchema)