import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const SECRET_KEY = "your_secret_key"; // Change this to a secure key (use env variables)

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Mock authentication (Replace this with database validation)
    if (email !== "sabeebr97@gmail.com" || password !== "a") {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

    // Set token in HTTP-only cookie
    const cookie = serialize("auth_token", token, {
      secure: process.env.NODE_ENV === "production",

      path: "/",
    });

    return new NextResponse(JSON.stringify({ message: "Login successful" }), {
      status: 200,
      headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
