"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const PendingItems = ({ loginInfo }) => {
  const [pendingTrades, setPendingTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending trades from backend API
  useEffect(() => {
    const fetchPendingTrades = async () => {
      try {
        const token = loginInfo ? loginInfo.user.token : null;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/trade/pending`,
          config
        );
        setPendingTrades(data.data);
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching trades");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingTrades();
  }, [loginInfo]);

  const handleAcceptTrade = async (tradeId) => {
    try {
      const token = loginInfo ? loginInfo.user.token : null;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/trade/accept`,
        { tradeId },
        config
      );

      // Remove accepted trade from the pending list
      setPendingTrades(pendingTrades.filter((trade) => trade._id !== tradeId));
      toast.success("Trade Accepted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to accept trade");
    }
  };

  const handleRejectTrade = async (tradeId) => {
    try {
      const token = loginInfo ? loginInfo.user.token : null;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/trade/reject`,
        { tradeId },
        config
      );

      // Remove rejected trade from the pending list
      setPendingTrades(pendingTrades.filter((trade) => trade._id !== tradeId));
      toast.success("Trade Rejected");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject trade");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <ToastContainer
        position="top-right" // Positioning the toast
        autoClose={3000} // Duration for toast visibility
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="light"
        style={{ zIndex: 9999 }} // Ensure it stays on top
      />
      <h1 className="text-2xl font-bold mb-6">Pending Trades</h1>
      <div className="space-y-6">
        {pendingTrades.map((trade) => (
          <div
            key={trade._id}
            className="bg-white shadow-lg p-4 md:p-6 flex flex-col md:flex-row items-center justify-between rounded-md"
          >
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full">
              {/* User's Product */}
              <div className="flex items-center w-full md:w-1/2">
                <img
                  src={trade.offererProduct.imageUrl}
                  alt="Offerer's Product"
                  className="w-32 h-32 object-cover rounded-md"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">Offerer Product</h2>
                  <h4 className="text-xl font-semibold">
                    {trade.offererProduct.name}
                  </h4>
                  <p className="text-gray-600">
                    Price: ${trade.offererProduct.price}
                  </p>
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
                </div>
              </div>

              {/* Receiver's Product */}
              <div className="flex items-center w-full md:w-1/2">
                <img
                  src={trade.receiverProduct.imageUrl}
                  alt="Receiver's Product"
                  className="w-32 h-32 object-cover rounded-md"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">Your Product</h2>
                  <h4 className="text-xl font-semibold">
                    {trade.receiverProduct.name}
                  </h4>
                  <p className="text-gray-600">
                    Price: ${trade.receiverProduct.price}
                  </p>
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
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
              <button
                onClick={() => handleAcceptTrade(trade._id)}
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-yellow-500 transition w-full md:w-auto"
              >
                Start Trade
              </button>
              <button
                onClick={() => handleRejectTrade(trade._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition w-full md:w-auto"
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
