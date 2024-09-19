import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  const { loginInfo } = useSelector((state) => state.auth);
  const [metrics, setMetrics] = useState({ trades: 0, reviews: 0 });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/getusermetrics`,
          {
            headers: {
              Authorization: `Bearer ${loginInfo.token}`,
            },
          }
        );
        setMetrics(response.data);
      } catch (error) {
        toast.error("Error fetching metrics!");
      }
    };

    fetchMetrics();
  }, [loginInfo.token]);

  return (
    <div className="bg-white shadow-lg p-6 text-center rounded-lg max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
      {/* User Image */}
      {loginInfo?.user?.image ? (
        <img
          src={loginInfo.user.image}
          alt={`Profile picture of ${loginInfo.user.name || "User"}`}
          className="rounded-full w-24 h-24 mb-4 mx-auto object-cover sm:w-32 sm:h-32"
        />
      ) : (
        <div className="w-24 h-24 mb-4 mx-auto flex items-center justify-center bg-gray-200 rounded-full sm:w-32 sm:h-32">
          <span className="text-gray-500">No Image</span>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mt-4 text-center text-gray-700 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        <div>
          <h5 className="font-bold text-gray-700">Trades</h5>
          <p className="text-2xl font-semibold text-gray-900">
            {metrics.trades}
          </p>
        </div>
        <div>
          <h5 className="font-bold text-gray-700">Reviews</h5>
          <p className="text-2xl font-semibold text-gray-900">
            {metrics.reviews}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
