"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateuserprofilecheck } from "../GlobalRedux/features/auth/authSlice";
import "react-toastify/dist/ReactToastify.css";

const RefundPage = () => {
  const [refundAmount, setRefundAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Getting loginInfo from Redux state
  const loginInfo = useSelector((state) => state.auth.loginInfo);

  const handleRefund = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = loginInfo ? loginInfo.token : null;
      console.log("TOKEN",token)
       const config = {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       };
      // Send the refund request to the API
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/stripe/refund", {
        amount: refundAmount,
      }, config);

      if (response.data.success) {
        toast.success("Refund request successful!");

        // After refund is processed, fetch the updated user profile
        const fetchUserData = async () => {
          try {
            const token = loginInfo ? loginInfo.token : null;

            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };

            // Fetch the updated user profile after refund
            const response = await axios.get(
              process.env.NEXT_PUBLIC_API_URL + "/auth/getMe",
              config
            );

            // Dispatch the action to update both Redux store and localStorage
            dispatch(
              updateuserprofilecheck({
                zz: {
                  firstName: response.data.data.firstName,
                  lastName: response.data.data.lastName,
                  balance: response.data.data.balance, // Updated balance after refund
                  email: response.data.data.email,
                  image: response.data.data.photoURL,
                },
                gg: loginInfo,
              })
            );
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };

        // Fetch updated user data after refund
        await fetchUserData();
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

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Refund Money
        </h1>
        <form onSubmit={handleRefund}>
          <div className="mb-4">
            <label
              htmlFor="refundAmount"
              className="block text-sm font-medium text-black"
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
              className="mt-1 block w-full p-2 border border-[#D5B868] rounded-md"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-[#D5B868] text-white font-semibold rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-500"
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
