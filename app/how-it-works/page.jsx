"use client";
import React from "react";
import {
  FaExchangeAlt,
  FaShippingFast,
  FaMoneyBillWave,
  FaHandshake,
} from "react-icons/fa";
import "daisyui/dist/full.css"; // Ensure DaisyUI styles are imported

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">How It Works</h1>
          <p className="text-lg text-gray-700">
            Discover how our platform makes exchanging products easy and
            seamless with a small shipping fee. Follow these simple steps to
            start exchanging products today.
          </p>
        </div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: (
                <FaExchangeAlt
                  className="text-4xl text-[#F5BA41]"
                  aria-label="Upload an Item"
                />
              ),
              title: "Upload an Item",
              description:
                "Start by uploading an item you want to exchange. Make sure it’s in good condition and matches our guidelines.",
            },
            {
              icon: (
                <FaShippingFast
                  className="text-4xl text-[#F5BA41]"
                  aria-label="Browse & Choose"
                />
              ),
              title: "Browse & Choose",
              description:
                "Browse through the available items and choose what you desire. Each item is priced similarly for a smooth exchange.",
            },
            {
              icon: (
                <FaMoneyBillWave
                  className="text-4xl text-[#F5BA41]"
                  aria-label="Pay Shipping Fee"
                />
              ),
              title: "Pay Shipping Fee",
              description:
                "Pay a small shipping fee to process your exchange. This fee is for handling and delivery of the items.",
            },
            {
              icon: (
                <FaHandshake
                  className="text-4xl text-[#F5BA41]"
                  aria-label="Receive & Exchange"
                />
              ),
              title: "Receive & Exchange",
              description:
                "Receive your new item and once the exchange is complete, the shipping fee is refunded to your wallet.",
            },
          ].map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <div className="mb-4">{step.icon}</div>
              <h2 className="text-xl font-semibold text-black mb-2">
                {step.title}
              </h2>
              <p className="text-gray-600 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
