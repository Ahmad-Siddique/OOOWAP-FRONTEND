"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Link from "next/link";
import { useRouter } from "next/navigation";

const Featured = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [wishlistLoading, setWishlistLoading] = useState(false); // State for wishlist loading
  const { loginInfo } = useSelector((state) => state.auth); // Access login info for authentication
const router = useRouter();
  const config = {
    headers: {
      Authorization: `Bearer ${loginInfo?.token}`,
    },
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/featured-products`
      );
      setProducts(response.data.featuredProducts);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    if (loginInfo == null) {
      router.push("/login")
    }
    fetchFeaturedProducts();
  }, []);

  const addToWishList = async (productId) => {
    setWishlistLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlist/add`,
        { productId },
        config
      );
      toast.success("Added to wishlist!");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist. Please try again.");
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-black w-full py-16">
        <div className="container mx-auto flex justify-center items-center">
          <svg
            className="animate-spin h-8 w-8 text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span className="ml-2 text-gray-700">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black w-full py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl text-[#D8BA5D] text-center mb-8 double-underline">
          Featured Pieces
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl p-6 flex flex-col"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-2xl mb-4"
              />
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-sm text-gray-500">
                Owner: {product.userId.firstName} {product.userId.lastName}
              </p>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
                <div>
                  <p className="text-sm">Trades: {product.trades}</p>
                  <p className="text-sm font-bold">${product.price}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
                  {/* <button className="btn btn-sm bg-black text-white rounded-sm">
                    Trade
                  </button> */}
                  <button className="btn btn-sm bg-black text-white rounded-sm">
                    <Link href={`/shop/${product._id}`} passHref>
                      Details
                    </Link>
                  </button>
                  <button
                    disabled={wishlistLoading}
                    onClick={() => addToWishList(product._id)}
                    className="btn btn-sm bg-black text-white rounded-sm"
                  >
                    {wishlistLoading ? "Adding..." : "Wishlist"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Featured;