import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

console.log(
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET,
  "process"
);

const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log(localFilePath, "rlocalFilePath");

    if (!localFilePath) {
      return null;
    }
    // Upload file //"https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg" // image , raw , video

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    fs.unlinkSync(localFilePath);
    return null; // remove locally saved temp file as the upload operation got failed
  }
};

export { uploadOnCloudinary };
