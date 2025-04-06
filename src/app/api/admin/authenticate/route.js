import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

export const GET = async (req) => {
    // const cookies = await req.cookies
    // console.log(cookies)
    try {
        const cookieStore =  cookies();
        const token = cookieStore.get('auth_token')?.value;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded.user === process.env.USER) {
            return new Response(JSON.stringify({authenticate: true}), {status: 200})
        } else {
            return new Response(JSON.stringify({authenticate: false}), {status: 400})
        }
        console.log(decoded)
        return new Response(JSON.stringify(decoded), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify(error), {status: 501})
    }
}