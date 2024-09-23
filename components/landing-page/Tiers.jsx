import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const Tiers = () => {
  const tiers = [
    {
      title: "Tier 1",
      price: "0-200",
      description:
        "This tier offers basic services with limited features. Very good one",
    },
    {
      title: "Tier 2",
      price: "201-500",
      description:
        "This tier provides intermediate features for more flexibility. Very good one",
    },
    {
      title: "Tier 3",
      price: "501-above",
      description:
        "This tier is for advanced users with premium features. Very good one",
    },
  ];

  return (
    <div className="container mx-auto py-16 px-4">
      <h2 className="text-2xl md:text-5xl text-gray-900 text-center mb-12">
        <span className="font-light">OUR</span>{" "}
        <span className="font-bold">MEMBERSHIP</span>{" "}
        <span className="font-light">TIERS</span>
      </h2>
      <div className="grid grid-cols-1 lg:px-5 md:grid-cols-3 gap-8">
        {tiers.map((tier, index) => (
          <div
            key={index}
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
        ))}
      </div>
    </div>
  );
};

export default Tiers;
