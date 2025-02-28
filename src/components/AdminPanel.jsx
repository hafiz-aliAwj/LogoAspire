"use client";

import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminManagement() {
  const router = useRouter();
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    const res = await fetch("/api/admins");
    const data = await res.json();
    setAdmins(data);
  };

  const handleCreateOrUpdateAdmin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newAdmin = {
      id: editingAdmin ? editingAdmin.id : undefined,
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      password: formData.get("password"),
    };

    const method = editingAdmin ? "PUT" : "POST";
    await fetch("/api/admins", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAdmin),
    });

    setIsModalOpen(false);
    setEditingAdmin(null);
    fetchAdmins();
  };

  const handleDeleteAdmin = async (adminId) => {
    await fetch(`/api/admins?id=${adminId}`, { method: "DELETE" });
    fetchAdmins();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Admin Management</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => {
              setEditingAdmin(null);
              setIsModalOpen(true);
            }}
          >
            Create New Admin
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border">
                <td className="p-2">{admin.name}</td>
                <td className="p-2">{admin.email}</td>
                <td className="p-2">{admin.role}</td>
                <td className="p-2 text-right">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => {
                      setEditingAdmin(admin);
                      setIsModalOpen(true);
                    }}
                  >
                    <PencilIcon className="h-5 w-5 inline" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteAdmin(admin.id)}
                  >
                    <TrashIcon className="h-5 w-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">
              {editingAdmin ? "Edit Admin" : "Create New Admin"}
            </h3>
            <form onSubmit={handleCreateOrUpdateAdmin} className="space-y-4">
              <input
                name="name"
                type="text"
                placeholder="Name"
                defaultValue={editingAdmin?.name || ""}
                required
                className="w-full p-2 border rounded"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                defaultValue={editingAdmin?.email || ""}
                required
                className="w-full p-2 border rounded"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                className="w-full p-2 border rounded"
              />
              <select
                name="role"
                defaultValue={editingAdmin?.role || "Super Admin"}
                className="w-full p-2 border rounded"
              >
                <option>Super Admin</option>
                <option>Content Manager</option>
                <option>Course Admin</option>
              </select>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  {editingAdmin ? "Update" : "Create"} Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
