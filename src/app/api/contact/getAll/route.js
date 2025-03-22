import { connectDB } from "../../lib/database";
import Contact from "../../lib/Models/Contact";

export async function GET() {
    try {
        await connectDB();
        const contacts = await Contact.find();
        const result = Object.groupBy(contacts, ({contacted})=>{
            return contacted
        });
        console.log(contacts)
        return new Response(JSON.stringify({ success: true, data: contacts}) , {status: 200}) 
    } catch (error) {
        console.error('Error retrieving contacts:', error);
        return new Response(JSON.stringify({ success: false, error: 'Failed to fetch contacts' }), {status: 500}) 
      
    }
}
