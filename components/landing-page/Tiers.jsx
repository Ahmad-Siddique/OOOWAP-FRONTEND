import TierCard from "@/components/cards/TierCard";

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
      <div className="flex flex-col items-center gap-2 mb-12 justify-center">
        <h2 className="text-2xl md:text-4xl text-gray-900 text-center">
          <span className="font-light">OUR</span>{" "}
          <span className="font-bold">MEMBERSHIP</span>{" "}
          <span className="font-light">TIERS</span>
        </h2>
        <div className="bg-primary h-0.5 w-32"></div>
      </div>

      <div className="grid grid-cols-1 lg:px-5 md:grid-cols-3 gap-8">
        {tiers.map((tier, index) => (
          <TierCard key={index} tier={tier} />
        ))}
      </div>
    </div>
  );
};

export default Tiers;
