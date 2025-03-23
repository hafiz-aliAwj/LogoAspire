"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, User, Image as Img, BookOpen, Trophy, LogOut } from "lucide-react";
// import AdminManagement from "@/components/AdminPanel";
import PrivateRoute from "@/components/PrivateRoute";
import { services } from "./ServiceSection";
import SentEmails from "./SentEmails";
import ContactManagement from "./Contacts";
import ServicesList from "./Services";
import ImageManagement from "./Images";

export default function AdminDashboard() {
  const [selectedImage, setSelectedImage] = useState([]);
  const [activeCategory, setActiveCategory] = useState([]);

const handleImageChange = (e, index) => {
  const newImage = e.target.files[0];
  setSelectedImage((prev) => {
    const updatedImages = [...prev];
    updatedImages[index - 1] = newImage;
    return updatedImages;
  });
};

  const [activeTab, setActiveTab] = useState("contacts");
  

  const sidebarItems = [

    { icon: User, label: "Contacts", value: "contacts" },
    { icon: BookOpen, label: "Services", value: "services" },
    { icon: Img, label: "Manage Content", value: "manage-content" },
    // { icon: BookOpen, label: "Manage Content", value: "manage-content" },
 
  ];

  return (
    <PrivateRoute>
      <div className="flex  bg-slate-100 pt-20">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-black p-6 flex h-[70vh] flex-col">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
              <User/>
            </div>
            <div>
              <h2 className="text-lg font-semibold">John Doe</h2>
              <p className="text-sm text-gray-400">Super Admin</p>
            </div>
          </div>
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.value}>
                <button
                  onClick={() => setActiveTab(item.value)}
                  className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-700 transition ${
                    activeTab === item.value ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <button className="w-full flex items-center justify-center py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition">
              <LogOut className="mr-2 h-5 w-5" /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="bg-white shadow-md p-6 rounded-lg">
           

          {activeTab === "contacts" &&  <ContactManagement/>}
          {activeTab === "services" && <ServicesList />}
          {activeTab === "manage-content" && <ImageManagement />}
          
          </div>
        </main>
      </div>
    </PrivateRoute>
  );
}
