"use client";

import Cookies from "js-cookie";
import { createContext, useEffect, useRef, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const contactRef=useRef()
  useEffect(() => {
    const token = Cookies.get("auth_token"); 
    console.log(token)// Read cookie
    if(!token) return

    setIsAuthenticated(true);
  }, []);
  useEffect(()=>{
    console.log(isAuthenticated)
  },[isAuthenticated])
  const login = async (email, password) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
