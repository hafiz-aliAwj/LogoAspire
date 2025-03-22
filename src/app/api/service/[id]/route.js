import { connectDB } from "../../lib/database";
import Service from "../../lib/Models/Service";


export async function GET(req, { params }) {
    try {
        await connectDB();
        const service = await Service.findById(params.id);

        if (!service) {
            return new Response(JSON.stringify({ success: false, error: "Service not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, data: service }), { status: 200 });
    } catch (error) {
        console.error("Error fetching service:", error);
        return new Response(JSON.stringify({ success: false, error: "Failed to fetch service" }), { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const body = await req.json();
        await connectDB();

        const updatedService = await Service.findByIdAndUpdate(params.id, body, { new: true });

        if (!updatedService) {
            return new Response(JSON.stringify({ success: false, error: "Service not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, data: updatedService }), { status: 200 });
    } catch (error) {
        console.error("Error updating service:", error);
        return new Response(JSON.stringify({ success: false, error: "Failed to update service" }), { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectDB();

        const deletedService = await Service.findByIdAndDelete(params.id);

        if (!deletedService) {
            return new Response(JSON.stringify({ success: false, error: "Service not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, message: "Service deleted" }), { status: 200 });
    } catch (error) {
        console.error("Error deleting service:", error);
        return new Response(JSON.stringify({ success: false, error: "Failed to delete service" }), { status: 500 });
    }
}
