import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  addProduct,
  getCategoryProduct,
  getProductById,
  editProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/addProduct", upload.single("image"), addProduct);
router.get("/getCategoryWiseProduct", getCategoryProduct);
router.get("/getProduct:id", getProductById);
router.put("/updateProduct/:id", editProduct);
router.delete("/deleteProduct/:id", deleteProduct);

export default router;
