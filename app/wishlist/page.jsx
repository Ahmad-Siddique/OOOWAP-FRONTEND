"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loginInfo = useSelector((state) => state.auth.loginInfo);
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
          router.push("/login")
      }
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await axios.post("/api/wishlist/remove", { productId }, config);
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
    <div className="bg-white text-black py-8 px-6 min-h-screen">
      <h2 className="text-center text-4xl font-bold mb-8 text-[#D5B868]">
        Your Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <div className="text-center text-lg text-[#D5B868]">
          Your wishlist is empty.
        </div>
      ) : (
        <ul className="space-y-4"> {/* Reduced space between items */}
          {wishlist.map((product) => (
            <li
              key={product._id}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-lg"
            >
              <div className="flex items-center space-x-2"> 
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg" 
                />
                <div>
                  <h3 className="text-2xl font-semibold">{product.name}</h3>
                  <p className="text-xl font-light">${product.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  className="btn bg-[#D5B868] text-black hover:bg-black hover:text-[#D5B868] px-4 py-2"
                  href={`/shop/${product._id}`}
                >
                  View Product
                </Link>
                <button
                  onClick={() => handleRemove(product._id)}
                  className="btn bg-red-600 text-white hover:bg-red-800 px-4 py-2"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
