"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import LoadingIcon from "./LoadingIcon"; // Adjust the path if necessary

const Dispute = ({loginInfo}) => {
  const [trades, setTrades] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [selectedTrade, setSelectedTrade] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${loginInfo?.user.token}`,
    },
  };

  useEffect(() => {
    fetchTradesAndDisputes();
  }, []);



  const fetchTradesAndDisputes = async () => {
    setLoading(true);
    try {
      
     

      // Fetch trades
      const { data: tradeData } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/trade/history",
        config
      );
      setTrades(tradeData.data);

      // Fetch disputes
      const { data: disputeData } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/dispute",
        config
      );
      setDisputes(disputeData.data);
    } catch (error) {
      console.log("Failed to Dispute Trade data");
      // setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // const token = JSON.parse(localStorage.getItem("loginInfo")).token;
      // const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/dispute/create",
        { tradeId: selectedTrade, reason },
        config
      );

      setSuccess("Dispute created successfully");
      setIsModalOpen(false); // Close the modal after submitting
      setReason(""); // Clear the reason field
      setSelectedTrade(""); // Clear the selected trade field

      // Fetch updated disputes
      await fetchTradesAndDisputes(); // Get updated disputes
    } catch (error) {
      console.log(error)
      setError("Failed to create dispute", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingIcon />;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Disputes</h1>

      {/* Disputes List */}
      {disputes.length > 0 ? (
        <div className="space-y-4">
          {disputes.map((dispute) => (
            <div key={dispute._id} className="bg-white shadow p-4 rounded-md">
              <p>
                <strong>Trade:</strong>{" "}
                {dispute && dispute?.trade?.offererProduct.name} vs{" "}
                {dispute && dispute?.trade?.receiverProduct.name}
              </p>
              <p>
                <strong>Reason:</strong> {dispute && dispute.reason}
              </p>
              <p>
                <strong>Status:</strong> {dispute && dispute.status}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No disputes found.</p>
      )}

      {/* Add Dispute Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#F5BA41] text-white py-2 px-4 mt-6 rounded-md"
      >
        Add Dispute
      </button>

      {/* Dispute Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Raise a Dispute</h2>

            {error && (
              <p className="text-red-500" aria-live="assertive">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-500" aria-live="assertive">
                {success}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="trade" className="block text-gray-700">
                  Select Trade
                </label>
                <select
                  id="trade"
                  value={selectedTrade}
                  onChange={(e) => setSelectedTrade(e.target.value)}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select a trade</option>
                  {trades.map((trade) => (
                    <option key={trade._id} value={trade._id}>
                      {trade.offererProduct.name} with{" "}
                      {trade.receiverProduct.name} (Trade ID: {trade._id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="reason" className="block text-gray-700">
                  Reason for Dispute
                </label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                  rows="4"
                ></textarea>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#F5BA41] text-white py-2 px-4 rounded-md"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Dispute"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dispute;
