"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout"; // Adjust the path if necessary

const CategoryPanel = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/categories`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/categories/${selectedCategory._id}`,
          { name: categoryName }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/categories`,
          { name: categoryName }
        );
      }
      setCategoryName(""); // Reset input field
      setIsModalOpen(false);
      setIsEditing(false);
      fetchCategories(); // Refetch categories
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/categories/${categoryId}`
      );
      fetchCategories(); // Refetch categories after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const openModal = (category = null) => {
    setSelectedCategory(category);
    setCategoryName(category ? category.name : "");
    setIsEditing(!!category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setCategoryName("");
    setIsEditing(false);
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Category Management</h2>
      <button className="btn btn-primary mb-4" onClick={() => openModal()}>
        Create New Category
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-[#D5B868] text-black">
              <th className="py-2 px-4 text-left">Category Name</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="border-b">
                <td className="text-center py-2 px-4">{category.name}</td>
                <td className="text-center justify-center py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => openModal(category)}
                    className="btn btn-warning flex items-center space-x-1"
                  >
                    <FaEdit /> <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="btn btn-danger flex items-center space-x-1"
                  >
                    <FaTrash /> <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Create/Edit Category */}
      {isModalOpen && (
        <div>
          <input
            type="checkbox"
            id="category-modal"
            className="modal-toggle"
            checked={isModalOpen}
            onChange={() => setIsModalOpen(!isModalOpen)}
          />
          <label htmlFor="category-modal" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <h2 className="text-xl font-bold mb-4">
                {isEditing ? "Edit Category" : "Create Category"}
              </h2>
              <form onSubmit={handleCreateOrUpdate}>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Category Name"
                  className="input input-bordered w-full mb-4"
                  required
                />
                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? "Update" : "Create"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ml-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </label>
          </label>
        </div>
      )}
    </AdminLayout>
  );
};

export default CategoryPanel;
