import { connectDB } from "../../lib/database"
import Image from "../../lib/Models/Image"


export async function GET(req, { params }) {
  try {
    await connectDB()
    const image = await Image.findById(params.id)

    if (!image) {
      return new Response(JSON.stringify({ success: false, error: "Image not found" }), { status: 404 })
    }

    return new Response(JSON.stringify({ success: true, data: image }), { status: 200 })
  } catch (error) {
    console.error("Error fetching image:", error)
    return new Response(JSON.stringify({ success: false, error: "Failed to fetch image" }), { status: 500 })
  }
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json()
    await connectDB()

    const updatedImage = await Image.findByIdAndUpdate(params.id, body, { new: true })

    if (!updatedImage) {
      return new Response(JSON.stringify({ success: false, error: "Image not found" }), { status: 404 })
    }

    return new Response(JSON.stringify({ success: true, data: updatedImage }), { status: 200 })
  } catch (error) {
    console.error("Error updating image:", error)
    return new Response(JSON.stringify({ success: false, error: "Failed to update image" }), { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB()

    const deletedImage = await Image.findByIdAndDelete(params.id)

    if (!deletedImage) {
      return new Response(JSON.stringify({ success: false, error: "Image not found" }), { status: 404 })
    }

    return new Response(JSON.stringify({ success: true, message: "Image deleted" }), { status: 200 })
  } catch (error) {
    console.error("Error deleting image:", error)
    return new Response(JSON.stringify({ success: false, error: "Failed to delete image" }), { status: 500 })
  }
}

