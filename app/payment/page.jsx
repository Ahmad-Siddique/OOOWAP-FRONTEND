"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FiCheckCircle, FiXCircle } from "react-icons/fi"; // For success and failure icons
import "daisyui";

const Payment = () => {
     const searchParams = useSearchParams();
    const status = searchParams.get("checkout_status");
    const value = searchParams.get("checkout_value");
  
    console.log("CHECKOUT STATUS: ",status)
//     useEffect(() => {
//       console.log("Router Query1:", router);
//     if (router.isReady) {
//       // Debug: Check the entire query object
//       console.log("Router Query:", router.query);

//       const { checkout_Id, checkout_status, checkout_value } = router.query;

//       // Handle the case where parameters might be undefined or not present
//       if (checkout_status && checkout_value) {
//         setStatus({
//           status: checkout_status,
//           value: checkout_value,
//         });
//       } else {
//         console.error("Missing query parameters");
//       }
//     }
//   }, [router.isReady, router.query]);

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

export default Payment;
