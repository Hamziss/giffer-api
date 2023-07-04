import express from "express"
import { Post } from "./schema.js"

const router = express.Router()

router.get("/", async (req, res) => {
  const Posts = await Post.find({}).sort({ createdAt: -1 }).populate("user")
  res.status(200).json(Posts)

})

const addPost = async (animal) => {
  const newPost = new Post(animal);
  const added = await newPost.save();
  if (!added) throw new Error('Todo not added');
  return added._doc;
};
router.post("/add", async (req, res) => {
  const Post = req.body;
  console.log(Post)

  const added = await addPost(Post);
  console.log(added);
  res.status(200).json(added);
})

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await Post.findByIdAndDelete(id);
  if (!deleted) throw new Error('Todo not deleted');
  res.status(200).json(deleted);
})



export default router