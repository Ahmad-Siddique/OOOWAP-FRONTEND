"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FiCheckCircle, FiXCircle } from "react-icons/fi"; // For success and failure icons
import "daisyui";

const PaymentStatus = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("checkout_status");
  const value = searchParams.get("checkout_value");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        {status ? (
          <div className="text-center">
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
        ) : (
          <div className="text-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
            <p className="text-lg font-medium mt-4">Processing payment...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Payment = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentStatus />
    </Suspense>
  );
};

export default Payment;
