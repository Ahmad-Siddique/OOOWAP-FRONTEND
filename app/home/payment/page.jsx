"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FiCheckCircle, FiXCircle } from "react-icons/fi"; // Success and failure icons
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateuserprofilecheck } from "../../../redux/features/auth/authSlice";

const PaymentStatus = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const [status, setStatus] = useState(null);
  const [value, setValue] = useState(null);

  // Getting loginInfo from Redux state
  const loginInfo = useSelector((state) => state.auth.loginInfo);

  useEffect(() => {
    // Fetching checkout status and value from URL
    const statusParam = searchParams.get("checkout_status");
    const valueParam = searchParams.get("checkout_value");

    setStatus(statusParam);
    setValue(valueParam);

    // Making API call to fetch user info
    const fetchUserData = async () => {
      try {
        const token = loginInfo ? loginInfo.token : null;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/auth/getMe",
          config
        );

        // Dispatching both the API response and loginInfo to update user profile
        dispatch(
          updateuserprofilecheck({
            zz: {
              firstName: response.data.data.firstName,
              lastName: response.data.data.lastName,
              balance: response.data.data.balance,
              email: response.data.data.email,
              image: response.data.data.photoURL,
            }, // API response data
            gg: loginInfo, // loginInfo from Redux
          })
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (status === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
          <p className="text-lg font-medium mt-4">Processing payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full text-center">
        {status === "success" ? (
          <>
            <FiCheckCircle className="text-green-500 mx-auto text-6xl" />
            <h2 className="text-2xl font-bold mt-4">Payment Successful!</h2>
            <p className="mt-2 text-lg text-gray-600">
              You have successfully paid{" "}
              <span className="font-semibold">${value}</span>.
            </p>
          </>
        ) : (
          <>
            <FiXCircle className="text-red-500 mx-auto text-6xl" />
            <h2 className="text-2xl font-bold mt-4">Payment Failed</h2>
            <p className="mt-2 text-lg text-gray-600">
              The payment was unsuccessful or canceled. Please try again.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// Use Suspense for client-side hooks that need to wait for data
export default function PaymentStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full text-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
            <p className="text-lg font-medium mt-4">Loading...</p>
          </div>
        </div>
      }
    >
      <PaymentStatus />
    </Suspense>
  );
}
