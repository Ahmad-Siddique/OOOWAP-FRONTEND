"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaCheck, FaTrash } from "react-icons/fa";
import AdminLayout from "@/components/AdminLayout"; // Adjust the path if necessary
import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";


const DisputePanel = ({
  loginInfo,
  disputes,
  totalPages,
  currentPage,
  searchQuery,
}) => {
//   const [disputes, setDisputes] = useState([]);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");
  const [userdata, setuserdata] = useState();
    const router = useRouter()
  useEffect(() => {
    setuserdata(JSON.parse(localStorage.getItem("ooowap-user")));
    // fetchDisputes(); // Fetch disputes initially
  }, []);

//   const fetchDisputes = async () => {
//     try {
//       const data = JSON.parse(localStorage.getItem("ooowap-user"));
//       const config = {
//         headers: {
//           Authorization: `Bearer ${data?.token}`,
//         },
//       };
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}/admin/disputes?search=${searchTerm}`,
//         config
//       );
//       setDisputes(response.data);
//     } catch (error) {
//       console.error("Error fetching disputes:", error);
//     }
//   };

  const handleResolve = async (disputeId) => {
    try {
      const data = JSON.parse(localStorage.getItem("ooowap-user"));
      const config = {
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
      };
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/disputes/${disputeId}`,

        {
          status: "resolved",
        },
        config
      );
      setDisputes(
        disputes.map((dispute) =>
          dispute._id === disputeId
            ? { ...dispute, status: "resolved" }
            : dispute
        )
      );
    } catch (error) {
      console.error("Error resolving dispute:", error);
    }
  };

  const handleDelete = async (disputeId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/disputes/${disputeId}`
      );
      setDisputes(disputes.filter((dispute) => dispute._id !== disputeId));
    } catch (error) {
      console.error("Error deleting dispute:", error);
    }
  };

  const openModal = (dispute) => {
    setSelectedDispute(dispute);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDispute(null);
  };

const handleSearchSubmit = (e) => {
  e.preventDefault();
  const query = e.target.search.value; // Get the search query value
  router.push(`/home/admin/disputes?search=${query}&page=1`); // Navigate to the first page with the search query
};

// Handle pagination
const handlePageChange = (newPage) => {
  router.push(`/home/admin/disputes?search=${searchQuery}&page=${newPage}`); // Maintain search query and change page
};

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Dispute Management</h2>
      <form onSubmit={handleSearchSubmit} className="flex space-x-2 mb-4">
        <input
          type="text"
          name="search"
          placeholder="Search by User or Trade ID"
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <button
          type="submit"
          className="bg-[#D5B868] text-white py-2 px-4 rounded-md flex items-center space-x-2"
        >
          Search
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-[#C79B44] text-white">
              <th className="py-2 px-4">Dispute ID</th>
              <th className="py-2 px-4">Trade</th>
              <th className="py-2 px-4">Received By</th>
              <th className="py-2 px-4">Reason</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {disputes.map((dispute) => (
              <tr key={dispute._id} className="border-b">
                <td className="text-center py-2 px-4">{dispute._id}</td>
                <td className="text-center py-2 px-4">
                  {dispute.trade?.offerer.firstName} vs{" "}
                  {dispute.trade?.receiver.firstName}
                </td>
                <td className="text-center py-2 px-4">
                  {dispute.user?.firstName}
                </td>
                <td className="text-center py-2 px-4">{dispute.reason}</td>
                <td className="text-center py-2 px-4">{dispute.status}</td>
                <td className="text-center justify-center py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => openModal(dispute)}
                    className="bg-[#D5B868] text-white py-2 px-4 rounded-md flex items-center space-x-1"
                  >
                    <FaEye /> <span>View</span>
                  </button>
                  {dispute && dispute.status != "resolved" && (
                    <button
                      onClick={() => handleResolve(dispute._id)}
                      className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center space-x-1"
                    >
                      <FaCheck /> <span>Resolve</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(dispute._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md flex items-center space-x-1"
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
      </div>

      {/* Modal for Dispute Details */}
      {selectedDispute && isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
            <h2 className="text-xl font-bold mb-4">Dispute Details</h2>
            <p>
              <strong>Trade ID:</strong> {selectedDispute.trade?._id.toString()}
            </p>
            <p>
              <strong>User:</strong> {selectedDispute.user?.firstName}
            </p>
            <p>
              <strong>Reason:</strong> {selectedDispute.reason}
            </p>
            <p>
              <strong>Status:</strong> {selectedDispute.status}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(selectedDispute.createdAt).toLocaleDateString()}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white py-2 px-4 rounded-md"
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

export default DisputePanel;
