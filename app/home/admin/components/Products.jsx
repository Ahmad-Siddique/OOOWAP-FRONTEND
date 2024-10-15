"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import AdminLayout from "@/components/AdminLayout"; // Adjust the path if necessary
import { toast } from "react-toastify";
import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
const ProductPanel = ({
  productList,
  totalPages,
  currentPage,
  searchQuery,
  loginInfo,
}) => {
//   const [productList, setProductList] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [featureValue, setFeatureValue] = useState("no");
  const [user, setUser] = useState(loginInfo);
  const router = useRouter();
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

  //   const fetchProducts = async (search = "", page = 1) => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/admin/products`,
  //         {
  //           headers: config.headers,
  //           params: { search, page },
  //         }
  //       );
  //       setProductList(response.data.products); // Set products from response
  //       // Update the total pages if necessary, depending on response
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  // Trigger search when user presses "Enter"
  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = e.target.search.value; // Get the search query value
    router.push(`/home/admin/products?search=${query}&page=1`); // Navigate to the first page with the search query
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    router.push(`/home/admin/products?search=${searchQuery}&page=${newPage}`); // Maintain search query and change page
  };

  const openModal = (product) => {
      setSelectedProduct(product);
      setFeatureValue(product.featured ? "yes" : "no");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

 

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/products/${productId}`,
        config
      );
      // Update state to remove the deleted product
      router.refresh();
      toast.success("Product deleted successfully!");
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
       router.refresh();
    } catch (error) {
      toast.error("Error updating featured status!");
    }
  };
  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="flex">
          <input
            type="text"
            name="search"
            defaultValue={searchTerm}
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
          {productList.map((product) => (
            <tr key={product._id} className="border-b hover:bg-gray-100">
              <td className=" py-2 px-4">{product.productNumber}</td>
              <td className=" py-2 px-4">{product.name}</td>
              <td className=" py-2 px-4">${product.price}</td>
              <td className=" py-2 px-4">{product.userId.email}</td>
              <td className=" py-2 px-4">{product.status}</td>
              <td className=" py-2 px-4">{product.featured ? "Yes" : "No"}</td>
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

      <Pagination className="mt-5 flex justify-center items-center space-x-2">
        {/* Previous Button */}
        <PaginationPrevious>
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
        </PaginationPrevious>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <button
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-2 border rounded ${
                currentPage === index + 1
                  ? "bg-[#C79B44] text-white font-bold"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationNext>
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
        </PaginationNext>
      </Pagination>
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
                <option
                  selected={
                    selectedProduct.featured == false ||
                    selectedProduct.featured == null
                  }
                  value="no"
                >
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
