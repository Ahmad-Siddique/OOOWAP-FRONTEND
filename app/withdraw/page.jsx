"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RefundPage = () => {
  const [refundAmount, setRefundAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRefund = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/payment/refund", {
        amount: refundAmount,
      });

      toast.success("Refund request successful!");
    } catch (error) {
      console.error("Error processing refund", error);
      toast.error("Failed to process refund.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Refund Money</h1>
        <form onSubmit={handleRefund}>
          <div className="mb-4">
            <label
              htmlFor="refundAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Refund Amount
            </label>
            <input
              type="number"
              name="refundAmount"
              id="refundAmount"
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Request Refund"}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default RefundPage;
