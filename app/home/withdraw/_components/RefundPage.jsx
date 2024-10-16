"use client";

import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RefundPage = ({ loginInfo }) => {
  const [refundAmount, setRefundAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRefund = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = loginInfo ? loginInfo.user.token : null;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/stripe/refund`,
        { amount: refundAmount },
        config
      );

      if (response.data.success) {
        toast.success("Refund request successful!");
        await fetchUpdatedUserData(token); // Fetch updated user data
      } else {
        throw new Error("Failed to process refund");
      }
    } catch (error) {
      console.error("Error processing refund", error);
      toast.error("Failed to process refund.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUpdatedUserData = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/getMe`,
        config
      );

      const apiUserData = response.data.data;
      const localStorageUser = JSON.parse(localStorage.getItem("ooowap-user"));

      // Compare balance and update localStorage if different
      if (localStorageUser.balance !== apiUserData.balance) {
        localStorageUser.firstName = apiUserData.firstName;
        localStorageUser.lastName = apiUserData.lastName;
        localStorageUser.balance = apiUserData.balance;
        localStorageUser.email = apiUserData.email;
        localStorageUser.picture = apiUserData.photoURL;

        // Store updated user data in localStorage
        localStorage.setItem("ooowap-user", JSON.stringify(localStorageUser));

        // Reload the page to reflect the updated user data
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">
          Request a Refund
        </h1>
        <form onSubmit={handleRefund} className="space-y-6">
          <div className="mb-4">
            <label
              htmlFor="refundAmount"
              className="block text-lg font-medium text-gray-700"
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
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D5B868] transition duration-150"
              placeholder="Enter amount to refund"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 px-4 bg-[#D5B868] text-white font-semibold rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#F5BA41]"
            } transition duration-150`}
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
