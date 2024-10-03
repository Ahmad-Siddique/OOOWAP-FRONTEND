"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaFacebook, FaFacebookSquare, FaMailchimp } from "react-icons/fa";
import { MailIcon } from "lucide-react";
import Image from "next/image";
import WishlistTable from "./WishlistTable";

const Wishlist = ({ loginInfo }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = loginInfo ? loginInfo?.user.token : null;
  const router = useRouter();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchWishlist = async () => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/wishlist",
        config
      );
      setWishlist(data.products);
    } catch (err) {
      setError("Error fetching wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loginInfo) {
      router.push("/login");
    } else {
      fetchWishlist();
    }
  }, [loginInfo]);

  const handleRemove = async (productId) => {
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/wishlist/remove",
        { productId },
        config
      );
      setWishlist((prev) =>
        prev.filter((product) => product._id !== productId)
      );
    } catch (err) {
      setError("Error removing item");
    }
  };

  if (loading) {
    return <div className="text-center text-black text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex justify-center w-full bg-gray-50 h-full min-h-screen">
      <div className="text-black py-12 px-6 w-full h-full flex flex-col gap-10 max-w-7xl">
        {/* <div className="flex items-center gap-2">
          <span className="text-sm">Share on</span>
          <FaFacebookSquare className="text-2xl text-blue-600 cursor-pointer" />
          <MailIcon className="text-2xl text-blue-600 cursor-pointer" />
          <Image
            src="/images/twitter-x.svg"
            alt="twitter"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </div> */}

        {wishlist.length === 0 ? (
          <div className="text-center text-lg text-gray-600">
            Your wishlist is empty. Start adding products!
          </div>
        ) : (
          <WishlistTable wishlist={wishlist} handleRemove={handleRemove} />
        )}
      </div>
    </div>
  );
};

export default Wishlist;
