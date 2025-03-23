import { NextResponse } from "next/server";
import { connectDB } from "../lib/database";
import Image from "../lib/Models/Image";
import { GridFSBucket, MongoClient } from "mongodb";
import { Readable } from "stream";

const MONGODB_URI = process.env.MONGODB_URI;

export async function POST(req) {
  try {
    await connectDB();

    // Parse the multipart form data
    const formData = await req.formData();

    // Get the file from the form data
    const file = formData.get("image");
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Get other form fields
    const category = formData.get("category");
    const atHome = formData.get("atHome") === "true";
    const orderAtHome = formData.get("orderAtHome");
    const orderAtPage = formData.get("orderAtPage");

    // Connect to MongoDB directly for GridFS operations
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db();
    const bucket = new GridFSBucket(db, { bucketName: "uploads" });

    // Convert file to buffer and then to stream
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    // Create a unique filename
    const filename = `${Date.now()}-${file.name}`;

    // Upload to GridFS
    const uploadStream = bucket.openUploadStream(filename);

    // Wait for the upload to complete
    await new Promise((resolve, reject) => {
      stream.pipe(uploadStream).on("error", reject).on("finish", resolve);
    });

    // Save metadata in the Image collection
    const newImage = new Image({
      filename: filename,
      category,
      atHome,
      orderAtHome: parseInt(orderAtHome) || 30, // Default to 30
      orderAtPage: parseInt(orderAtPage) || 30, // Default to 30
    });

    await newImage.save();

    // Close the MongoDB connection
    await client.close();

    return NextResponse.json(
      {
        message: "Image uploaded successfully!",
        image: {
          id: newImage._id,
          filename: newImage.filename,
          category: newImage.category,
          atHome: newImage.atHome,
          orderAtHome: newImage.orderAtHome,
          orderAtPage: newImage.orderAtPage,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(req) {
  try {
    await connectDB();

    // Extract category from query params
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    if (!category) {
      return new Response(JSON.stringify({ error: "Category is required" }), { status: 400 });
    }

    // Fetch images based on category
    const images = await Image.find({ category });

    return new Response(JSON.stringify(images), { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch images" }),
      { status: 500 }
    );
  }
}
