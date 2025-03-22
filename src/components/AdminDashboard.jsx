"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, User, Image as Img, BookOpen, Trophy, LogOut } from "lucide-react";
// import AdminManagement from "@/components/AdminPanel";
import PrivateRoute from "@/components/PrivateRoute";
import { CategorySection } from "./ui/CategorySection";
import { services } from "./ServiceSection";
import SentEmails from "./SentEmails";

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

    { icon: User, label: "Manage Mails", value: "contacts" },
    { icon: Img, label: "Change Slider Images", value: "slider-images" },
    { icon: BookOpen, label: "Manage Content", value: "manage-content" },
    // { icon: BookOpen, label: "Manage Content", value: "manage-content" },
 
  ];

  return (
    <PrivateRoute>
      <div className="flex h-screen bg-slate-100 pt-20">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-black p-6 flex flex-col">
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
                    activeTab === item.value ? "bg-gray-700" : ""
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
        <main className="flex-1  p-6">
          <div className="bg-white shadow-md p-6 rounded-lg">
           

          {/* {activeTab === "admin-management" && <AdminManagement />} */}
          {activeTab === "contacts" &&  <SentEmails/>}

            {activeTab === "slider-images" && (
        <div>
          <h2 className="text-xl font-semibold mb-5">Change Slider Images</h2>
                   <CategorySection services={services} setActiveCategory={setActiveCategory} showSubCategories={false} activeCategory={activeCategory}/>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            
            {[1, 2, 3].map((index) => (
              <div key={index} className="space-y-4">

                
                {/* Image preview section */}
                <div className="w-full h-40 bg-gray-200 border rounded-lg mb-2 flex items-center justify-center">
                  {selectedImage && selectedImage[index - 1] ? (
                    <Image
                      src={URL.createObjectURL(selectedImage[index - 1])}
                      alt={`Preview ${index}`}
                      width={300}
                      height={200}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-400">No image selected</span>
                  )}
                </div>
                
                {/* File input to select image */}
                <input
                  type="file"
                  className="w-full p-2 border rounded-lg"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                />

               
              </div>
            ))}
          </div>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Update Slider Images
          </button>
        </div>
      )}


            {activeTab === "manage-content" && (
              <div>
                <h2 className="text-xl font-semibold">Manage Courses</h2>
                <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Add New Course
                </button>
                <div className="mt-4 space-y-4">
                  {["Web Development", "Data Science", "UX Design"].map((course, index) => (
                    <div key={index} className="flex justify-between p-4 bg-gray-200 rounded-lg">
                      <span>{course}</span>
                      <div>
                        <button className="bg-yellow-500 px-4 py-1 rounded-lg text-white mr-2">Edit</button>
                        <button className="bg-red-600 px-4 py-1 rounded-lg text-white">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          
          </div>
        </main>
      </div>
    </PrivateRoute>
  );
}
