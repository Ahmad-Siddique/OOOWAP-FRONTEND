"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import MyAccProductCard from "@/components/cards/MyAccProductCard";
import Sidebar from "./Sidebar";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const Products = ({ loginInfo }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const config = {
    headers: {
      Authorization: `Bearer ${loginInfo?.user.token}`,
    },
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/products/userproducts`,
        config
      );
      setProducts(response.data.data);
    } catch (error) {
      toast.error("Error fetching products!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [loginInfo?.user.token]);

  // Initialize router
  const router = useRouter();

  const handleAddProduct = () => {
    // Redirect to the add product page
    router.push("/home/my-account/products/add"); // Change this to the correct path for your add product page
  };

  return (
    <div className="container mx-auto py-8 px-4">
    <div class="flex flex-col md:flex-row justify-between items-center mb-4">
    <h1 class="text-2xl font-bold">Products</h1>
    <button
          onClick={handleAddProduct}
        class="bg-[#F5BA41] text-white py-2 px-4 rounded"
    >
        Add Product
    </button>
</div>
      {isLoading ? (
        <div className="flex justify-center">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 flex items-center flex-col gap-0.5 w-full">
            {products &&
              products.map((product) => (
                <MyAccProductCard
                  key={product._id}
                  product={product}
                  fetchProducts={fetchProducts}
                />
              ))}
          </div>
          <Sidebar loginInfo={loginInfo} />
        </div>
      )}
    </div>
  );
};

export default Products;
