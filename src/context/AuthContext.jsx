"use client";

import Cookies from "js-cookie";
import { createContext, useEffect, useRef, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [services, setServices] = useState([]);
  const [images, setImages] = useState([]);
  const [sName, setSName] = useState("");
  const contactRef=useRef()
 const fetchServices = async ()=>{
    const response = await fetch(`/api/service`)
    const data = await response.json();
    console.log(data)
    setServices(data.data);
}

const fetchImages = async (sName)=>{
  const response = await fetch(`/api/images?category=${sName}`)
  const data = await response.json();
  setImages(data);
}
  useEffect(()=>{
    fetchServices()
  },[])

  useEffect(() => {
    if(!services || services.length == 0)  return;
fetchImages(sName.length > 0 ? sName : services[0].name)
   
  }, [sName, services]);
  useEffect(() => {
    const token = Cookies.get("auth_token"); // Use js-cookie to read cookies safely
    console.log("Token:", token);
    
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  useEffect(()=>{
    console.log(isAuthenticated)
  },[isAuthenticated])
  const login = async (email, password) => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        
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
