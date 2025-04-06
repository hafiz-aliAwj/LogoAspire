import mongoose from "mongoose";
import { connectDB } from "../lib/database";
import Service from "../lib/Models/Service";
import Subservice from "../lib/Models/Subservice";


export async function GET(req) {
    try {
        await connectDB();
        
        const url = new URL(req.url);
        const serviceId = url.searchParams.get("serviceId");
        
        if (!serviceId) {
            return new Response(JSON.stringify({ success: false, error: "serviceId is required" }), { status: 400 });
        }
        
        const services = await Subservice.find({ serviceId }).sort({ order: 1 });
        
        return new Response(JSON.stringify({ success: true, data: services }), { status: 200 });
    } catch (error) {
        console.error("Error fetching subservices:", error);
        return new Response(JSON.stringify({ success: false, error: "Failed to fetch subservices" }), { status: 500 });
    }
}

export async function POST(req) {
    try {
      await connectDB()
  
      const body = await req.json()
      const { name, serviceId, isActive = true, order } = body
      // Validate required fields
      if (!name || !serviceId) {
        return new Response(JSON.stringify({ error: "Name and serviceId are required fields" }), { status: 400 })
      }
  
      if (!new mongoose.Types.ObjectId(serviceId)) {
        return new Response(JSON.stringify({ error: "Invalid service ID format" }), { status: 400 })
      }
  
      // Check if the service exists
      const serviceExists = await Service.findById(serviceId)
      if (!serviceExists) {
        return new Response(JSON.stringify({ error: "Service not found" }), { status: 404 })
      }
  
      let subserviceOrder = order
      if (!subserviceOrder) {
        const highestOrder = await Subservice.findOne({ serviceId }).sort({ order: -1 }).select("order")
  
        subserviceOrder = highestOrder ? highestOrder.order + 1 : 1
      }
  
      const newSubservice = new Subservice({
        name,
        serviceId,
        isActive,
        order: subserviceOrder,
      })
  
      // Save to database
      await newSubservice.save()
  
      return new Response(JSON.stringify(
        {
          success: true,
          data: newSubservice,
          message: "Subservice created successfully",
        }),
        { status: 201 },
      )
    } catch (error) {
      console.error("Error creating subservice:", error)
  
      if (error.code === 11000) {
        return new Response(JSON.stringify({ error: "A subservice with this name already exists" }), { status: 409 })
      }
  
      return new Response(JSON.stringify({ error: "Failed to create subservice" }), { status: 500 })
    }
  }
  
  