"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FiCheckCircle, FiXCircle } from "react-icons/fi"; // Success and failure icons
import axios from "axios";

const PaymentStatus = ({ loginInfo }) => {
  const searchParams = useSearchParams();

  const [status, setStatus] = useState(null);
  const [value, setValue] = useState(null);

  useEffect(() => {
    // Fetching checkout status and value from URL
    const statusParam = searchParams.get("checkout_status");
    const valueParam = searchParams.get("checkout_value");

    setStatus(statusParam);
    setValue(valueParam);


    // Making API call to fetch user info
    const fetchUserData = async () => {
      try {
        // Fetching ooowap-user from localStorage
        const localStorageUser = JSON.parse(
          localStorage.getItem("ooowap-user")
        );

        // Check if loginInfo or token exists
        const token = localStorageUser ? localStorageUser.token : null;

        if (!token) {
          console.error("Token not found in localStorage.");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch user data from API
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/auth/getMe",
          config
        );

        const apiUserData = response.data.data;
        console.log(apiUserData.balance, localStorageUser.balance)
        // Compare balance in localStorage and API response
        if (localStorageUser.balance !== apiUserData.balance) {
          // Update localStorage with the new balance and other user data
          localStorageUser.firstName = apiUserData.firstName;
          localStorageUser.lastName = apiUserData.lastName;
          localStorageUser.balance = apiUserData.balance;
          localStorageUser.email = apiUserData.email;
          localStorageUser.picture = apiUserData.photoURL;

          // Store updated user data in localStorage
          localStorage.setItem("ooowap-user", JSON.stringify(localStorageUser));

          // Reload the page to reflect updated user data
          window.location.reload();
        }
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
              You have successfully deposited{" "}
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
export default function PaymentStatusPage({ loginInfo }) {
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
      <PaymentStatus loginInfo={loginInfo} />
    </Suspense>
  );
}
