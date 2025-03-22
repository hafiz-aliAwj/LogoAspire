"use client";

import Cookies from "js-cookie";
import { createContext, useEffect, useRef, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const contactRef=useRef()
  
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout,contactRef }}>
      {children}
    </AuthContext.Provider>
  );
};
