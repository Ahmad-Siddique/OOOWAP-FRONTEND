"use client";
import ProductCard from "@/components/cards/ProductCard";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const UserStore = ({ loginInfo, products, userInfo }) => {
  const [loading, setLoading] = useState(true);
  const [wishlistproduct, setwishlistproduct] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const router = useRouter();

  const config = {
    headers: {
      Authorization: `Bearer ${loginInfo?.user.token}`,
    },
  };

  const fetchWishlistProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlist/product`,
        config
      );
      setwishlistproduct(response.data.products);
    } catch (error) {
      console.error("Error fetching wishlist products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistProduct();
  }, [loginInfo, router]);

  const addToWishList = async (productId) => {
    setWishlistLoading(true);
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlist/toggle`,
        { productId },
        config
      );
      setwishlistproduct(data.data.products);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Please login to add products to wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white w-full py-16">
        <div className="container mx-auto flex justify-center items-center">
          <svg
            className="animate-spin h-8 w-8 text-[#F5BA41]"
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

  const isProductinWishlist = (productId) =>
    wishlistproduct.includes(productId);

  return (
    <div className="bg-white w-full py-16 px-4">
      <div className="flex flex-col items-center justify-center">
        {/* Store Header */}
        <div className="flex flex-col items-center gap-4 mb-12 justify-center">
          {/* User Avatar */}
          <img
            src={userInfo.photoURL} // assuming `userInfo.imageUrl` contains the image URL of the user
            alt={`${userInfo.firstName}'s avatar`}
            className="rounded-full h-32 w-32 object-cover"
          />
          {/* Store Title */}
          <h2 className="text-4xl uppercase text-gray-900 text-center">
            <span className="font-light">
              {userInfo.firstName} {userInfo.lastName}'s{" "}
            </span>{" "}
            <span className="font-bold">STORE</span>
          </h2>
          <div className="bg-primary h-0.5 w-32"></div>
          {/* Store Description */}
          <p className="text-center text-lg text-gray-600 mt-2">
            Welcome to {userInfo.firstName}'s store! Check out their amazing
            products below.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 w-full max-w-5xl sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToWishList={addToWishList}
              isProductinWishlist={isProductinWishlist}
            />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserStore;
