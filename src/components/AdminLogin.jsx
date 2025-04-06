"use client";

import { useContext, useEffect, useState } from "react";
import { Mail, Lock, AlertTriangle } from "lucide-react";
import { AuthContext } from "@/context/AuthContext"; // Ensure this path is correct
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


export default function AdminLogin() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { login , isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
useEffect(()=>{
  console.log("isAuthenticated", isAuthenticated)
  if(isAuthenticated){
    router.push('/admin-panel')
  }
},[isAuthenticated])

  const handleLogin = (e) => {
    e.preventDefault();
    const isLoggedIn = login(email, password);
    if (isLoggedIn) {
    router.push('/admin-panel')
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setActiveTab("otp");
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setActiveTab("login");
  };
  
  return (
     
    <div className="flex items-center pt-20 justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {/* Tabs */}
        <div className="flex mb-6 border-b">
          <button
            className={`w-1/2 py-2 text-center text-lg font-semibold transition-colors ${
              activeTab === "login" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 text-center text-lg font-semibold transition-colors ${
              activeTab === "forgot-password" || activeTab === "otp" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("forgot-password")}
          >
            Forgot Password
          </button>
        </div>

        {/* Login Form */}
        {activeTab === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-xl font-bold">Admin Login</h2>

            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {error && (
              <div className="flex items-center text-red-600 text-sm">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Login</button>
          </form>
        )}

        {/* Forgot Password Form */}
        {activeTab === "forgot-password" && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <h2 className="text-xl font-bold">Forgot Password</h2>

            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Send Reset Link</button>
          </form>
        )}

        {/* OTP Verification Form */}
        {activeTab === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <h2 className="text-xl font-bold">Verify OTP</h2>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Verify OTP</button>
          </form>
        )}
      </div>
    </div>
   
  );
}
