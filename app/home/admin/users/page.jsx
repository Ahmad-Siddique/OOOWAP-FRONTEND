"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import AdminLayout from "@/components/AdminLayout"; // Adjust the path if necessary

const UserPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRole, setNewRole] = useState("user");
  const [searchQuery, setSearchQuery] = useState(""); // Add search query state

  // Fetch users with an optional search query
  const fetchUsers = async (query = "") => {
    try {
      const data = JSON.parse(localStorage.getItem("ooowap-user"));
      const config = {
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
        params: { search: query }, // Correctly pass the search query with headers
      };
      console.log("SEARCHED", searchQuery);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
        config
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch all users initially
  }, []);

  // Handle role change
  const handleRoleChange = async () => {
    try {
      const data = JSON.parse(localStorage.getItem("ooowap-user"));
      const config = {
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
      };
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${selectedUser._id}`,
        { role: newRole }, // Send the new role data
        config // Pass the config object
      );
      setIsModalOpen(false);
      setSelectedUser(null);
      fetchUsers(searchQuery); // Re-fetch users with the current search query
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = async (userId) => {
    try {
      const data = JSON.parse(localStorage.getItem("ooowap-user"));
      const config = {
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
      };
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}`,
        config
      );
      fetchUsers(searchQuery); // Re-fetch users after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Submit handler for search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchUsers(searchQuery); // Fetch users based on the search query
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="flex">
          <input
            type="text"
            placeholder="Search users by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            className="border rounded p-2 w-full"
          />
          <button
            type="submit"
            className="bg-[#D5B868] text-white py-2 px-4 rounded ml-2"
          >
            Search
          </button>
        </div>
      </form>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-[#C79B44] text-white">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="text-center py-2 px-4">{user.firstName}</td>
              <td className="text-center py-2 px-4">{user.email}</td>
              <td className="text-center py-2 px-4">{user.role}</td>
              <td className="text-center justify-center py-2 px-4 flex space-x-2">
                <button
                  onClick={() => openModal(user)}
                  className="btn bg-[#D5B868] text-white py-1 px-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-500 hover:underline"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing User Role */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Edit User Role</h2>
            <label className="block mb-2">
              Role:
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="select select-bordered w-full mt-2"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <div className="flex space-x-4">
              <button
                onClick={handleRoleChange}
                className="bg-[#D5B868] text-white py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-400 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default UserPanel;
