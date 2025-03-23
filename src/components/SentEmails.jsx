"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SentEmails() {
  const [emails, setEmails] = useState([]);
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
console.log(code)
  useEffect(() => {
    async function fetchEmails() {
      try {
        const res = await fetch("/api/get-contactmails",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });
        const data = await res.json();
        console.log(data)
        // data.messages= data.messages.filter((email)=>{email.payload?.headers?.find(h => h.name === "Subject")?.value.includes("New Contact Us Form Submission")})
        setEmails(data.messages || []);
      } catch (error) {
        console.error("Failed to fetch emails", error);
      }
    }
    async function getGoogleAuthUrl() {
      try {
        const response = await fetch("/api/auth/gmailauth", {
          method: "GET",
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("Google Auth URL:", data.authUrl);
    
        return data.authUrl;
      } catch (error) {
        console.error("Failed to fetch Google Auth URL:", error);
      }
    }
    console.log(code)
    if(code) {fetchEmails()}
    else {
      getGoogleAuthUrl().then((url) => {
        console.log(url)
        if (url) {
          window.location.href = url; // Redirect user to Google Auth page
        }
      });
    }
    
  }, []);

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">Sent Emails</h1>
      <ul className="overflow-y-scroll">
        {emails.map((email) => (
          <li key={email.id} className="border p-4 mb-2 rounded">
            <strong>Subject:</strong> {email.payload?.headers?.find(h => h.name === "Subject")?.value || "No Subject"}
            <p><strong>To:</strong> {email.payload?.headers?.find(h => h.name === "To")?.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
