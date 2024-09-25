"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ResetPasswordPage = ({ params }) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const { password, confirmPassword } = formData;

  useEffect(() => {
    // Perform any side effects or cleanup, if necessary
  }, []);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", { closeOnClick: true });
      return;
    }

    try {
      // Make the API call to reset the password
      const response = await axios.put(
        process.env.NEXT_PUBLIC_API_URL +`/auth/resetpassword/${params.token}`, // Ensure token from URL params
        { password }
      );

      if (response.data.success) {
        toast.success("Password reset successful!", {
          closeOnClick: true,
          autoClose: 2000,
        });
        router.push("/login"); // Redirect to login page after success
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reset password.",
        {
          closeOnClick: true,
          autoClose: 2000,
        }
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Reset Password
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPasswordPage;
