import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = ({ loginInfo }) => {
  const [metrics, setMetrics] = useState({ trades: 0, reviews: 0 });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/getusermetrics`,
          {
            headers: {
              Authorization: `Bearer ${loginInfo?.user?.token}`,
            },
          }
        );
        setMetrics(response.data);
      } catch (error) {
        
        // toast.error("Error fetching metrics!");
      }
    };

    fetchMetrics();
  }, [loginInfo?.user?.token]);

  return (
    <div className="relative w-full h-96">
      <div className="bg-[#F5E9A6] left-3 top-3 p-6 absolute w-full text-center">
        {/* User Image */}
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          {loginInfo?.user?.image ? (
            <img
              src={loginInfo.user.image}
              alt={`Profile picture of ${loginInfo?.user.name || "User"}`}
              className="rounded-full w-24 h-24 mb-4 mx-auto object-cover sm:w-32 sm:h-32"
            />
          ) : (
            <div className="w-24 h-24 mb-4 mx-auto flex items-center justify-center bg-gray-200 rounded-full sm:w-32 sm:h-32">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <h1 className="text-xl font-bold">
            {loginInfo?.user?.firstName + " " + loginInfo?.user?.lastName ||
              "User"}
          </h1>
          <span className="text-sm mb-10">March 26th, 2023</span>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mt-4 text-center text-gray-700">
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.trades}
            </p>
            <h5 className="text-sm text-gray-700">Trades</h5>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.reviews}
            </p>
            <h5 className="text-sm text-gray-700">Reviews</h5>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.totalQuestions}
            </p>
            <h5 className="text-sm text-gray-700">Comments</h5>
          </div>
        </div>
      </div>
      <div className="bg-[#FDDC26] left-2 top-2 p-6 absolute w-full text-center">
        {/* User Image */}
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          {loginInfo?.user?.image ? (
            <img
              src={loginInfo.user.image}
              alt={`Profile picture of ${loginInfo?.user.name || "User"}`}
              className="rounded-full w-24 h-24 mb-4 mx-auto object-cover sm:w-32 sm:h-32"
            />
          ) : (
            <div className="w-24 h-24 mb-4 mx-auto flex items-center justify-center bg-gray-200 rounded-full sm:w-32 sm:h-32">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <h1 className="text-xl font-bold">
            {loginInfo?.user?.firstName + " " + loginInfo?.user?.lastName ||
              "User"}
          </h1>
          <span className="text-sm mb-10">March 26th, 2023</span>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mt-4 text-center text-gray-700">
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.trades}
            </p>
            <h5 className="text-sm text-gray-700">Trades</h5>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.reviews}
            </p>
            <h5 className="text-sm text-gray-700">Reviews</h5>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.totalQuestions}
            </p>
            <h5 className="text-sm text-gray-700">Comments</h5>
          </div>
        </div>
      </div>
      <div className="bg-[#DFAF2E] left-1 top-1 p-6 absolute w-full text-center">
        {/* User Image */}
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          {loginInfo?.user?.image ? (
            <img
              src={loginInfo.user.image}
              alt={`Profile picture of ${loginInfo?.user.name || "User"}`}
              className="rounded-full w-24 h-24 mb-4 mx-auto object-cover sm:w-32 sm:h-32"
            />
          ) : (
            <div className="w-24 h-24 mb-4 mx-auto flex items-center justify-center bg-gray-200 rounded-full sm:w-32 sm:h-32">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <h1 className="text-xl font-bold">
            {loginInfo?.user?.firstName + " " + loginInfo?.user?.lastName ||
              "User"}
          </h1>
          <span className="text-sm mb-10">March 26th, 2023</span>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mt-4 text-center text-gray-700">
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.trades}
            </p>
            <h5 className="text-sm text-gray-700">Trades</h5>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.reviews}
            </p>
            <h5 className="text-sm text-gray-700">Reviews</h5>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.totalQuestions}
            </p>
            <h5 className="text-sm text-gray-700">Comments</h5>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 absolute w-full text-center">
        {/* User Image */}
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          {loginInfo?.user?.image ? (
            <img
              src={loginInfo.user.image}
              alt={`Profile picture of ${loginInfo?.user.name || "User"}`}
              className="rounded-full w-24 h-24 mb-4 mx-auto object-cover sm:w-32 sm:h-32"
            />
          ) : (
            <div className="w-24 h-24 mb-4 mx-auto flex items-center justify-center bg-gray-200 rounded-full sm:w-32 sm:h-32">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <h1 className="text-xl font-bold">
            {loginInfo?.user?.firstName + " " + loginInfo?.user?.lastName ||
              "User"}
          </h1>
          <span className="text-sm mb-10">March 26th, 2023</span>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mt-4 text-center text-gray-700">
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.trades}
            </p>
            <h5 className="text-sm text-gray-700">Trades</h5>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.reviews}
            </p>
            <h5 className="text-sm text-gray-700">Reviews</h5>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.totalQuestions}
            </p>
            <h5 className="text-sm text-gray-700">Comments</h5>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 absolute w-full text-center">
        {/* User Image */}
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          {loginInfo?.user?.image ? (
            <img
              src={loginInfo.user.image}
              alt={`Profile picture of ${loginInfo?.user.name || "User"}`}
              className="rounded-full w-24 h-24 mb-4 mx-auto object-cover sm:w-32 sm:h-32"
            />
          ) : (
            <div className="w-24 h-24 mb-4 mx-auto flex items-center justify-center bg-gray-200 rounded-full sm:w-32 sm:h-32">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <h1 className="text-xl font-bold">
            {loginInfo?.user?.firstName + " " + loginInfo?.user?.lastName ||
              "User"}
          </h1>
          <span className="text-sm mb-10">March 26th, 2023</span>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mt-4 text-center text-gray-700">
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.trades}
            </p>
            <h5 className="text-sm text-gray-700">Trades</h5>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.reviews}
            </p>
            <h5 className="text-sm text-gray-700">Reviews</h5>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.totalQuestions}
            </p>
            <h5 className="text-sm text-gray-700">Comments</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
