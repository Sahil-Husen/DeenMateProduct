import express, { urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import CategoryRoutes from "./routes/categoryRoutes.js";
import ProductRoutes from "./routes/productRoutes.js";

const app = express();
const port = process.env.PORT || 5050;

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/category", CategoryRoutes);
app.use("/api/product", ProductRoutes);

app
  .get("/", (req, res) => {
    res.send("Hello from Server");
  })
  .listen(port, () => {
    console.log(`Server is listening on ${port}`);
  });
