import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import postRouter from './module/Post/route.js';
import userRouter from './module/User/route.js';
dotenv.config()
const app = express();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(bodyParser.json())
app.use(cors(
  {
    origin: "*"
  }
));

app.use("/posts", postRouter)
app.use("/auth", userRouter)

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from Express Server-based" })
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening at port :${process.env.PORT}`);
});