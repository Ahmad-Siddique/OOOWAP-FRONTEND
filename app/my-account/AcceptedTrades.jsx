"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

const AcceptedTrades = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [reviewStars, setReviewStars] = useState(0);
  const { loginInfo } = useSelector((state) => state.auth);

  // Fetch accepted/completed trades from backend API
  const fetchTrades = async () => {
    try {
      const token = loginInfo ? loginInfo.token : null;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/trade/getusertradehistory`,
        config
      );
      setTrades(data);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching trades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, [loginInfo]);

  // Handle review submission
  const submitReview = async () => {
    const reviewingFor =
      loginInfo?.user.id === selectedTrade.offerer._id.toString()
        ? "offerer"
              : "receiver"; // Determine who to review
      
      
    try {
      const token = loginInfo ? loginInfo.token : null;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        };
        
        console.log(config)

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/trade/review`,
        { tradeId: selectedTrade._id, rating: reviewStars, reviewingFor },
        config
      );

      // Close the popup and refresh trades
      setShowReviewPopup(false);
      setSelectedTrade(null);
      setReviewStars(0);
      toast.success("Review submitted successfully!");

      // Fetch trades again to update the UI
      fetchTrades();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    }
  };

  const handleReviewClick = (trade) => {
    setSelectedTrade(trade);
    setShowReviewPopup(true);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Accepted/Completed Trades</h1>
      <div className="space-y-6">
        {trades &&
          trades.map((trade) => {
            const currentDate = new Date();
            const endDate = new Date(trade.endDate);
            const isCompletedOrExpired =
              trade.status === "completed" || endDate < currentDate;

            const isOfferer = loginInfo?.user.id === trade.offerer._id.toString();
            const isReceiver =
              loginInfo?.user.id === trade.receiver._id.toString();

            const offererReviewExists = trade.offererReview;
              const receiverReviewExists = trade.receiverReview;
              console.log(offererReviewExists, receiverReviewExists, isOfferer, isReceiver);
            const showReviewButton =
              (isOfferer && !offererReviewExists) ||
              (isReceiver && !receiverReviewExists);

            console.log(showReviewButton)
            return (
              <div
                key={trade._id}
                className="bg-white shadow-lg p-4 md:p-6 flex flex-col md:flex-row items-center justify-between rounded-md"
              >
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full">
                  <div className="flex items-center w-full md:w-1/2">
                    <img
                      src={trade.offererProduct.imageUrl}
                      alt="Offerer's Product"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                    <div className="ml-4">
                                <h2 className="text-lg font-semibold">{trade.offerer._id == loginInfo?.user.id ? "Offerer Product" : "Your Product"}</h2>
                      <h4 className="text-xl font-semibold">
                        {trade.offererProduct.name}
                      </h4>
                      <p className="text-gray-600">
                        Price: ${trade.offererProduct.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center w-full md:w-1/2">
                    <img
                      src={trade.receiverProduct.imageUrl}
                      alt="Receiver's Product"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold">{trade.receiver._id == loginInfo?.user.id ? "Offerer Product" : "Your Product"}</h2>
                      <h4 className="text-xl font-semibold">
                        {trade.receiverProduct.name}
                      </h4>
                      <p className="text-gray-600">
                        Price: ${trade.receiverProduct.price}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
                  <p className="text-lg font-semibold">
                    Status: {trade.status}
                  </p>
                  {isCompletedOrExpired && showReviewButton && (
                    <button
                      onClick={() => handleReviewClick(trade)}
                      className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition w-full md:w-auto"
                    >
                      Leave Review
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {/* Review Popup */}
      {showReviewPopup && selectedTrade && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              Review{" "}
              {loginInfo.userId === selectedTrade.offerer.toString()
                ? "Offerer"
                : "Receiver"}
            </h2>
            <div className="flex justify-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={30}
                  className={`cursor-pointer ${
                    reviewStars >= star ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => setReviewStars(star)}
                />
              ))}
            </div>
            <button
              onClick={submitReview}
              className="bg-yellow-400 text-white py-2 px-4 rounded-lg hover:bg-yellow-500 transition w-full"
            >
              Submit Review
            </button>
            <button
              onClick={() => setShowReviewPopup(false)}
              className="mt-2 text-gray-600 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptedTrades;
