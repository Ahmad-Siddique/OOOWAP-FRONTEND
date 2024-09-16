"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const PendingItems = () => {
  const [pendingTrades, setPendingTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loginInfo } = useSelector((state) => state.auth);
  // Fetch pending trades from backend API
  useEffect(() => {
    const fetchPendingTrades = async () => {
      try {
        const token = localStorage.getItem("loginInfo")
          ? JSON.parse(localStorage.getItem("loginInfo")).token
          : null;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(process.env.NEXT_PUBLIC_API_URL+"/trade/pending", config);
        setPendingTrades(data.data);
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching trades");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingTrades();
  }, []);

  const handleAcceptTrade = async (tradeId) => {
    try {
      const token = loginInfo ? loginInfo.token : null;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL+"/trade/accept",
        { tradeId },
        config
      );

      // Remove accepted trade from the pending list
      setPendingTrades(pendingTrades.filter((trade) => trade._id !== tradeId));

      alert("Trade Accepted");
    } catch (error) {
      console.log(error)
      alert(error.response?.data?.message || "Failed to accept trade");
    }
  };

  const handleRejectTrade = async (tradeId) => {
    try {
      const token = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo")).token
        : null;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/trade/reject",
        { tradeId },
        config
      );

      // Remove rejected trade from the pending list
      setPendingTrades(pendingTrades.filter((trade) => trade._id !== tradeId));

      alert("Trade Rejected");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to reject trade");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Pending Trades</h1>
      <div className="space-y-6">
        {pendingTrades.map((trade) => (
          <div
            key={trade._id}
            className="bg-white shadow-lg p-6 flex items-center justify-between"
          >
            {/* Left Section: Two Product Images */}
            <div className="flex space-x-4">
              {/* User's Product */}
              <div className="flex items-center">
                <img
                  src={trade.offererProduct.imageUrl} // Assuming imageUrl field in Product model
                  alt="Offerer's Product"
                  className="w-32 h-32 object-cover rounded-md"
                />
                <div className="ml-4">
                  <h2>Offerer Product</h2>
                  <h4 className="text-lg font-semibold">
                    {trade.offererProduct.name}
                  </h4>
                  <p className="text-gray-600">
                    Price: ${trade.offererProduct.price}
                  </p>
                </div>
              </div>

              {/* Receiver's Product */}
              <div className="flex items-center">
                <img
                  src={trade.receiverProduct.imageUrl} // Assuming imageUrl field in Product model
                  alt="Receiver's Product"
                  className="w-32 h-32 object-cover rounded-md"
                />
                <div className="ml-4">
                  <h2>Your Product</h2>
                  <h4 className="text-lg font-semibold">
                    {trade.receiverProduct.name}
                  </h4>
                  <p className="text-gray-600">
                    Price: ${trade.receiverProduct.price}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section: Start Trade and Reject Trade Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => handleAcceptTrade(trade._id)}
                className="bg-yellow-400 text-white py-2 px-4 rounded-lg"
              >
                Start Trade
              </button>
              <button
                onClick={() => handleRejectTrade(trade._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
              >
                Reject Trade
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingItems;
