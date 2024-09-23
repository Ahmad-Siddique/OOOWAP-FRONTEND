"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaCheck, FaTrash } from "react-icons/fa";
import AdminLayout from "@/components/AdminLayout"; // Adjust the path if necessary

const DisputePanel = () => {
  const [disputes, setDisputes] = useState([]);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/disputes`
        );
        setDisputes(response.data);
      } catch (error) {
        console.error("Error fetching disputes:", error);
      }
    };

    fetchDisputes();
  }, []);

  const handleResolve = async (disputeId) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/disputes/${disputeId}`,
        {
          status: "resolved",
        }
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
      setDisputes(disputes.filter((dispute) => dispute._id !== disputeId)); // Update state to remove deleted dispute
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

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Dispute Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-[#C79B44] text-white">
              <th className="py-2 px-4">Trade ID</th>
              <th className="py-2 px-4">User</th>
              <th className="py-2 px-4">Reason</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {disputes.map((dispute) => (
              <tr key={dispute._id} className="border-b">
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
                    className="btn bg-[#D5B868] flex items-center space-x-1"
                  >
                    <FaEye /> <span>View</span>
                  </button>
                  <button
                    onClick={() => handleResolve(dispute._id)}
                    className="btn btn-success flex items-center space-x-1"
                  >
                    <FaCheck /> <span>Resolve</span>
                  </button>
                  <button
                    onClick={() => handleDelete(dispute._id)}
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

      {/* Modal for Dispute Details */}
      {selectedDispute && isModalOpen && (
        <div>
          <input
            type="checkbox"
            id="dispute-modal"
            className="modal-toggle"
            checked={isModalOpen}
            onChange={() => setIsModalOpen(!isModalOpen)}
          />
          <label htmlFor="dispute-modal" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
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
                <label htmlFor="dispute-modal" className="btn btn-secondary">
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

export default DisputePanel;
