import Link from "next/link";


const Tiers = () => {
  const tiers = [
    {
      title: "Tier 1",
      price: "0-100",
      description:
        "This tier offers basic services with limited features. Very good one",
    },
    {
      title: "Tier 2",
      price: "101-200",
      description:
        "This tier provides intermediate features for more flexibility. Very good one",
    },
    {
      title: "Tier 3",
      price: "201-300",
      description:
        "This tier is for advanced users with premium features. Very good one",
    },
  ];

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
            className="bg-black p-8 rounded-lg shadow-lg flex flex-col items-start" // Align text to the left
            style={{ minWidth: "300px" }} // Increase card width
          >
            <h3 className="text-3xl font-bold text-white mb-4">{tier.title}</h3>

            {/* Pricing */}
            <div className="bg-[#D5B868] text-black text-2xl font-bold py-2 px-4 rounded-lg mb-6">
              {tier.price}
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

export default Tiers;
