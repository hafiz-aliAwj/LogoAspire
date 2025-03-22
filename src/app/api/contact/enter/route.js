import { connectDB } from "../../lib/database";
import Contact from "../../lib/Models/Contact";

export async function POST(request) {
  try {
    await connectDB();

    const { name, email, phone } = await request.json(); 

    if (!name || !email || !phone) {
      return new Response('Name, email, and phone are required', { status: 400 });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
    });

    await newContact.save();

    return new Response(JSON.stringify(newContact), { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return new Response('Failed to create contact', { status: 500 });
  }
}
