"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEye } from "react-icons/fa";
import AdminLayout from "../../../components/AdminLayout"; // Adjust the path if necessary

const TradePanel = () => {
  const [trades, setTrades] = useState([]);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/trades`
        );
        setTrades(response.data);
      } catch (error) {
        console.error("Error fetching trades:", error);
      }
    };

    fetchTrades();
  }, []);

  const handleDelete = async (tradeId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/trades/${tradeId}`
      );
      setTrades(trades.filter((trade) => trade._id !== tradeId)); // Update state to remove deleted trade
    } catch (error) {
      console.error("Error deleting trade:", error);
    }
  };

  const openModal = (trade) => {
    setSelectedTrade(trade);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTrade(null);
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Trade Management</h2>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-[#C79B44] text-white">
            <th className="py-2 px-4">Offerer</th>
            <th className="py-2 px-4">Receiver</th>
            <th className="py-2 px-4">Offerer Product</th>
            <th className="py-2 px-4">Receiver Product</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade._id} className="border-b">
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
                  className="btn bg-[#D5B868] flex items-center space-x-1"
                >
                  <FaEye /> <span>View</span>
                </button>
                <button
                  onClick={() => handleDelete(trade._id)}
                  className="btn bg-[red] flex items-center space-x-1"
                >
                  <FaTrash /> <span>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Trade Details */}
      {selectedTrade && (
        <div>
          <input
            type="checkbox"
            id="trade-modal"
            className="modal-toggle"
            checked={isModalOpen}
            onChange={() => setIsModalOpen(!isModalOpen)}
          />
          <label htmlFor="trade-modal" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <h2 className="text-xl font-bold mb-4">Trade Details</h2>
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
                <strong>Receiver Product:</strong>{" "}
                {selectedTrade.receiverProduct?.name}
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
              <div className="flex justify-end mt-4">
                <label htmlFor="trade-modal" className="btn btn-secondary">
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

export default TradePanel;
