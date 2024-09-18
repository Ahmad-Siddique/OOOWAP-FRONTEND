import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Products = () => {
  const { loginInfo } = useSelector((state) => state.auth);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    currency: "USD",
    size: "",
    description: "",
    condition: "",
    image: null,
  });
  const [editProduct, setEditProduct] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const config = {
    headers: {
      Authorization: `Bearer ${loginInfo.token}`,
    },
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/category/categories`,
          config
        );
        setCategories(response.data);
      } catch (error) {
        toast.error("Error fetching categories!");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/product/userproducts`,
          config
        );
        setProducts(response.data);
      } catch (error) {
        toast.error("Error fetching products!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
    fetchProducts();
  }, [loginInfo.token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSubmit.append(key, formData[key]);
      });

      if (editProduct) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/product/products/${editProduct._id}`,
          formDataToSubmit,
          config
        );
        toast.success("Product updated successfully!");
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/product/products`,
          formDataToSubmit,
          config
        );
        toast.success("Product added successfully!");
      }

      setShowModal(false);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/userproducts`,
        config
      );
      setProducts(response.data);
    } catch (error) {
      toast.error("Error adding/updating product!");
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/product/products/${productId}`,
        config
      );
      toast.success("Product deleted successfully!");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/userproducts`,
        config
      );
      setProducts(response.data);
      setShowDeletePopup(false);
    } catch (error) {
      toast.error("Error deleting product!");
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      currency: product.currency,
      size: product.size,
      description: product.description,
      condition: product.condition,
      image: null,
    });
    setShowModal(true);
  };

  const openDeletePopup = (productId) => {
    setProductToDelete(productId);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    handleDelete(productToDelete);
  };

  // Feature product handler
  const handleFeature = async (productId) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/product/products/${productId}/feature`,
        { featured: true },
        config
      );
      toast.success("Product featured successfully!");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/userproducts`,
        config
      );
      setProducts(response.data);
    } catch (error) {
      toast.error("Error featuring product!");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          className="btn btn-green"
          onClick={() => {
            setEditProduct(null);
            setFormData({
              name: "",
              category: "",
              price: "",
              currency: "USD",
              size: "",
              description: "",
              condition: "",
              image: null,
            });
            setShowModal(true);
          }}
        >
          Add Product
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-9">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow-lg p-4 mb-6 flex items-center"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    {product.name} ({product.price})
                  </h2>
                  <p className="text-gray-600">
                    No. of Trades: {product.trades}
                  </p>
                  <div className="mt-2 space-x-2">
                    <button
                      className="btn btn-blue"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-yellow"
                      onClick={() => handleFeature(product._id)}
                    >
                      Feature
                    </button>
                    <button
                      className="btn btn-red"
                      onClick={() => openDeletePopup(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="flex">
                      {[...Array(5)].map((star, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.887 5.833h6.042c.969 0 1.371 1.24.588 1.81l-4.9 3.553 1.888 5.833c.3.922-.755 1.688-1.54 1.117L10 14.347l-4.916 3.556c-.785.571-1.84-.195-1.54-1.117l1.888-5.833-4.9-3.553c-.784-.57-.38-1.81.588-1.81h6.042l1.887-5.833z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-3">
            <Sidebar categories={categories} />
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">
                {editProduct ? "Edit Product" : "Add Product"}
              </h2>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setShowModal(false)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Currency</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Size</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Condition</label>
                <input
                  type="text"
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="mt-1 block w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  {editProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeletePopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm mx-4">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this product?
            </h2>
            <div className="flex justify-between">
              <button className="btn btn-red" onClick={() => confirmDelete()}>
                Yes, Delete
              </button>
              <button
                className="btn btn-gray"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
