"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useRef, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [services, setServices] = useState([]);
  const [images, setImages] = useState([]);
  const [sName, setSName] = useState("");
  const contactRef=useRef()

  const router = useRouter()
 const fetchServices = async ()=>{
    const response = await fetch(`/api/service`)
    const data = await response.json();
    console.log(2, data)
    setServices(data.data);
}

const fetchImages = async (sName)=>{
  const response = await fetch(`/api/images?category=${sName}`)
  const data = await response.json();
  setImages(data);
}


const checkAuthentication = async() =>{
  const response = await fetch("/api/admin/authenticate").then((rs) => rs.json())

  if (response.authenticate) {
    setIsAuthenticated(true)
  } else {
    setIsAuthenticated(false)
  }
}

useEffect(()=>{
   checkAuthentication()
},[])
useEffect(()=>{
  console.log("isAuthenticated", isAuthenticated)
},[isAuthenticated])
  useEffect(()=>{
    fetchServices()
  },[])

  useEffect(() => {
    if(!services || services.length == 0)  return;
fetchImages(sName.length > 0 ? sName : services[0].name)
   
  }, [sName, services]);

  const login = async (email, password) => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        router.push("/admin-panel");
        return true;
      } else {
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,contactRef, services, setSName, images }}>
      {children}
    </AuthContext.Provider>
  );
};
