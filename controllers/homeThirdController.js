import Banner from "../models/Banner.js";
import Product from "../models/Product.js";
import Category from "../models/ProductCategory.js";

//  Reusable product formatter
const formatProduct = (product) => ({
  id: product._id,
  name: product.name,
  price: product.price,
  imageUrl: product.imageUrl,
  description: product.description,
  category: product.category?.name || null,
  isFeatured: product.isFeatured,
  isBestSeller: product.isBestseller,
  isTrending: product.isTrending,
  isNewArrival: product.isNewArrival,
});

export const getHomeData = async (req, res) => {
  try {
    // Fetch all data
    const [products, categories, banners] = await Promise.all([
      Product.find().populate("category", "name"),
      Category.find().select("name imageUrl"),
      Banner.find().select("title imageUrl redirectUrl"),
    ]);

    // Filter for homepage sections
    const featuredProducts = products.filter(p => p.isFeatured);
    const trendingProducts = products.filter(p => p.isTrending);
    const bestsellerProducts = products.filter(p => p.isBestseller);
    const newArrivals = products.filter(p => p.isNewArrival);

    //  Final formatted response
    const response = {
      banners: banners.map(b => ({
        id: b._id,
        title: b.title,
        imageUrl: b.imageUrl,
        redirectUrl: b.redirectUrl || null,
      })),
      categories: categories.map(c => ({
        id: c._id,
        name: c.name,
        imageUrl: c.imageUrl,
      })),
      sections: [
        {
          title: "Featured Products",
          products: featuredProducts.map(formatProduct),
        },
        {
          title: "Trending Products",
          products: trendingProducts.map(formatProduct),
        },
        {
          title: "Best Sellers",
          products: bestsellerProducts.map(formatProduct),
        },
        {
          title: "New Arrivals",
          products: newArrivals.map(formatProduct),
        },
      ],
    };

    return res.status(200).json({
      success: true,
      message: "Home API fetched successfully",
      data: response,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching home data",
      error: process.env.NODE_ENV === "production" ? undefined : error.message,
    });
  }
};
