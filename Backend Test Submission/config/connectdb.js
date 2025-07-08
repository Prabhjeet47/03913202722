import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async () => {
  mongoose
    .connect(process.env.MONGOURL)
    .then(() => {
      console.log("db connected successfully");
    })
    .then((err) => {
      console.log(err);
    });
};
