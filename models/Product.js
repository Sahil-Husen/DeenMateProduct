import mongoose, { Mongoose } from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    tags: [String],
    rating: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
    },
    isFeatured:{
      type:Boolean
    },
    isBestseller:{
      type:Boolean
    },
    isTrending:{
      type:Boolean
    },
    isNewArrival:{
      type:Boolean
    }

  },
  { timestamps: true }
);


export default mongoose.model("Product",ProductSchema);