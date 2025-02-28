import { google } from "googleapis";

export async function POST(req) {
  try {
    const {code}=await req.json()
    console.log(code)
   

    if (!code) {
      return new Response(JSON.stringify({ error: "No code provided" }), {
        status: 400,
      });
    }
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    const { tokens } = await auth.getToken(code);
    auth.setCredentials(tokens);

    const gmail = google.gmail({ version: "v1", auth });

    // Fetch sent emails
    const response = await gmail.users.messages.list({
      userId: "me",
      labelIds: ["SENT"], // Fetch emails from 'Sent' label
      maxResults: 10, // Limit results
    });

    const messages = await Promise.all(
      (response.data.messages || []).map(async (msg) => {
        const email = await gmail.users.messages.get({
          userId: "me",
          id: msg.id,
        });
        return email.data;
      })
    );
console.log(messages)
    return Response.json({ messages });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return Response.json({ error: "Failed to fetch emails" }, { status: 500 });
  }
}
