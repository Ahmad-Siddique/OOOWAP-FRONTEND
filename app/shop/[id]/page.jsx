"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Link from "next/link";

const ShopDetailPage = ({ params }) => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]); // State for similar products
  const [userProducts, setUserProducts] = useState([]); // User's products
  const [selectedUserProduct, setSelectedUserProduct] = useState(""); // Selected user product from dropdown
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState(""); // Start Date State
  const [endDate, setEndDate] = useState(""); // End Date State
  const [tradeMessage, setTradeMessage] = useState(""); // Trade success or error message
  const { loginInfo } = useSelector((state) => state.auth);

  const config = {
    headers: {
      Authorization: `Bearer ${loginInfo.token}`,
    },
  };

  // Fetch logged-in user's products
  const fetchUserProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/userproducts`,
        config
      );
      setUserProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user products:", error);
      toast.error("Error fetching user products!");
      setIsLoading(false);
    }
  };

  // Fetch similar products based on the current product
  const fetchSimilarProducts = async () => {
    setIsLoading(true);
    const filter = {
      category: product?.category, // Example filter based on product category
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/product/productpageproducts`,
        { id: params.id},
        config
      );
      setSimilarProducts(response.data.filteredProducts); // Set similar products
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching similar products:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const id = params.id;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, config)
      .then((response) => {
        if (response.data) {
          setProduct(response.data);
          fetchSimilarProducts(); // Fetch similar products after fetching the main product
        } else {
          setError(true);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError(true);
        setIsLoading(false);
      });

    fetchUserProducts(); // Fetch user's products on component mount
  }, [params.id]);

  // Handle trade request
  const handleTrade = (receiverid) => {
    const id = params.id;

    if (!startDate || !endDate || !selectedUserProduct) {
      setTradeMessage(
        "Please fill out all fields including selecting a product."
      );
      return;
    }

    const body = {
      receiverProduct: id,
      offererProduct:selectedUserProduct,
      startDate,
      endDate,
      
    };

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/trade/offer/${receiverid._id}`,
        body,
        config
      )
      .then(() => {
        setTradeMessage("Trade request was successful!");
        toast.success("Trade request was successful!");
      })
      .catch((error) => {
        console.error("Error making trade request:", error);
        setTradeMessage("Failed to submit trade request. Please try again.");
        toast.error("Failed to submit trade request. Please try again.");
      });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
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
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Product not found</div>;
  }

  if (!product) {
    return <div className="text-center">No product data available</div>;
  }

  return (
    <div className="bg-gray-50 p-8 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="lg:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl font-semibold text-gray-700 mb-4">
              ${product.price}
            </p>

            {/* Description Collapse with DaisyUI */}
            <div
              tabIndex={0}
              className="collapse collapse-plus border-base-300 bg-base-200 border"
            >
              <div className="collapse-title text-xl font-medium">
                Description
              </div>
              <div className="collapse-content">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Description Collapse with DaisyUI */}
            <div
              tabIndex={0}
              className="collapse collapse-plus border-base-300 bg-base-200 border"
            >
              <div className="collapse-title text-xl font-medium">
                Condition
              </div>
              <div className="collapse-content">
                <p>{product.condition}</p>
              </div>
            </div>

            {/* Description Collapse with DaisyUI */}
            <div
              tabIndex={0}
              className="collapse collapse-plus border-base-300 bg-base-200 border"
            >
              <div className="collapse-title text-xl font-medium">Size</div>
              <div className="collapse-content">
                <p>{product.size}</p>
              </div>
            </div>

            {/* Date and User Product Fields */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                className="input input-bordered w-full mt-2"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                className="input input-bordered w-full mt-2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Your Products
              </label>
              <select
                className="select select-bordered w-full mt-2"
                value={selectedUserProduct}
                onChange={(e) => setSelectedUserProduct(e.target.value)}
              >
                <option value="">Select one of your products</option>
                {userProducts.map((userProduct) => (
                  <option key={userProduct._id} value={userProduct._id}>
                    {userProduct.name} (${userProduct.price})
                  </option>
                ))}
              </select>
            </div>

            {tradeMessage && (
              <div className="mt-4 text-center text-red-500">
                {tradeMessage}
              </div>
            )}

            <div className="flex space-x-4 mt-6">
              <button
                className="btn btn-primary"
                onClick={() => handleTrade(product.userId)}
              >
                Trade
              </button>
              <button className="btn btn-secondary">Add to Wishlist</button>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Similar Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProducts && similarProducts.length != 0 ? (
            similarProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Owner: {product.userId.firstName}
                </p>
                <p className="text-lg text-yellow-500 mb-4">${product.price}</p>
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
      </div>

      <ToastContainer />
    </div>
  );
};

export default ShopDetailPage;
