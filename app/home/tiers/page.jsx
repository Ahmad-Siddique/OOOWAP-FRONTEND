import { FaTrophy, FaStar, FaAward, FaMedal, FaCrown } from "react-icons/fa"; // Icons for the tiers
import Link from "next/link";
import TierCard from "@/components/cards/TierCard";

const tiers = [
  {
    title: "Tier 1",
    price: "$0 - $100",
    description:
      "Perfect for entry-level users. Start small and enjoy the basics.",
    icon: <FaTrophy className="text-6xl text-[#F5BA41]" />,
  },
  {
    title: "Tier 2",
    price: "$101 - $200",
    description: "Step up to unlock additional features and benefits.",
    icon: <FaStar className="text-6xl text-[#F5BA41]" />,
  },
  {
    title: "Tier 3",
    price: "$201 - $300",
    description: "A solid choice for those looking for more advanced options.",
    icon: <FaAward className="text-6xl text-[#F5BA41]" />,
  },
  {
    title: "Tier 4",
    price: "$301 - $400",
    description: "Experience premium features and exclusive benefits.",
    icon: <FaMedal className="text-6xl text-[#F5BA41]" />,
  },
  {
    title: "Tier 5",
    price: "$401 and above",
    description: "The ultimate tier with top-tier benefits and perks.",
    icon: <FaCrown className="text-6xl text-[#F5BA41]" />,
  },
];

const TiersPage = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h2 className="text-5xl text-gray-900 text-center mb-12">
        <span className="font-light">OUR</span>{" "}
        <span className="font-bold">MEMBERSHIP</span>{" "}
        <span className="font-light">TIERS</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, index) => (
          <TierCard key={index} tier={tier} />
        ))}
      </div>
    </div>
  );
};

export default TiersPage;
