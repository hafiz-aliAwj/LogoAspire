import AdminLogin from '@/components/AdminLogin'
import { cookies } from 'next/headers'

import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';

const page = () => {
  const token = cookies().get("auth_token")?.value
  if(token){
    var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if(decoded.user === process.env.USER){
    redirect("/admin-panel")
  }
}
  return (
    <AdminLogin/>
  )
}

export default page