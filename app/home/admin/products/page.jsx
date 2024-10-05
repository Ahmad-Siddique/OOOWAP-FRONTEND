"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import AdminLayout from "@/components/AdminLayout"; // Adjust the path if necessary
import { toast } from "react-toastify";

const ProductPanel = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [featureValue, setFeatureValue] = useState("no");
  const [user, setUser] = useState(null);

  // Fetch user data from localStorage and save to state
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("ooowap-user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  // Config for axios headers with token
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`, // Assuming token is inside user object
    },
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/products`,
        config
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const searchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/products/search?query=${searchTerm}`,
        config
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  useEffect(() => {
    // Fetch products initially
    if (user) fetchProducts();
  }, [user]); // Fetch products when the user is loaded

  // Trigger search when user presses "Enter"
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchProducts();
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/products/${productId}`,
        config
      );
      // Update state to remove the deleted product
      const updatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleFeature = async (productId) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/product/products/${productId}/feature`,
        { featured: featureValue === "yes" },
        config
      );
      toast.success("Product featured status updated successfully!");
      fetchProducts(); // Refresh the product list
    } catch (error) {
      toast.error("Error updating featured status!");
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>

      {/* Search Bar */}
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress} // Trigger search when "Enter" is pressed
          className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring focus:ring-[#D5B868] transition duration-150"
        />
        <button
          onClick={searchProducts} // Trigger search when button is clicked
          className="bg-[#D5B868] text-white py-2 px-4 rounded"
        >
          Search
        </button>
      </div>

      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-[#C79B44] text-white">
            <th className="py-3 px-4 text-left">Product Number</th>
            <th className="py-3 px-4 text-left">Product Name</th>
            <th className="py-3 px-4 text-left">Price</th>
            <th className="py-3 px-4 text-left">User Email</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Featured</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b hover:bg-gray-100">
              <td className=" py-2 px-4">{product.productNumber}</td>
              <td className=" py-2 px-4">{product.name}</td>
              <td className=" py-2 px-4">${product.price}</td>
              <td className=" py-2 px-4">{product.userId.email}</td>
              <td className=" py-2 px-4">{product.status}</td>
              <td className=" py-2 px-4">
                {product.featured ? "Yes" : "No"}
              </td>
              <td className="  py-2 px-4 flex space-x-2">
                <button
                  onClick={() => openModal(product)}
                  className="btn bg-[#D5B868] text-white py-1 px-2 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500 hover:underline"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Product Details */}
      {selectedProduct && isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div
            className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg"
            style={{ height: "80vh", overflowY: "auto" }} // Fixed height and scrollable content
          >
            <h2 className="text-xl font-bold mb-4">
              {selectedProduct.name} ({selectedProduct.productNumber})
            </h2>
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="w-full h-auto mb-4 rounded-lg"
            />
            <p>
              <strong>Price:</strong> ${selectedProduct.price}
            </p>
            <p>
              <strong>User Email:</strong> {selectedProduct.userId.email}
            </p>
            <p>
              <strong>Status:</strong> {selectedProduct.status}
            </p>
            <p>
              <strong>Description:</strong> {selectedProduct.description}
            </p>

            {/* Dropdown for Featured Value */}
            <div className="mt-4">
              <label className="block mb-2 font-bold">Set Featured:</label>
              <select
                value={featureValue}
                onChange={(e) => setFeatureValue(e.target.value)}
                className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring focus:ring-[#D5B868] transition duration-150"
              >
                <option selected={selectedProduct.featured != true} value="no">
                  No
                </option>
                <option selected={selectedProduct.featured == true} value="yes">
                  Yes
                </option>
              </select>
              <button
                onClick={() => handleFeature(selectedProduct._id)}
                className="mt-4 bg-[#D5B868] text-white py-1 px-4 rounded"
              >
                Submit
              </button>
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-400 text-white py-1 px-4 rounded"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ProductPanel;
