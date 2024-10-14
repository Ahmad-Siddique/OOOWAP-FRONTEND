"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

const AcceptedTrades = ({ loginInfo }) => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [reviewStars, setReviewStars] = useState(0);

  // Fetch accepted/completed trades from backend API
  const fetchTrades = async () => {
    try {
      const token = loginInfo ? loginInfo.user.token : null;
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
      const token = loginInfo ? loginInfo.user.token : null;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

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

  const handleToggleStatus = async (trade) => {
    try {
      const token = loginInfo ? loginInfo.user.token : null;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const newStatus =
        loginInfo?.user.id === trade.offerer._id.toString()
          ? "offererStatus"
          : "receiverStatus";

      await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/trade/toggletrade/${trade._id}`,
        config
      );

      fetchTrades();
      // toast.success("Status updated successfully!");
    } catch (error) {
      console.log(error)
      // toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-black">
        Accepted/Completed Trades
      </h1>
      <div className="space-y-8">
        {trades &&
          trades.map((trade) => {
            const currentDate = new Date();
            const endDate = new Date(trade.endDate);
            const isCompletedOrExpired = trade.status === "completed";
            const isOfferer =
              loginInfo?.user.id === trade.offerer._id.toString();
            const isReceiver =
              loginInfo?.user.id === trade.receiver._id.toString();
            const offererReviewExists = trade.offererReview;
            const receiverReviewExists = trade.receiverReview;
            const showReviewButton =
              (isOfferer && !offererReviewExists) ||
              (isReceiver && !receiverReviewExists);
            const userTradeStatus = isOfferer
              ? trade.offererFinished
              : trade.receiverFinished;
            const showToggleButton = trade.status !== "completed";

            return (
              <div
                key={trade._id}
                className="bg-white shadow-lg p-6 flex flex-col md:flex-row items-start justify-between rounded-lg border border-gray-300 transition-transform transform hover:scale-105"
              >
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full">
                  {/* Offerer's Product */}
                  <div className="flex items-center w-full md:w-1/2">
                    <img
                      src={trade.offererProduct.imageUrl}
                      alt="Offerer's Product"
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md shadow-md"
                    />
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold text-[#D5B868]">
                        {trade.offerer._id === loginInfo?.user.id
                          ? "Offerer Product"
                          : "Your Product"}
                      </h2>
                      <h4 className="text-xl font-semibold text-gray-800">
                        {trade.offererProduct.name}
                      </h4>
                      <p className="text-gray-600">
                        Price:{" "}
                        <span className="font-bold">
                          ${trade.offererProduct.price}
                        </span>
                      </p>
                      <div className="mt-2 space-y-1">
                        <Link
                          href={`/home/shop/${trade.offererProduct?.productNumber}`}
                          className="text-black hover:underline"
                        >
                          View Product
                        </Link>
                        <br />
                        <Link
                          href={`/home/store/${trade.offererProduct?.userId}`}
                          className="text-black hover:underline"
                        >
                          View Store
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Receiver's Product */}
                  <div className="flex items-center w-full md:w-1/2">
                    <img
                      src={trade.receiverProduct.imageUrl}
                      alt="Receiver's Product"
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md shadow-md"
                    />
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold text-[#D5B868]">
                        {trade.receiver._id === loginInfo?.user.id
                          ? "Receiver Product"
                          : "Your Product"}
                      </h2>
                      <h4 className="text-xl font-semibold text-gray-800">
                        {trade.receiverProduct.name}
                      </h4>
                      <p className="text-gray-600">
                        Price:{" "}
                        <span className="font-bold">
                          ${trade.receiverProduct.price}
                        </span>
                      </p>
                      <div className="mt-2 space-y-1">
                        <Link
                          href={`/home/shop/${trade.receiverProduct?.productNumber}`}
                          className="text-black hover:underline"
                        >
                          View Product
                        </Link>
                        <br />
                        <Link
                          href={`/home/store/${trade.receiverProduct?.userId}`}
                          className="text-black hover:underline"
                        >
                          View Store
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0 w-full md:w-auto">
                  <p className="text-lg font-semibold">
                    Trade Status:{" "}
                    <span
                      className={`font-bold text-${
                        trade.status === "completed" ? "green" : "black"
                      }-500`}
                    >
                      {trade.status}
                    </span>
                  </p>

                  {/* Display Start and End Dates */}
                  <p className="text-lg font-semibold">
                    Start Date:{" "}
                    <span className="font-bold">
                      {new Date(trade.startDate).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-lg font-semibold">
                    End Date:{" "}
                    <span className="font-bold">
                      {new Date(trade.endDate).toLocaleDateString()}
                    </span>
                  </p>

                  <Link
                    href={`/home/my-account/accepted-completed-trades/${trade._id}`}
                  >
                    <button className="bg-[#D5B868] text-white py-2 px-4 rounded-lg hover:bg-[#F5BA41] transition w-full md:w-auto">
                      View Trade Details
                    </button>
                  </Link>
                  {isCompletedOrExpired && showReviewButton && (
                    <button
                      onClick={() => handleReviewClick(trade)}
                      className="bg-[#D5B868] text-white py-2 px-4 rounded-lg hover:bg-[#F5BA41] transition w-full md:w-auto"
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
      {showReviewPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-xl font-bold mb-4 text-[#D5B868]">
              Leave a Review
            </h2>
            <p className="mb-4">Rate your experience:</p>
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer ${
                    reviewStars >= star ? "text-[#D5B868]" : "text-gray-400"
                  }`}
                  onClick={() => setReviewStars(star)}
                />
              ))}
            </div>
            <button
              onClick={submitReview}
              className="bg-[#D5B868] text-white py-2 px-4 rounded-lg hover:bg-[#F5BA41] transition"
            >
              Submit Review
            </button>
            <button
              onClick={() => setShowReviewPopup(false)}
              className="mt-2 text-red-500 hover:underline"
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
