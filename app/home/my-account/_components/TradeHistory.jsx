"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link"; // Import Link for navigation

const TradeHistory = ({ loginInfo }) => {
  const [tradeHistory, setTradeHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTradeHistory = async () => {
      if (!loginInfo?.user.token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${loginInfo?.user.token}`,
          },
        };

        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/trade/history`,
          config
        );

        setTradeHistory(data.data);
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching trade history"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTradeHistory();
  }, [loginInfo]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg
          className="animate-spin h-8 w-8 text-yellow-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <span className="ml-2 text-gray-700">Loading trade history...</span>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Trade History</h1>
      <div className="space-y-6">
        {tradeHistory.length > 0 ? (
          tradeHistory.map((trade) => (
            <div
              key={trade._id}
              className="bg-white shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between"
            >
              {/* Left Section: Two Product Images */}
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Offerer's Product */}
                <div className="flex items-center space-x-4">
                  <img
                    src={trade.offererProduct?.imageUrl || "/placeholder.png"}
                    alt={`Offerer's Product: ${
                      trade.offererProduct?.name || "Unknown"
                    }`}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">
                      {trade.offererProduct?.name || "Unknown Product"}
                    </h4>
                    <p className="text-gray-600">
                      Price: ${trade.offererProduct?.price || "N/A"}
                    </p>
                    {/* View Product and View Store Links */}
                    <div className="mt-2 space-y-1">
                      <Link
                        href={`/home/shop/${trade.offererProduct?._id}`}
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
                    <p className="text-gray-500">
                      Offerer:{" "}
                      {trade.offererProduct.userId === loginInfo.user.id
                        ? "You"
                        : "Other User"}
                    </p>
                  </div>
                </div>

                {/* Receiver's Product */}
                <div className="flex items-center space-x-4">
                  <img
                    src={trade.receiverProduct?.imageUrl || "/placeholder.png"}
                    alt={`Receiver's Product: ${
                      trade.receiverProduct?.name || "Unknown"
                    }`}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">
                      {trade.receiverProduct?.name || "Unknown Product"}
                    </h4>
                    <p className="text-gray-600">
                      Price: ${trade.receiverProduct?.price || "N/A"}
                    </p>
                    {/* View Product and View Store Links */}
                    <div className="mt-2 space-y-1">
                      <Link
                        href={`/home/shop/${trade.receiverProduct?._id}`}
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
                    <p className="text-gray-500">
                      Receiver:{" "}
                      {trade.receiverProduct.userId === loginInfo.user.id
                        ? "You"
                        : "Other User"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Section: Trade Details */}
              <div className="text-right mt-4 sm:mt-0">
                <p className="text-gray-600">
                  Trade Status:{" "}
                  <span className="font-bold capitalize">{trade.status}</span>
                </p>
                <p className="text-gray-600">
                  Trade Started:{" "}
                  {trade.startDate
                    ? new Date(trade.startDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-gray-600">
                  Trade Ended:{" "}
                  {trade.endDate
                    ? new Date(trade.endDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No trade history found.</p>
        )}
      </div>
    </div>
  );
};

export default TradeHistory;
