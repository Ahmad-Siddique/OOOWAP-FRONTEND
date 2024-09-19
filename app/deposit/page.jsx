"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const DepositPage = () => {
  const [amount, setAmount] = useState(1); // Start with minimum value
  const [loading, setLoading] = useState(false);
  const { loginInfo } = useSelector((state) => state.auth);

  const handleDeposit = async (e) => {
    e.preventDefault();

    // Ensure amount is at least 1
    if (amount < 1) {
      toast.error("Deposit amount must be at least $1.");
      return;
    }

    setLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${loginInfo?.token}`,
      },
    };

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/stripe/one-time-checkout",
        {
          oneTimeFeeAmount: amount,
          oneTimeFeeDescription: "Payment for the website",
          customerEmail: loginInfo.user.email,
          displayName: loginInfo.user.firstName,
          userId: loginInfo.user.id,
        },
        config
      );
      const { url } = response.data;

      window.location.href = url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Error creating deposit session", error);
      toast.error("Failed to start deposit process.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Deposit Money
        </h1>
        <form onSubmit={handleDeposit}>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-black"
            >
              Enter Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Math.max(1, e.target.value))} // Ensure minimum value
              required
              min="1" // Minimum value attribute
              className="mt-1 block w-full p-2 border border-[#F5BA41] rounded-md"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-[#F5BA41] text-black font-semibold rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Deposit"}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default DepositPage;
