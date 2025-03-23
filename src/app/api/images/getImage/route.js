import mongoose from "mongoose";
import { connectDB } from "../../lib/database";

export async function GET(req) {
  await connectDB();

  const url = new URL(req.url);
  const filename = url.searchParams.get("filename");

  if (!filename) {
    return new Response(JSON.stringify({ error: "Filename required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const conn = mongoose.connection;
  const bucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "uploads" });

  try {
    const file = await conn.db.collection("uploads.files").findOne({ filename });

    if (!file) {
      return new Response(JSON.stringify({ error: "Image not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const stream = bucket.openDownloadStreamByName(filename);
    return new Response(stream, { status: 200, headers: { "Content-Type": file.contentType } });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Error retrieving image" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
