import React from "react";
import Sidebar from "./Sidebar";

const Products = () => {
  const products = [
    {
      name: "Product 1",
      price: "$50",
      trades: 5,
      rating: 4.5,
      imageUrl:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    },
    {
      name: "Product 2",
      price: "$70",
      trades: 8,
      rating: 3.5,
      imageUrl:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Product 3",
      price: "$100",
      trades: 3,
      rating: 5.0,
      imageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Main Row */}
      <div className="grid grid-cols-12 gap-4">
        {/* Products Section */}
        <div className="col-span-9">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-4 mb-6 flex items-center"
            >
              {/* Product Image */}
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-lg mr-4"
              />
              {/* Product Info */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold">
                  {product.name} ({product.price})
                </h2>
                <p className="text-gray-600">No. of Trades: {product.trades}</p>

                {/* Action Buttons */}
                <div className="mt-2 space-x-2">
                  <button className="btn btn-blue">Edit</button>
                  <button className="btn btn-yellow">Featured</button>
                  <button className="btn btn-red">Delete</button>
                </div>

                {/* Rating Section */}
                <div className="flex items-center mt-4">
                  <div className="flex">
                    {[...Array(5)].map((star, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.887 5.833h6.042c.969 0 1.371 1.24.588 1.81l-4.9 3.553 1.888 5.833c.3.922-.755 1.688-1.54 1.117L10 14.347l-4.916 3.556c-.785.571-1.84-.195-1.54-1.117l1.888-5.833-4.9-3.553c-.784-.57-.38-1.81.588-1.81h6.042l1.887-5.833z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">({product.rating})</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Section */}
        <div className="col-span-3">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Products;
