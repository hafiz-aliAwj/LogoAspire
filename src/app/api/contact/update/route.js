import { connectDB } from "../../lib/database";
import Contact from "../../lib/Models/Contact";

export async function POST(req) {
    try {
        const { id } =  await req.json();
        await connectDB();

        // Find the existing contact
        const contact = await Contact.findById(id);
        if (!contact) {
            return new Response(JSON.stringify({ success: false, error: "Contact not found" }), { status: 404 });
        }

        // Toggle `contacted`
        contact.contacted = !contact.contacted;
        await contact.save();

        return new Response(JSON.stringify({ success: true, data: contact }), { status: 200 });
    } catch (error) {
        console.error("Error updating contact:", error);
        return new Response(JSON.stringify({ success: false, error: "Failed to update contact" }), { status: 500 });
    }
}
