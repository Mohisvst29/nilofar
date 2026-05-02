const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dakojcm6f",
  api_key: "952829294835597",
  api_secret: "zdLHZ2oLFKS4DJMm9KvuuU0Xjd4",
});

cloudinary.uploader.upload("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", { folder: "nilofar" }, (error, result) => {
  if (error) {
    console.error("FAILED:", error);
  } else {
    console.log("SUCCESS:", result.secure_url);
  }
});
