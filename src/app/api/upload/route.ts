import { NextResponse } from "next/server";

// Force delete the Vercel CLOUDINARY_URL to prevent build crashes
if (process.env.CLOUDINARY_URL) {
  delete process.env.CLOUDINARY_URL;
}

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dakojcm6f",
  api_key: "952829294835597",
  api_secret: "zdLHZ2oLFKS4DJMm9KvuuU0Xjd4",
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "nilofar", resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({ success: true, url: uploadResponse.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload" }, { status: 500 });
  }
}
