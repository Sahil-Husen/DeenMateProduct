import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// Add product
export const addProduct = async (req, res) => {
  // const {
  //   name,
  //   description,
  //   category,
  //   price,
  //   imageUrl,
  //   inStock,
  //   tags,
  //   rating,
  //   isFeatured,
  //   isBestseller,
  //   isTrending,
  //   isNewArrival,
  // } = req.body;

  // try {
  //   const product = await Product.create({
  //     name,
  //     description,
  //     category,
  //     price,
  //     imageUrl,
  //     inStock,
  //     tags,
  //     rating,
  //     isFeatured,
  //     isBestseller,
  //     isTrending,
  //     isNewArrival,
  //   });

  //   res
  //     .status(201)
  //     .json({ message: "Products added Successfully ", product: product });
  // } catch (error) {
  //   console.log("error: ", error);
  //   res
  //     .status(500)
  //     .json({ message: "error in Adding Product ", error: error.message });
  // }

  try {
    let imageUrl = " ";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
        folder: "products.image",
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    } else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    } else {
      res.status(404).json({ message: "Image is required and not Uploaded" });
    }

    const newProduct = await Product.create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      imageUrl: imageUrl,
      description: req.body.description,
      isFeatured: req.body.isFeatured,
      isBestseller: req.body.isBestseller,
      isTrending: req.body.isTrending,
      isNewArrival: req.body.isNewArrival,
      inStock: req.body.inStock,
      tags: req.body.tags,
      rating: req.body.rating,
    });

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Sever Error in Adding Product ",
      error: error.message,
    });
  }
};

// get Categorywise Product

export const getCategoryProduct = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category") // ensure this matches your schema
      .lean();

    res.status(200).json({
      message: "Category-wise products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("Error fetching category-wise products:", error);
    res.status(500).json({
      message: "Error in fetching category-wise products",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params.id;
  try {
    const product = await Product.find({ id });
    res
      .status(201)
      .json({ messge: "Product fetched by id ", product: product });
  } catch (error) {
    console.log("error :", error);
    res.status(500).json({
      message: "error in fetching product by ID",
      error: error.message,
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not Found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res
      .status(201)
      .json({ message: "Product updated Successfully ", data: updatedProduct });
  } catch (error) {
    console.log("error ", error);
    res
      .status(500)
      .json({ message: "error in editing the product", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) {
      res.status(404).json({ message: "Product not found " });
    }

    res
      .status(200)
      .json({ message: "Product deleted Successfully", data: deleteProduct });
  } catch (error) {
    console.log("Error in Deleting the Product", error);
    res
      .status(500)
      .json({ message: "error in deleting the product", error: error.message });
  }
};
