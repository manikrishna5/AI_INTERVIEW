import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadToCloudinary = (
  fileBuffer,
  fileName
) => {
  return new Promise(
    (resolve, reject) => {
      const stream =
        cloudinary.uploader.upload_stream(
          {
            folder: "ai-interview-copilot",
            resource_type: "auto",
            public_id: fileName,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

      streamifier
        .createReadStream(fileBuffer)
        .pipe(stream);
    }
  );
};

export default uploadToCloudinary;