"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Link from "next/link";
import classNames from "classnames"; // For conditional class application
import CarousalLogos from "./CarousalLogos";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(null);
  const [isMounted, setIsMounted] = useState(false); // Prevents rendering before hydration
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const { loginInfo } = useSelector((state) => state.auth);

  // Set isMounted to true after component mounts to avoid hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch products from backend after component has mounted and loginInfo is available
  useEffect(() => {
    if (isMounted && loginInfo && loginInfo.token) {
      let config = {
        headers: {
          Authorization: `Bearer ${loginInfo.token}`,
        },
      };

      setIsLoading(true);
      axios
        .post(
          process.env.NEXT_PUBLIC_API_URL + "/product/filtered",
          { filter },
          config
        )
        .then((response) => {
          setProducts(response.data.filteredProducts);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setIsLoading(false);
        });
    } else if (!loginInfo) {
      console.warn("Token is not available");
    }
  }, [filter, loginInfo, isMounted]);

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Add to Wishlist with loading state and error handling
  const addToWishList = async (productId) => {
    try {
      setIsLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${loginInfo.token}`,
        },
      };

      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/wishlist/add",
        { productId },
        config
      );

      setNotification({
        show: true,
        message: "Item added to wishlist!",
        type: "success",
      });
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      setNotification({
        show: true,
        message: "Error adding item to wishlist. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);

      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, message: "", type: "" });
      }, 3000);
    }
  };

  // Avoid rendering until after hydration
  if (!isMounted) {
    return null;
  }

  return (
    <div className="shop-page bg-gray-100 text-black min-h-screen p-5">
      {/* Notification Popup */}
      {notification.show && (
        <div
          className={classNames(
            "fixed top-5 right-5 p-4 rounded shadow-lg text-white",
            {
              "bg-yellow-500": notification.type === "success",
              "bg-red-500": notification.type === "error",
            }
          )}
        >
          {notification.message}
        </div>
      )}

      {/* Shop Title */}
      <div className="shop-title mb-10">
        <h1 className="text-4xl font-extrabold text-center">
          WAP Featured Running Brands
        </h1>
      </div>

      {/* Carousel of Logos */}
      <div className="flex justify-center overflow-hidden">
        <div className="flex space-x-6 animate-marquee">
          {/* Replace these with actual logo images */}
          <img
            src="https://dcassetcdn.com/design_img/3695365/637978/21978809/mvr5cgdykk3rtc2674z5h4kq8b_thumbnail.png"
            alt="Logo 1"
            className="w-48 h-48"
          />
          {/* Additional logos here */}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Section */}
        <div className="filter-section col-span-1 bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <ul>
            <li>
              <button
                onClick={() => handleFilterChange(100)}
                className="btn btn-block btn-outline mb-2"
              >
                Under $100
              </button>
            </li>
            <li>
              <button
                onClick={() => handleFilterChange(200)}
                className="btn btn-block btn-outline mb-2"
              >
                Under $200
              </button>
            </li>
            <li>
              <button
                onClick={() => handleFilterChange(300)}
                className="btn btn-block btn-outline mb-2"
              >
                Under $300
              </button>
            </li>
            <li>
              <button
                onClick={() => handleFilterChange(400)}
                className="btn btn-block btn-outline mb-2"
              >
                Under $400
              </button>
            </li>
            <li>
              <button
                onClick={() => handleFilterChange(500)}
                className="btn btn-block btn-outline"
              >
                Under $500
              </button>
            </li>
          </ul>
        </div>

        {/* Products Section */}
        <div className="col-span-3">
          {isLoading ? (
            <div className="flex justify-center items-center">
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
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products && products.length != 0 ? (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-6 rounded-lg shadow-lg"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Owner: {product.userId.firstName}
                    </p>
                    <p className="text-lg text-yellow-500 mb-4">
                      ${product.price}
                    </p>
                    <div className="flex space-x-4">
                      {/* Using Link for navigation */}
                      <Link
                        className="btn btn-primary"
                        href={`/shop/${product._id}`}
                      >
                        Details
                      </Link>
                      <button
                        disabled={isLoading}
                        onClick={() => addToWishList(product._id)}
                        className="btn btn-secondary"
                      >
                        Add to Wishlist
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>No products available</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
