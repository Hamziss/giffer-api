import express from "express";
import { User } from "./schema.js";
const router = express.Router()

const addUser = async (user) => {
  const newUser = new User(user);
  const added = await newUser.save();
  if (!added) throw new Error('Todo not added');
  return added._doc;
};

router.post("/", async (req, res) => {
  const user = req.body;
  const exist = await User.findOne({ avatar: user.avatar });
  if (exist) return res.json(exist);
  const added = await addUser(user);
  res.status(200).json(added);

})
router.delete("/deleteAll", async (req, res) => {
  const deleted = await User.deleteMany({});
  res.status(200).json(deleted);

})
export default router