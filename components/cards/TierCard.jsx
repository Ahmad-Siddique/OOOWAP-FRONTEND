import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

const TierCard = ({ tier }) => {
  return (
    <div
      className="bg-black p-8 rounded-lg shadow-lg flex flex-col items-start" // Align text to the left
      style={{ minWidth: "250px" }} // Increase card width
    >
      <h3 className="text-2xl font-medium text-white uppercase mb-2">
        {tier.title}
      </h3>

      {/* Pricing */}
      <div className="bg-[#D5B868] text-black text-xl font-medium py-2 px-5 rounded-lg mb-6">
        {tier.price}
      </div>

      {/* Description */}
      <p className="text-white first-line:font-extralight mb-8">
        {tier.description}
      </p>
      {/* Enroll Button */}
      <Link
        href="/deposit"
        className="text-white group relative border-2 border-white hover:border-primary hover:text-primary transition-all duration-300 text-lg w-32 py-1 flex items-center justify-center"
      >
        Enroll
        <ChevronRightIcon className="h-5 w-0 group-hover:w-5 text-primary transition-all ease-in duration-150" />
      </Link>
    </div>
  );
};

export default TierCard;
