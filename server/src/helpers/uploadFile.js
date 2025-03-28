import { v2 as cloudinary } from "cloudinary";
import config from "../config/config.js";

cloudinary.config({
  cloud_name: config.cloudinary.name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const uploadFile = async (file) => {
  try {
    const fileBuffer = file?.buffer?.toString("base64");
    const response = await cloudinary.uploader.upload(
      `data:${file?.mimetype};base64,${fileBuffer}`,
      {
        folder: "kilimboga",
        resource_type: "auto",
      }
    );
    return response.secure_url;
  } catch (error) {
    throw error;
  }
};

export default uploadFile;
