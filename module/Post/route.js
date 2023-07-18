import express from "express"
import { User } from "../User/schema.js"
import { Post } from "./schema.js"

const router = express.Router()

router.get("/", async (req, res) => {
  const Posts = await Post.find({}).sort({ createdAt: -1 }).populate("user")
  res.status(200).json(Posts)

})

const addPost = async (post) => {
  const newPost = new Post(post);
  const added = await newPost.save();
  if (!added) throw new Error('post not added');
  return added._doc;
};

router.post("/add", async (req, res) => {
  const Post = req.body;
  try {
    const added = await addPost(Post);
    res.status(200).json(added);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "error in the controller" });
  }

})

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userPosts = await Post.find({ user: id }).sort({ createdAt: -1 }).populate("user")
    const user = await User.findById(id)
    if (!userPosts) return res.status(404).json({ message: "No Posts" });
    return res.status(200).json({ userPosts, user });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error in the controller" });
  }
})

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await Post.findByIdAndDelete(id);
  if (!deleted) throw new Error('Todo not deleted');
  res.status(200).json(deleted);
})



export default router