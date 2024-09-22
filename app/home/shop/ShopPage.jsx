"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Link from "next/link";
import classNames from "classnames"; // For conditional class application

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const { loginInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    }
  }, [filter, loginInfo, isMounted]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const addToWishList = async (productId) => {
    try {
      setIsLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${loginInfo.token}`,
        },
      };

      await axios.post(
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
      setTimeout(() => {
        setNotification({ show: false, message: "", type: "" });
      }, 3000);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="shop-page bg-gray-100 text-black min-h-screen p-5">
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

      <div className="shop-title mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-[#D5B868]">
          WAP Featured Running Brands
        </h1>
      </div>

      <div className="flex justify-center overflow-hidden mb-8">
        <div className="flex space-x-6 animate-marquee">
          <img
            src="https://dcassetcdn.com/design_img/3695365/637978/21978809/mvr5cgdykk3rtc2674z5h4kq8b_thumbnail.png"
            alt="Logo 1"
            className="w-48 h-48"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Section */}
        <div className="filter-section col-span-1 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <h2 className="text-3xl font-bold mb-6 text-[#D5B868] text-center">
            Filters
          </h2>
          <ul className="space-y-4">
            {[100, 200, 300, 400, 500].map((amount) => (
              <li key={amount}>
                <button
                  onClick={() => handleFilterChange(amount)}
                  className="w-full text-left p-4 rounded-lg transition duration-200 ease-in-out 
            bg-gray-50 hover:bg-[#D5B868] text-black hover:text-white 
            border border-gray-300 shadow-md hover:shadow-lg"
                >
                  <span className="font-medium"> { "<"} ${amount}</span>
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleFilterChange(null)} // Clear filter button
            className="mt-6 w-full bg-red-500 text-white p-2 rounded-lg transition duration-200 
      hover:bg-red-600 focus:outline-none"
          >
            Clear Filters
          </button>
        </div>

        {/* Products Section */}
        <div className="col-span-3">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin h-8 w-8 text-[#D5B868]"
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
              {products && products.length !== 0 ? (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-xl"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded mb-4" // Increased height
                    />
                    <h3 className="text-xl font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Owner: {product.userId.firstName}
                    </p>
                    <p className="text-lg text-black mb-4">
                      ${product.price}
                    </p>
                    <div className="flex space-x-4">
                      <Link
                        className="btn bg-black text-white hover:bg-[#D5B868] hover:text-black px-4 py-2"
                        href={`/shop/${product._id}`}
                      >
                        Details
                      </Link>
                      <button
                        disabled={isLoading}
                        onClick={() => addToWishList(product._id)}
                        className="btn bg-black text-white hover:bg-[#D5B868] hover:text-black px-4 py-2"
                      >
                        Add to Wishlist
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-lg">No products available</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
