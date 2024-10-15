"use client"; // Ensure this is included for client-side rendering in Next.js
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEye } from "react-icons/fa";
import AdminLayout from "@/components/AdminLayout"; // Adjust the path if necessary
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const TradePanel = ({
    trades,
    totalPages,
    currentPage,
    searchQuery,
    loginInfo
}
) => {
//   const [trades, setTrades] = useState([]);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState(""); // State for search input
    const router = useRouter();

  // Function to fetch trades
  //   const fetchTrades = async (searchTerm) => {
  //     const data = JSON.parse(localStorage.getItem("ooowap-user"));
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${data?.token}`,
  //       },
  //     };
  //     try {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/admin/trades?tradeId=${search}`,
  //         config
  //       );
  //       setTrades(response.data);
  //     } catch (error) {
  //       console.error("Error fetching trades:", error);
  //     }
  //   };

  // Fetch all trades on component mount
//   useEffect(() => {
//     fetchTrades(""); // Fetch all trades initially
//   }, []);

  const handleDelete = async (tradeId) => {
    try {
      const data = JSON.parse(localStorage.getItem("ooowap-user"));
      const config = {
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
      };
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/trades/${tradeId}`,
        config
      );
        //   setTrades(trades.filter((trade) => trade._id !== tradeId)); // Update state to remove deleted trade
        
        router.refresh()
    } catch (error) {
      console.error("Error deleting trade:", error);
    }
  };

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      const query = e.target.search.value; // Get the search query value
      router.push(`/home/admin/trades?search=${query}&page=1`); // Navigate to the first page with the search query
    };

    // Handle pagination
    const handlePageChange = (newPage) => {
      router.push(`/home/admin/trades?search=${searchQuery}&page=${newPage}`); // Maintain search query and change page
    };
    
    
  const openModal = (trade) => {
    setSelectedTrade(trade);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTrade(null);
  };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault(); // Prevent default form submission
//     fetchTrades(search); // Fetch trades based on search input
//   };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Trade Management</h2>
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="flex">
          <input
            type="text"
            name="search"
            defaultValue={searchQuery}
            placeholder="Search trades by their ID"
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
            <th className="py-2 px-4">Trade ID</th>
            <th className="py-2 px-4">Offerer</th>
            <th className="py-2 px-4">Receiver</th>
            <th className="py-2 px-4">Offerer Product</th>
            <th className="py-2 px-4">Receiver Product</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trades &&
            trades.map((trade) => (
              <tr key={trade._id} className="border-b">
                <td className="text-center py-2 px-4">{trade._id}</td>
                <td className="text-center py-2 px-4">
                  {trade.offerer?.firstName}
                </td>
                <td className="text-center py-2 px-4">
                  {trade.receiver?.firstName}
                </td>
                <td className="text-center py-2 px-4">
                  {trade.offererProduct?.name}
                </td>
                <td className="text-center py-2 px-4">
                  {trade.receiverProduct?.name}
                </td>
                <td className="text-center py-2 px-4">{trade.status}</td>
                <td className="text-center justify-center py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => openModal(trade)}
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-semibold text-white bg-[#D5B868] rounded-lg hover:bg-[#b79355] transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b79355]"
                  >
                    <FaEye /> <span>View</span>
                  </button>
                  <button
                    onClick={() => handleDelete(trade._id)}
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-400 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
                  >
                    <FaTrash /> <span>Delete</span>
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

      {/* Modal for Trade Details */}
      {selectedTrade && isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
              Trade Details
            </h2>
            <p>
              <strong>Offerer:</strong> {selectedTrade.offerer?.firstName}
            </p>
            <p>
              <strong>Receiver:</strong> {selectedTrade.receiver?.firstName}
            </p>
            <p>
              <strong>Offerer Product:</strong>{" "}
              {selectedTrade.offererProduct?.name}
            </p>
            <p>
              <strong>Offerer Completion Status:</strong>{" "}
              {selectedTrade?.offererFinished
                ? "Completed"
                : "Not Completed"}
            </p>
            <p>
              <strong>Receiver Product:</strong>{" "}
              {selectedTrade.receiverProduct?.name}
            </p>
            <p>
              <strong>Offerer Completion Status:</strong>{" "}
              {selectedTrade?.receiverFinished
                ? "Completed"
                : "Not Completed"}
            </p>
            <p>
              <strong>Shipping Fee:</strong> ${selectedTrade.shippingFee}
            </p>
            <p>
              <strong>Status:</strong> {selectedTrade.status}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {new Date(selectedTrade.startDate).toLocaleDateString()}
            </p>
            <p>
              <strong>End Date:</strong>{" "}
              {new Date(selectedTrade.endDate).toLocaleDateString()}
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-[#D5B868] text-white rounded-lg shadow-md hover:bg-[#b79355] transition-all duration-300"
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

export default TradePanel;
