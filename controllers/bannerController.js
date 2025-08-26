import Banner from "../models/Banner.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// export const addBanner = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: "banners",
//       resource_type: "image",
//     });

//     // Remove file from local storage
//     fs.unlinkSync(req.file.path);

//     const { redirectUrl, title } = req.body;

//     const newBanner = await Banner.create({
//       imageUrl: result.secure_url,
//       redirectUrl: redirectUrl || null,
//       title,
//     });

//     res.status(201).json({
//       message: "Banner added successfully",
//       banner: newBanner,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to add banner",
//       error: error.message,
//     });
//   }
// };

// getBanner


export const addBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { title, redirectUrl } = req.body;

    // Upload directly from memory using buffer
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "banners",
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(req.file.buffer); // buffer, not path
    });

    // Save banner to DB
    const newBanner = await Banner.create({
      imageUrl: result.secure_url,
      redirectUrl: redirectUrl || null,
      title,
    });

    res.status(201).json({
      message: "Banner added successfully",
      banner: newBanner,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add banner",
      error: error.message,
    });
  }
};

export const getbanner = async (req, res) => {
  try {
    const banners = await Banner.find();
    if (!banners) {
      res.status(404).json({ message: "Banners not found" });
    }

    res.status(201).json({
      message: "Banners fetched Successfully",
      total: banners.length,
      banners: banners,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in getting Banners!", error: error.message });
  }
};


// export const updateBanner = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Check if banner exists
//     const findBanner = await Banner.findById(id);
//     if (!findBanner) {
//       return res.status(404).json({ message: "Banner not found" });
//     }

//     let updateData = { ...req.body };

//     //  If image file is provided, upload to Cloudinary
//     if (req.file) {
//       const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
//         folder: "banners",
//         resource_type: "image",
//       });

//       // Add new image URL to updateData
//       updateData.imageUrl = uploadedImage.secure_url;

//       // Delete local temp file
//       fs.unlinkSync(req.file.path);
//     }

//     //  Now update the banner
//     const updatedBanner = await Banner.findByIdAndUpdate(id, updateData, {
//       new: true,
//       runValidators: true,
//     });

//     res.status(200).json({
//       message: "Banner updated successfully",
//       updatedBanner,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error updating banner",
//       error: error.message,
//     });
//   }
// };


// delete banner

export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Check if banner exists
    const findBanner = await Banner.findById(id);
    if (!findBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    let updateData = { ...req.body };

    // 2. Handle image upload
    if (req.file) {
      const uploadedImage = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "banners",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        stream.end(req.file.buffer); // Upload from buffer
      });

      updateData.imageUrl = uploadedImage.secure_url;
    }

    // 3. Update the banner in DB
    const updatedBanner = await Banner.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Banner updated successfully",
      updatedBanner,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating banner",
      error: error.message,
    });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBanner = await Banner.findByIdAndDelete(id);

    if (!deletedBanner) {
      res.status(404).json({ message: "Banner not deleted" });
    }

    res.status(201).json({
      message: "Banner deleted Successfully",
      deletedBanner: deletedBanner,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in Deleting the banner", error: error.message });
  }
};

