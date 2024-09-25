"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/cards/ProductCard";

const Featured = ({ loginInfo }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistproduct, setwishlistproduct] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const router = useRouter();
  console.log(loginInfo,"GG")
  const config = {
    headers: {
      Authorization: `Bearer ${loginInfo?.user.token}`,
    },
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/product/featured-products`,
        {
          userId: loginInfo?.user.id,
        }
      );
      setProducts(response.data.featuredProducts);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      toast.error("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const fetchWishlistProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlist/product`,
        config
      );
      setwishlistproduct(response.data.products);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      // toast.error("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
    fetchWishlistProduct();
    console.log("PRODUCTS", products);
  }, [loginInfo, router]);

  const addToWishList = async (productId) => {
    setWishlistLoading(true);
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlist/toggle`,
        { productId },
        config
      );
      setwishlistproduct(data.data.products)
      // toast.success("Added to wishlist!");
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

  const isProductinWishlist = (productId) => {  
    if (wishlistproduct.includes(productId)) {
      console.log("TRUEEE")
      return true;
    }
    else {
      return false;
    }
  };

  return (
    <div className="bg-white w-full py-16 px-4">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2 mb-12 justify-center">
          <h2 className="text-4xl uppercase text-gray-900 text-center">
            <span className="font-light">Featured</span>{" "}
            <span className="font-bold">Products</span>
          </h2>
          <div className="bg-primary h-0.5 w-32"></div>
        </div>
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

export default Featured;
