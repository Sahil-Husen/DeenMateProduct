import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
await  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("DataBase Connected Successfully");
    })
    .catch((error) => console.log(error));
};

export default connectDB;