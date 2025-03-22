"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
// Adjust the import path based on your project structure

const PrivateRoute = ({ children }) => {
  // const { isAuthenticated, loading } = useContext(AuthContext);
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  // useEffect(() => {
  //   if (!loading) {
  //     setAuthChecked(true);
  //     if (!isAuthenticated) {
  //       console.log(isAuthenticated)
  //       router.replace("/admin-panel/login"); // Redirects to login if not authenticated
  //     }
  //     else{
  //       router.replace('/admin-panel')
  //     }
  //   }
  
  // }, [isAuthenticated, loading, router]);

  // if (loading || !authChecked) {
  //   return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  // }

return children
};

export default PrivateRoute;
