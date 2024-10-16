"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MultiRangeSlider from "multi-range-slider-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import classNames from "classnames"; // For conditional class application
import { ChevronRightIcon } from "@radix-ui/react-icons";
import ProductCard from "@/components/cards/ProductCard";
import { useRouter } from "next/navigation";

const ShopPage = ({
  loginInfo,
  products,
  totalPages,
  currentPage,
  searchQuery,
}) => {
  // const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  // -----------FILTERS----------------
  const [brands, setBrands] = useState("All");
  const [tiers, setTiers] = useState("All");
  const [popularity, setPopularity] = useState("Default");
  const router=useRouter()
  const [price, setPrice] = useState({
    min: 0,
    max: 2000,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // const filteredProducts = async () => {
  //    axios
  //      .post(process.env.NEXT_PUBLIC_API_URL + "/product/filtered", {
  //        brands,
  //        tiers,
  //        popularity,
  //        price,
  //        userId:loginInfo?.user.id
  //      })
  //      .then((response) => {
  //        console.log("{PRODUCTS}", response.data);
  //        setProducts(response.data);
  //        setIsLoading(false);
  //      })
  //      .catch((error) => {
  //        console.error("Error fetching products:", error);
  //        setIsLoading(false);
  //      });
  // }

  useEffect(() => {
    if (isMounted) {
      // setIsLoading(true);
      //  filteredProducts();
    }
  }, [isMounted]);

  const handleRangeSelectorInput = (e) => {
    setPrice(
      e.minValue === 0 && e.maxValue === 0
        ? { min: 0, max: 0 }
        : { min: e.minValue, max: e.maxValue }
    );
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const addToWishList = async (productId) => {
    try {
      setIsLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${loginInfo?.user.token}`,
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

  const handleSearchSubmit = () => {
    // e.preventDefault();
    let userIdd=""
    if (loginInfo) {
      userIdd=loginInfo.user.id
    }
    // const query = e.target.search.value; // Get the search query value
    router.push(
      `/home/shop?brands=${brands}&tiers=${tiers}&popularity=${popularity}&priceMin=${price.min}&priceMax=${price.max}&userId=${userIdd}&page=1`
    ); // Navigate to the first page with the search query
  
  // /products?brands=Nike&tiers=0-200&userId=123&page=2&limit=5
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    router.push(`/home/shop?search=${searchQuery}&page=${newPage}`); // Maintain search query and change page
  };

  return (
    <div className="shop-page bg-gray-100 text-black min-h-screen flex flex-col items-center">
      {notification.show && (
        <div
          className={classNames(
            "fixed top-5 right-5 p-4 rounded shadow-lg text-white",
            {
              "bg-[#F5BA41]": notification.type === "success",
              "bg-red-500": notification.type === "error",
            }
          )}
        >
          {notification.message}
        </div>
      )}

      <div className="w-full h-44 sm:h-40 md:h-96 lg:h-[30rem] bg-[url(/images/brands.jpg)] bg-contain bg-top bg-no-repeat"></div>

      <div className="grid w-full py-10 px-5 lg:px-10 grid-cols-1 lg:grid-cols-4 gap-y-10 lg:gap-x-20 gap-x-0">
        {/* Filter Section */}
        <div className="col-span-1 flex items-center w-full flex-col gap-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-semibold text-black/80">
                Brands
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup defaultValue="option-one">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      checked={brands === "All"}
                      onClick={() => setBrands("All")}
                      value="option-one"
                      id="option-one"
                    />
                    <Label htmlFor="option-one">Brands</Label>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <RadioGroupItem
                      checked={brands === "Chanel"}
                      onClick={() => setBrands("Chanel")}
                      value="Chanel"
                      id="option-two"
                    />
                    <Label htmlFor="Chanel">Chanel</Label>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <RadioGroupItem
                      checked={brands === "Celine"}
                      onClick={() => setBrands("Celine")}
                      value="Celine"
                      id="Celine"
                    />
                    <Label htmlFor="Celine">Celine</Label>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <RadioGroupItem
                      checked={brands === "Nike"}
                      onClick={() => setBrands("Nike")}
                      value="Nike"
                      id="Nike"
                    />
                    <Label htmlFor="Nike">Nike</Label>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <RadioGroupItem
                      checked={brands === "Adidas"}
                      onClick={() => setBrands("Adidas")}
                      value="Adidas"
                      id="Adidas"
                    />
                    <Label htmlFor="Adidas">Adidas</Label>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <RadioGroupItem
                      checked={brands === "Puma"}
                      onClick={() => setBrands("Puma")}
                      value="Puma"
                      id="Puma"
                    />
                    <Label htmlFor="Puma">Puma</Label>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <RadioGroupItem
                      checked={brands === "Gucci"}
                      onClick={() => setBrands("Gucci")}
                      value="Gucci"
                      id="Gucci"
                    />
                    <Label htmlFor="Gucci">Gucci</Label>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <RadioGroupItem
                      checked={brands === "Louis Vuitton"}
                      onClick={() => setBrands("Louis Vuitton")}
                      value="Louis Vuitton"
                      id="Louis Vuitton"
                    />
                    <Label htmlFor="Louis Vuitton">Louis Vuitton</Label>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <RadioGroupItem
                      checked={brands === "Versace"}
                      onClick={() => setBrands("Versace")}
                      value="Versace"
                      id="Versace"
                    />
                    <Label htmlFor="Versace">Versace</Label>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <RadioGroupItem
                      checked={brands === "Prada"}
                      onClick={() => setBrands("Prada")}
                      value="Prada"
                      id="Prada"
                    />
                    <Label htmlFor="Prada">Prada</Label>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <RadioGroupItem
                      checked={brands === "Balenciaga"}
                      onClick={() => setBrands("Balenciaga")}
                      value="Balenciaga"
                      id="Balenciaga"
                    />
                    <Label htmlFor="Balenciaga">Balenciaga</Label>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <RadioGroupItem
                      checked={brands === "Hermes"}
                      onClick={() => setBrands("Hermes")}
                      value="Hermes"
                      id="Hermes"
                    />
                    <Label htmlFor="Hermes">Hermes</Label>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <RadioGroupItem
                      checked={brands === "Other"}
                      onClick={() => setBrands("Other")}
                      value="Other"
                      id="Other"
                    />
                    <Label htmlFor="Other">Other</Label>
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
                    <RadioGroupItem
                      checked={tiers === "All"}
                      onClick={() => setTiers("All")}
                      value="option-one"
                      id="option-one"
                    />
                    <Label htmlFor="option-one">Tiers</Label>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <RadioGroupItem
                      checked={tiers === "0-200"}
                      onClick={() => setTiers("0-200")}
                      value="0-200"
                      id="0-200"
                    />
                    <Label htmlFor="0-200">0-200</Label>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <RadioGroupItem
                      checked={tiers === "201-500"}
                      onClick={() => setTiers("201-500")}
                      value="201-500"
                      id="201-500"
                    />
                    <Label htmlFor="201-500">201-500</Label>
                  </div>
                  <div className="flex items-center gap-2 pl-3">
                    <RadioGroupItem
                      checked={tiers === "501-above"}
                      onClick={() => setTiers("501-above")}
                      value="501-above"
                      id="501-above"
                    />
                    <Label htmlFor="501-above">501-above</Label>
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
                    <RadioGroupItem
                      checked={popularity === "Default"}
                      onClick={() => setPopularity("Default")}
                      value="option-one"
                      id="option-one"
                    />
                    <Label htmlFor="option-one">Default</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      checked={popularity === "Popular"}
                      onClick={() => setPopularity("Popular")}
                      value="option-two"
                      id="option-two"
                    />
                    <Label htmlFor="option-two">Popular</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-xl font-semibold text-black/80">
                Price
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1 mx-4">
                <MultiRangeSlider
                  style={{
                    border: "none",
                    boxShadow: "none",
                    padding: "10px 0px",
                  }}
                  barLeftColor="white"
                  barRightColor="white"
                  barInnerColor="#F5BA41"
                  ruler={false}
                  label={false}
                  min={0}
                  max={2000}
                  steps={5}
                  minValue={price.min}
                  maxValue={price.max}
                  onInput={(e) => handleRangeSelectorInput(e)}
                />
                <span className="text-center">
                  ${price.min} - ${price.max}
                </span>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex items-center w-full justify-between gap-1">
            <button
              onClick={() => handleSearchSubmit()}
              className="w-full justify-center flex items-center gap-1 bg-secondary group text-black font-bold py-2 text-lg pl-5 pr-4"
            >
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
          <div className="flex flex-col gap-2">
            <span className="text-sm">
              Showing 1-
              {products &&
                products.pagination &&
                products.pagination.totalDocuments}{" "}
              of{" "}
              {products &&
                products.pagination &&
                products.pagination.totalDocuments}{" "}
              results
            </span>
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
              <div className="grid grid-cols-1 max-w-6xl sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-16 place-items-center ">
                {products && products.length !== 0 ? (
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <div className="text-center text-lg">
                    No products available
                  </div>
                )}
              </div>
            )}
            {/* Pagination */}
            <Pagination className="mt-5 flex justify-center items-center space-x-2">
              {/* Previous Button */}
              <PaginationItem>
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={`px-3 py-2 border rounded ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white hover:bg-gray-100"
                  }`}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </PaginationItem>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-2 border rounded ${
                    currentPage === index + 1
                      ? "bg-[#C79B44] text-white font-bold"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              {/* Next Button */}
              <PaginationItem>
                <button
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  className={`px-3 py-2 border rounded ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white hover:bg-gray-100"
                  }`}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </PaginationItem>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
