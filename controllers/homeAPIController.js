import Banner from "../models/Banner.js";
import Product from "../models/Product.js";
import Category from "../models/ProductCategory.js";

export const getHomeData = async (req, res) => {
  try {
    
    const banners = await Banner.find().select("title imageUrl redirectUrl");
    const categories = await Category.find().select("name imageUrl");

    // Sectioned products
    const featuredProducts = await Product.find({ isFeatured: true }).select(
      "name price imageUrl description isFeatured isBestSeller isTrending isNewArrival"
    );

    const bestSellers = await Product.find({ isBestSeller: true }).select(
      "name price imageUrl description isFeatured isBestSeller isTrending isNewArrival"
    );

    const newArrivals = await Product.find({ isNewArrival: true }).select(
      "name price imageUrl description isFeatured isBestSeller isTrending isNewArrival"
    );

    res.status(200).json({
      success: true,
      message: "Home API fetched successfully",
      data: {
        banners: banners.map((b) => ({
          id: b._id,
          title: b.title,
          imageUrl: b.imageUrl,
          redirectUrl: b.redirectUrl || null,
        })),
        categories: categories.map((c) => ({
          id: c._id,
          name: c.name,
          imageUrl: c.imageUrl,
        })),
        sections: [
          {
            title: "Featured Products",
            products: featuredProducts.map((p) => ({
              id: p._id,
              name: p.name,
              price: p.price,
              imageUrl: p.imageUrl,
              description: p.description,
              isFeatured: p.isFeatured,
              isBestSeller: p.isBestSeller,
              isTrending: p.isTrending,
              isNewArrival: p.isNewArrival,
            })),
          },
          {
            title: "Best Sellers",
            products: bestSellers.map((p) => ({
              id: p._id,
              name: p.name,
              price: p.price,
              imageUrl: p.imageUrl,
              description: p.description,
              isFeatured: p.isFeatured,
              isBestSeller: p.isBestSeller,
              isTrending: p.isTrending,
              isNewArrival: p.isNewArrival,
            })),
          },
          {
            title: "New Arrivals",
            products: newArrivals.map((p) => ({
              id: p._id,
              name: p.name,
              price: p.price,
              imageUrl: p.imageUrl,
              description: p.description,
              isFeatured: p.isFeatured,
              isBestSeller: p.isBestSeller,
              isTrending: p.isTrending,
              isNewArrival: p.isNewArrival,
            })),
          },
        ],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching home data",
      error: error.message,
    });
  }
};
