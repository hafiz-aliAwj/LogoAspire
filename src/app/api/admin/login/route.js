import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { connectDB } from '../../lib/database';


const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key'; // Use an environment variable for the secret key

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }
    const User = process.env.USER;
    const Password = process.env.PASSWORD;
    console.log(User, Password);
    if(username != process.env.USER || password != process.env.PASSWORD) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }


    const token = jwt.sign(
      { user: username  }, // Include role and email in the payload
      SECRET_KEY,
      { expiresIn: '10h' } // The token expires in 1 hour
    );

    // Set token in HTTP-only cookie
    const cookie = serialize('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 36000, // 1 hour expiration for the token (same as the JWT expiration time)
      path: '/',
    });

    // Send response with the cookie
    return new NextResponse(
      JSON.stringify({ message: 'Login successful' }),
      {
        status: 200,
        headers: {
          'Set-Cookie': cookie,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error logging in admin:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
