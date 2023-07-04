import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  username: { type: String },
  avatar: { type: String },
  discordId: { type: String },
}, { timestamps: true })

export const User = mongoose.model("User", UserSchema)