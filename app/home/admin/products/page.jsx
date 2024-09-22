"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout"; // Adjust the path if necessary

const ProductPanel = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/products`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/products/${productId}`
      );
      // Re-fetch products after deletion
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
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
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-[#C79B44] text-white">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">User Email</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b">
              <td className="text-center py-2 px-4">{product.name}</td>
              <td className="text-center py-2 px-4">${product.price}</td>
              <td className="text-center py-2 px-4">{product.userId.email}</td>
              <td className="text-center py-2 px-4">{product.status}</td>
              <td className="text-center justify-center py-2 px-4 flex space-x-2">
                <button
                  onClick={() => openModal(product)}
                  className="btn bg-[#D5B868]"
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
        <div>
          <input
            type="checkbox"
            id="product-modal"
            className="modal-toggle"
            checked={isModalOpen}
            onChange={() => setIsModalOpen(!isModalOpen)}
          />
          <label htmlFor="product-modal" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <h2 className="text-xl font-bold mb-4">{selectedProduct.name}</h2>
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="w-full h-auto mb-4"
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
              <div className="flex justify-end mt-4">
                <label
                  htmlFor="product-modal"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </label>
              </div>
            </label>
          </label>
        </div>
      )}
    </AdminLayout>
  );
};

export default ProductPanel;
