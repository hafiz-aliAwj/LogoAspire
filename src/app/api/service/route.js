import { connectDB } from "../lib/database";
import Service from "../lib/Models/Service";


export async function GET() {
    try {
        await connectDB();
        const services = await Service.find().sort({ order: 1 }); // Sort by order
        return new Response(JSON.stringify({ success: true, data: services }), { status: 200 });
    } catch (error) {
        console.error("Error fetching services:", error);
        return new Response(JSON.stringify({ success: false, error: "Failed to fetch services" }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        await connectDB();

        const newService = new Service(body);
        await newService.save();

        return new Response(JSON.stringify({ success: true, data: newService }), { status: 201 });
    } catch (error) {
        console.error("Error creating service:", error);
        return new Response(JSON.stringify({ success: false, error: "Failed to create service" }), { status: 500 });
    }
}
