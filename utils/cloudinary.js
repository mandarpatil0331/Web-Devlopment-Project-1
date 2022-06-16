require("dotenv").config();
const Readable = require("stream").Readable;
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

let streamUpload = (buffer, lessonId) => {
    console.log(buffer);
  return new Promise((resolve, reject) => {
    let stream2 = cloudinary.uploader.upload_stream(
      {
        folder: "classroom2",
        resource_type: "video",
        public_id: `${Date.now()}-${lessonId}`,
        overwrite: true,
      },
      (error, result) => {
        if (result) {
          resolve (result);
        } else {
          reject( error);
        }
      }
    );
    let stream = new Readable();
    stream.push(buffer);
    stream.push(null)
    console.log("Uploading to Cloudinary")
    stream.pipe(stream2);
    console.log("Upload Complete")
   
  });
};

module.exports = { cloudinary,streamUpload };
