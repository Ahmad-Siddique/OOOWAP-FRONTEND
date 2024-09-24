"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Link from "next/link";
import { ChevronRightIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import ProductCard from "@/components/cards/ProductCard";

const ShopDetailPage = ({ params, loginInfo }) => {
  const [selectedImage, setSelectedImage] = useState(0);

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
      <div className="max-w-6xl mx-auto overflow-hidden">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="lg:w-1/2 relative">
            <div className="flex flex-col overflow-hidden w-full">
              <div className="w-full z-10">
                <img
                  src={
                    selectedImage === 0
                      ? product.imageUrl
                      : selectedImage === 1
                      ? product.imageUrl1
                      : product.imageUrl2
                  }
                  alt={product.name}
                  className="w-full h-[700px] object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 py-5">
              <button onClick={() => setSelectedImage(0)}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-[150px] object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </button>
              {product.imageUrl1 && (
                <button onClick={() => setSelectedImage(1)}>
                  <img
                    src={product.imageUrl1}
                    alt={product.name}
                    className="w-full h-[150px] object-cover transform transition-transform duration-300 hover:scale-110"
                  />
                </button>
              )}
              {product.imageUrl2 && (
                <button onClick={() => setSelectedImage(2)}>
                  <img
                    src={product.imageUrl2}
                    alt={product.name}
                    className="w-full h-[150px] object-cover transform transition-transform duration-300 hover:scale-110"
                  />
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col pt-20 lg:w-1/2 p-5">
            <h5 className="text-sm font-bold">{product.brand}</h5>
            <h1 className="text-xl font-light ">{product.name}</h1>
            <p className="font-light text-gray-700 mb-2">${product.price}</p>
            <p className="text-sm">
              By:{" "}
              <span className="font-light">
                {product.userId.firstName} {product.userId.lastName}
              </span>
            </p>
            {/* <div
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
            </div> */}

            <div className="mt-20">
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                className="bg-transparent w-full mt-2"
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
                className="bg-transparent w-full mt-2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {tradeMessage && (
              <div className="mt-4 text-center text-red-500">
                {tradeMessage}
              </div>
            )}

            <div className="flex gap-5 flex-col mt-10">
              <button
                onClick={() => handleTrade(product.userId)}
                className="w-fit flex rounded-full uppercase items-center gap-1 bg-gray-400 group text-white py-4 pl-5 pr-4"
              >
                Book Now
                <ChevronRightIcon className="h-5 w-0 group-hover:w-5 transition-all ease-in duration-150" />
              </button>
              <button
                onClick={() => addToWishList(product._id)}
                className="w-fit uppercase flex rounded-full  items-center gap-1 bg-black group text-white py-4 pl-5 pr-4"
              >
                Add to wishlist
                <HeartFilledIcon className="h-5 w-5 text-gray-300 ml-2" />
                <ChevronRightIcon className="h-5 w-0 group-hover:w-5 transition-all ease-in duration-150" />
              </button>
              <button className="w-fit text-xl flex items-center gap-1 border-2 border-blue-400 group text-blue-400 py-4 pl-5 pr-4">
                Make an offer
                <ChevronRightIcon className="h-5 w-0 group-hover:w-5 transition-all ease-in duration-150" />
              </button>
              <button className="w-fit flex items-center gap-1 bg-black group text-gray-300 py-2 pl-5 pr-4">
                <QuestionMarkCircleIcon className="h-5 w-5" />
                Ask a question
                <ChevronRightIcon className="h-5 w-0 group-hover:w-5 transition-all ease-in duration-150" />
              </button>
              {/* <button
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
              </button> */}
            </div>
            <div className="flex flex-col mt-10">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base ml-4 font-normal">
                    Description
                  </AccordionTrigger>
                  <AccordionContent className="ml-4">
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-base ml-4 font-normal">
                    Size
                  </AccordionTrigger>
                  <AccordionContent className="ml-4">
                    Yes. It comes with default styles that matches the other
                    components&apos; aesthetic.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-base ml-4 font-normal">
                    Condition
                  </AccordionTrigger>
                  <AccordionContent className="ml-4">
                    Yes. It&apos;s animated by default, but you can disable it
                    if you prefer.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="flex flex-col gap-2 mt-10">
              <span className="text-sm font-light">
                {product.brand} is a registered trademark.
              </span>
              <span className="text-sm font-light">
                Ooowap is not affiliated with {product.brand}.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <h2 className="text-3xl font-light italic mb-4 text-center">
          You'll Also Love These
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {similarProducts.map((similarProduct) => (
            <ProductCard key={similarProduct._id} product={similarProduct} />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ShopDetailPage;
