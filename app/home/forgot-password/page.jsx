"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/auth/forgotPassword", {
        email,
      });

      if (response.data.success) {
        toast.success("Password reset email sent. Please check your inbox.", {
          closeOnClick: true,
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send email.", {
        closeOnClick: true,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Send Reset Link
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPasswordPage;
