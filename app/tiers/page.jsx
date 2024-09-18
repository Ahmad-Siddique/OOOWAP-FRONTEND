import React from "react";
import { FaTrophy, FaStar, FaAward, FaMedal, FaCrown } from "react-icons/fa"; // Icons for the tiers

const tiers = [
  {
    title: "Tier 1",
    range: "$0 - $100",
    description:
      "Perfect for entry-level users. Start small and enjoy the basics.",
    icon: <FaTrophy className="text-6xl text-[#F5BA41]" />,
  },
  {
    title: "Tier 2",
    range: "$101 - $200",
    description: "Step up to unlock additional features and benefits.",
    icon: <FaStar className="text-6xl text-[#F5BA41]" />,
  },
  {
    title: "Tier 3",
    range: "$201 - $300",
    description: "A solid choice for those looking for more advanced options.",
    icon: <FaAward className="text-6xl text-[#F5BA41]" />,
  },
  {
    title: "Tier 4",
    range: "$301 - $400",
    description: "Experience premium features and exclusive benefits.",
    icon: <FaMedal className="text-6xl text-[#F5BA41]" />,
  },
  {
    title: "Tier 5",
    range: "$401 and above",
    description: "The ultimate tier with top-tier benefits and perks.",
    icon: <FaCrown className="text-6xl text-[#F5BA41]" />,
  },
];

const TiersPage = () => {
  return (
    <div className="bg-gray-100 py-10 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-black text-center mb-10">
          Our Tiers
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className="relative rounded-lg shadow-lg bg-white border border-gray-200"
            >
              <div className="p-6 text-center">
                <div className="mb-4">{tier.icon}</div>
                <h2 className="text-3xl font-bold text-black mb-2">
                  {tier.title}
                </h2>
                <p className="text-xl font-semibold text-[#F5BA41] mb-4">
                  {tier.range}
                </p>
                <p className="text-lg text-gray-700">{tier.description}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#F5BA41] to-transparent opacity-20"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TiersPage;
