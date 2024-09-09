import React from "react";

const TradeHistory = () => {
  // Sample data for trade history
  const tradeHistory = [
    {
      id: 1,
      userProduct: {
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
        name: "User Product 1",
        price: "$100",
      },
      tradeProduct: {
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
        name: "Trade Product 1",
        price: "$150",
      },
      startDate: "2023-08-15",
      endDate: "2023-08-20",
    },
    {
      id: 2,
      userProduct: {
        image:
          "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1999&auto=format&fit=crop",
        name: "User Product 2",
        price: "$120",
      },
      tradeProduct: {
        image:
          "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1974&auto=format&fit=crop",
        name: "Trade Product 2",
        price: "$180",
      },
      startDate: "2023-07-10",
      endDate: "2023-07-15",
    },
    {
      id: 3,
      userProduct: {
        image:
          "https://images.unsplash.com/photo-1574169208507-843761748e2a?q=80&w=1999&auto=format&fit=crop",
        name: "User Product 3",
        price: "$90",
      },
      tradeProduct: {
        image:
          "https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=1999&auto=format&fit=crop",
        name: "Trade Product 3",
        price: "$130",
      },
      startDate: "2023-06-01",
      endDate: "2023-06-05",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Trade History</h1>
      <div className="space-y-6">
        {tradeHistory.map((trade) => (
          <div
            key={trade.id}
            className="bg-white shadow-lg p-6 flex items-center justify-between"
          >
            {/* Left Section: Two Product Images */}
            <div className="flex space-x-4">
              {/* User's Product */}
              <div className="flex items-center">
                <img
                  src={trade.userProduct.image}
                  alt="User's Product"
                  className="w-32 h-32 object-cover rounded-md"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">
                    {trade.userProduct.name}
                  </h4>
                  <p className="text-gray-600">
                    Price: {trade.userProduct.price}
                  </p>
                </div>
              </div>

              {/* Other User's Product */}
              <div className="flex items-center">
                <img
                  src={trade.tradeProduct.image}
                  alt="Other User's Product"
                  className="w-32 h-32 object-cover rounded-md"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">
                    {trade.tradeProduct.name}
                  </h4>
                  <p className="text-gray-600">
                    Price: {trade.tradeProduct.price}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section: Trade Details */}
            <div className="text-right">
              <p className="text-gray-600">Trade Started: {trade.startDate}</p>
              <p className="text-gray-600">Trade Ended: {trade.endDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeHistory;
