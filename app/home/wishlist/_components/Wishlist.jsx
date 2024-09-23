"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Wishlist = ({ loginInfo }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = loginInfo ? loginInfo?.token : null;
  const router = useRouter();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchWishlist = async () => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/wishlist",
        config
      );
      setWishlist(data.products);
    } catch (err) {
      setError("Error fetching wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loginInfo) {
      router.push("/login");
    } else {
      fetchWishlist();
    }
  }, [loginInfo]);

  const handleRemove = async (productId) => {
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/wishlist/remove",
        { productId },
        config
      );
      setWishlist((prev) =>
        prev.filter((product) => product._id !== productId)
      );
    } catch (err) {
      setError("Error removing item");
    }
  };

  if (loading) {
    return <div className="text-center text-black text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-50 text-black py-12 px-6 min-h-screen">
      <h2 className="text-center text-5xl font-bold mb-8 text-[#D5B868]">
        Your Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <div className="text-center text-lg text-gray-600">
          Your wishlist is empty. Start adding products!
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md border border-gray-300"
                />
                <div>
                  <h3 className="text-2xl font-semibold">{product.name}</h3>
                  <p className="text-lg font-light text-gray-700">
                    ${product.price}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Link
                  className="btn bg-[#D5B868] text-white hover:bg-[#F5BA41] px-4 py-2 rounded-md transition duration-200"
                  href={`/home/shop/${product._id}`}
                >
                  View Product
                </Link>
                <button
                  onClick={() => handleRemove(product._id)}
                  className="btn bg-red-600 text-white hover:bg-red-800 px-4 py-2 rounded-md transition duration-200"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
