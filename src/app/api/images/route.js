import { NextResponse } from "next/server"
import { GridFSBucket, MongoClient } from "mongodb"
import { Readable } from "stream"
import { connectDB } from "../lib/database"
import Image from "../lib/Models/Image"

const MONGODB_URI = process.env.MONGODB_URI

export async function POST(req) {
  try {
    await connectDB()
    const formData = await req.formData()
    const file = formData.get("image")
    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 })
    }

    const serviceId = formData.get("serviceId")
    const subServiceIds = formData.getAll("subServiceId")
    const atHome = formData.get("atHome") === "true"

    if (!serviceId) {
      return new Response(JSON.stringify({ error: "Service ID is required" }), { status: 400 })
    }

    if (!subServiceIds || subServiceIds.length === 0) {
      return new Response(JSON.stringify({ error: "At least one subservice is required" }), { status: 400 })
    }

    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    const db = client.db()
    const bucket = new GridFSBucket(db, { bucketName: "uploads" })

    const buffer = Buffer.from(await file.arrayBuffer())
    const stream = Readable.from(buffer)

    const filename = `${Date.now()}-${file.name}`

    const uploadStream = bucket.openUploadStream(filename)

    // Wait for the upload to complete
    await new Promise((resolve, reject) => {
      stream.pipe(uploadStream).on("error", reject).on("finish", resolve)
    })

    // Save metadata in the Image collection
    const newImage = new Image({
      filename: filename,
      serviceId,
      subServiceId: subServiceIds,
      atHome,
      orderAtHome: atHome ? 30 : -1, // Default to 30 if shown on home
      orderAtPage: 30, // Default to 30
    })

    await newImage.save()
    await client.close()

    return new Response(
      JSON.stringify({
        message: "Image uploaded successfully!",
        image: {
          _id: newImage._id,
          filename: newImage.filename,
          serviceId: newImage.serviceId,
          subServiceId: newImage.subServiceId,
          atHome: newImage.atHome,
          orderAtHome: newImage.orderAtHome,
          orderAtPage: newImage.orderAtPage,
        },
      }),
      { status: 201 },
    )
  } catch (error) {
    console.error("Upload error:", error)
    return new Response(JSON.stringify({ error: error.message || "Failed to upload image" }), { status: 500 })
  }
}

export async function GET(req) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const serviceId = searchParams.get("serviceId")
    const subServiceId = searchParams.get("subServiceId")

    if (!serviceId) {
      return new Response(JSON.stringify({ error: "Service ID is required" }), { status: 400 })
    }

    // Build query
    const query = { serviceId }

    // If subServiceId is provided, filter by it
    if (subServiceId) {
      query.subServiceId = subServiceId
    }

    const images = await Image.find(query)

    return new Response(JSON.stringify(images), { status: 200 })
  } catch (error) {
    console.error("Fetch error:", error)
    return new Response(JSON.stringify({ error: error.message || "Failed to fetch images" }), { status: 500 })
  }
}

