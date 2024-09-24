"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Link from "next/link";

const ShopDetailPage = ({ params, loginInfo }) => {
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [selectedUserProduct, setSelectedUserProduct] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tradeMessage, setTradeMessage] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  // State to manage current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const config = {
    headers: {
      Authorization: `Bearer ${loginInfo?.token}`,
    },
  };

  const fetchUserProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/userproducts`,
        config
      );
      setUserProducts(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user products:", error);
      toast.error("Error fetching user products!");
      setIsLoading(false);
    }
  };

  const fetchSimilarProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/product/productpageproducts`,
        { id: params.id },
        config
      );
      setSimilarProducts(response.data.filteredProducts);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching similar products:", error);
      setIsLoading(false);
    }
  };

  const addToWishList = async (productId) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/wishlist/add",
        { productId },
        config
      );
      toast.success("Item added to wishlist!");
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

  useEffect(() => {
    const id = params.id;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, config)
      .then((response) => {
        if (response.data) {
          setProduct(response.data);
          fetchSimilarProducts();
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

    fetchUserProducts();
  }, [params.id]);

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
      offererProduct: selectedUserProduct,
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
        setTradeMessage("");
        toast.success("Trade request was successful!");
      })
      .catch((error) => {
        console.error("Error making trade request:", error);
        setTradeMessage("");
        toast.error(
          error.response.data.message ||
            "Failed to submit trade request. Please try again."
        );
      });
  };

  const handleNextImage = () => {
    if (product) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % (product.imageUrl1 ? 3 : 2)
      );
    }
  };

  const handlePrevImage = () => {
    if (product) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + (product.imageUrl1 ? 3 : 2)) %
          (product.imageUrl1 ? 3 : 2)
      );
    }
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
      <div className="max-w-6xl mx-auto bg-white overflow-hidden">
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="lg:w-1/2 relative">
            <div className="w-full">
              <div className="relative w-full">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-[800px] object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>
              {product.imageUrl1 && (
                <div className="relative w-full">
                  <img
                    src={product.imageUrl1}
                    alt={product.name}
                    className="w-full h-[800px] object-cover transform transition-transform duration-300 hover:scale-110"
                  />
                </div>
              )}
              {product.imageUrl2 && (
                <div className="relative w-full">
                  <img
                    src={product.imageUrl2}
                    alt={product.name}
                    className="w-full h-[800px] object-cover transform transition-transform duration-300 hover:scale-110"
                  />
                </div>
              )}
            </div>
            {/* Navigation Buttons */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
              <button className="btn btn-circle" onClick={handlePrevImage}>
                &#10094;
              </button>
            </div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <button className="btn btn-circle" onClick={handleNextImage}>
                &#10095;
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl font-semibold text-gray-700 mb-4">
              ${product.price}
            </p>

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

            <div
              tabIndex={0}
              className="collapse collapse-plus border-base-300 bg-base-200 border"
            >
              <div className="collapse-title text-xl font-medium">Size</div>
              <div className="collapse-content">
                <p>{product.size}</p>
              </div>
            </div>

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
                {Array.isArray(userProducts) &&
                  userProducts.map((userProduct) => (
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
                className="bg-black text-white py-2 px-4 rounded hover:bg-[#D5B868] transition duration-300"
                onClick={() => handleTrade(product.userId)}
              >
                Trade
              </button>
              <button
                onClick={() => addToWishList(product._id)}
                className="bg-black text-white py-2 px-4 rounded hover:bg-[#D5B868] transition duration-300"
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-extrabold mb-4 text-center">
          Similar Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {similarProducts.map((similarProduct) => (
            <div
              key={similarProduct._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              style={{ width: "90%", height: "450px" }}
            >
              <img
                src={similarProduct.imageUrl}
                alt={similarProduct.name}
                className="w-full h-72 object-cover rounded-md"
              />
              <h3 className="mt-2 text-lg font-semibold">
                {similarProduct.name}
              </h3>
              <p className="text-gray-600">${similarProduct.price}</p>
              <Link href={`/home/shop/${similarProduct._id}`}>
                <button className="btn bg-black text-white border-black hover:bg-[#D5B868] hover:text-black transition duration-300 mt-2">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ShopDetailPage;
