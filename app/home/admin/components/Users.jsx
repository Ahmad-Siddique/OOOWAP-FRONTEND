"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { FaTrash } from "react-icons/fa";
import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";

const Users = ({ loginInfo, users, totalPages, currentPage, searchQuery }) => {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRole, setNewRole] = useState("user");

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = e.target.search.value; // Get the search query value
    router.push(`/home/admin/users?search=${query}&page=1`); // Navigate to the first page with the search query
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    router.push(`/home/admin/users?search=${searchQuery}&page=${newPage}`); // Maintain search query and change page
  };

  // Open Modal for Edit User Role
  const openModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Handle Role Change
  const handleRoleChange = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${selectedUser._id}`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${loginInfo.user.token}` } }
      );
      closeModal();
      router.refresh(); // Refresh the page after role change
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  // Handle Delete User
  const handleDelete = async (userId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}`,
        { headers: { Authorization: `Bearer ${loginInfo.user.token}` } }
      );
      router.refresh(); // Refresh the page after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="flex">
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="Search users by name or email"
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

      {/* User Table */}
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

      {/* Pagination */}
      <Pagination className="mt-5 flex justify-center items-center space-x-2">
        {/* Previous Button */}
        <PaginationItem>
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            className={`px-3 py-2 border rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </PaginationItem>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-2 border rounded ${
              currentPage === index + 1
                ? "bg-[#C79B44] text-white font-bold"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            className={`px-3 py-2 border rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </PaginationItem>
      </Pagination>

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

export default Users;
