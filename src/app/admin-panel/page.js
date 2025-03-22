import AdminDashboard from '@/components/AdminDashboard'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';

const page = () => {
   const token = cookies().get("auth_token")?.value
    console.log(token)
    if(!token){
      redirect("/admin-panel/login")
    }
    var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if(decoded.user !== process.env.USER){
    redirect("/admin-panel/login")
  }
  return (
    
    <AdminDashboard/>
   
  )
}

export default page