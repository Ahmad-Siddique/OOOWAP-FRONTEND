"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import classNames from "classnames"; // For conditional class application
import { ChevronRightIcon } from "@radix-ui/react-icons";
import ProductCard from "@/components/cards/ProductCard";

const ShopPage = ({ loginInfo }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && loginInfo && loginInfo.user.token) {
      let config = {
        headers: {
          Authorization: `Bearer ${loginInfo.user.token}`,
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
          Authorization: `Bearer ${loginInfo.user.token}`,
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
    <div className="shop-page bg-gray-100 text-black min-h-screen flex flex-col items-center">
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

      <div className="w-full h-96 bg-[url(/images/brands.jpg)] bg-contain bg-top bg-no-repeat"></div>
      <div className="grid w-full py-10 px-5 grid-cols-1 max-w-7xl lg:grid-cols-4 gap-8">
        {/* Filter Section */}
        <div className="col-span-1 p-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-semibold text-black/80">
                Brands
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup defaultValue="option-one">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">Brands</Label>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">Chanel</Label>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <RadioGroupItem value="option-three" id="option-three" />
                    <Label htmlFor="option-three">Celine</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-semibold text-black/80">
                Tiers
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup defaultValue="option-one">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">Tiers</Label>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">200-500</Label>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <RadioGroupItem value="option-three" id="option-three" />
                    <Label htmlFor="option-three">501-above</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-xl font-semibold text-black/80">
                Popularity
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup defaultValue="option-one">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">Default</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">Popular</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-xl font-semibold text-black/80">
                Price
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-5">
                <Slider
                  className="mt-3"
                  defaultValue={[33]}
                  max={100}
                  step={1}
                />
                <span className="text-center">$100 - $500</span>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex items-center justify-between gap-1">
            <button className="w-full justify-center flex items-center gap-1 bg-secondary group text-black font-bold py-2 text-lg pl-5 pr-4">
              Filter
              <ChevronRightIcon className="h-5 w-0 group-hover:w-5 transition-all ease-in duration-150" />
            </button>
            <button
              onClick={() => handleFilterChange(null)}
              className="w-full justify-center flex items-center gap-1 bg-secondary group text-black font-bold py-2 text-lg pl-5 pr-4"
            >
              Clear
              <ChevronRightIcon className="h-5 w-0 group-hover:w-5 transition-all ease-in duration-150" />
            </button>
          </div>
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
                  <ProductCard key={product._id} product={product} />
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