import { connectDB } from "../../lib/database";
import Subservice from "../../lib/Models/Subservice";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const service = await Subservice.findById(params.id);

    if (!service) {
      return new Response(
        JSON.stringify({ success: false, error: "SubService not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true, data: service }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching subservice:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch subservice" }),
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    await connectDB();

    const updatedService = await Subservice.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!updatedService) {
      return new Response(
        JSON.stringify({ success: false, error: "SubService not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: updatedService }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating Subservice:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to update Subservice" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const deletedService = await Subservice.findByIdAndDelete(params.id);

    if (!deletedService) {
      return new Response(
        JSON.stringify({ success: false, error: "SubService not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "subService deleted" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting subservice:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to delete subservice" }),
      { status: 500 }
    );
  }
}
