import React from "react";

const PendingItems = () => {
  // Sample data for products
  const pendingTrades = [
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
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Pending Trades</h1>
      <div className="space-y-6">
        {pendingTrades.map((trade) => (
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

            {/* Right Section: Start Trade Button */}
            <div>
              <button className="bg-yellow-400 text-white py-2 px-4 rounded-lg">
                Start Trade
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingItems;
