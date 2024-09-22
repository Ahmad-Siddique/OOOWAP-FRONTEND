
import { FaTrophy, FaStar, FaAward, FaMedal, FaCrown } from "react-icons/fa"; // Icons for the tiers
import Link from "next/link";

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
    <div className="container mx-auto py-16 px-4">
      <h2 className="text-5xl text-gray-900 text-center mb-12">
        <span className="font-light">OUR</span>{" "}
        <span className="font-bold">MEMBERSHIP</span>{" "}
        <span className="font-light">TIERS</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, index) => (
          <div
            key={index}
            className="bg-black p-8 rounded-lg shadow-lg flex flex-col items-start"
            style={{ minWidth: "300px" }}
          >
            <div className="mb-4 text-center">{tier.icon}</div>
            <h3 className="text-3xl font-bold text-white mb-4">{tier.title}</h3>

            {/* Pricing */}
            <div className="bg-[#D5B868] text-black text-2xl font-bold py-2 px-4 rounded-lg mb-6">
              {tier.range}
            </div>

            {/* Description */}
            <p className="text-white mb-8">{tier.description}</p>

            {/* Enroll Button */}
            <Link
              href="/deposit"
              className="text-white border border-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition-all duration-300 text-lg w-36 h-16 flex items-center justify-center"
            >
              Enroll
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TiersPage;
