import ProductCategory from "../models/ProductCategory.js";
import mongoose from "mongoose";

export const addCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const category = await ProductCategory.create({ name, description });
    res.status(201).json({ message: "Category Added ", category: category });
  } catch (error) {
    console.log("error :", error);
    res.status(500).json({ message: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await ProductCategory.find();
    res.status(201).json({ total: category.length, category });
  } catch (error) {
    console.log("error :", error);
    res
      .status(500)
      .json({ message: "Error in fetching Category", error: error.message });
  }
};
