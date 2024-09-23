"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Featured = ({ loginInfo }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const router = useRouter();

  const config = {
    headers: {
      Authorization: `Bearer ${loginInfo?.token}`,
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

  useEffect(() => {
    fetchFeaturedProducts();
  }, [loginInfo, router]);

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

  return (
    <div className="bg-white w-full py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-5xl text-gray-900 text-center mb-12">
          <span className="font-light">Featured</span>{" "}
          <span className="font-bold">Products</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link href={`/home/shop/${product._id}`} passHref key={product._id}>
              <div className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-72 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Owner: {product.userId.firstName} {product.userId.lastName}
                  </p>

                  <p className="text-md text-gray-900 font-bold mb-4">
                    ${product.price}
                  </p>
                  <div className="flex  items-center mt-4">
                    {" "}
                    {/* justify-between */}
                    <button
                      className="btn btn-lg bg-black text-white rounded-lg py-2 px-4 mr-2 transition-colors duration-300"
                      style={{ transition: "background-color 0.3s ease" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#D5B868")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "black")
                      }
                    >
                      Trade
                    </button>
                    <button
                      disabled={wishlistLoading}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent Link from triggering
                        addToWishList(product._id);
                      }}
                      className="btn btn-lg bg-black text-white rounded-lg py-2 px-4 transition-colors duration-300"
                      style={{ transition: "background-color 0.3s ease" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#D5B868")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "black")
                      }
                    >
                      {wishlistLoading ? "Adding..." : "Wishlist"}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Featured;
