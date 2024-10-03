"use client";

import { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { StarFilledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserProfile({ loginInfo }) {
  const router = useRouter()
  const [userdata, setuserdata] = useState()
  const [metrics, setMetrics] = useState({
    creationDate: "",
    totalTrades: 0,
    averageRating: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loginInfo?.user.token) {
      router.push("/login")
      return
    }
    const data = JSON.parse(localStorage.getItem("ooowap-user"));
    console.log("USER DATA APPL",data)
    setuserdata(data)
    const fetchMetrics = async () => {
      try {
        const token = loginInfo?.user.token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        console.log("Fetching user metrics..."); // Debugging log
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/getusermetrics2`,
          config
        );
        console.log("RESPONSE: ", response.data);
       
        setMetrics(response.data);
      } catch (error) {
        console.log("Error fetching user metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [loginInfo]);

  return (
    <div className="w-screen">
      {/* First Row */}
      <div
        className="w-full px-5 py-20 bg-cover bg-center flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: "cover", // Ensure the image covers the container
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative max-w-7xl z-10 w-full flex flex-col md:flex-row items-center justify-center md:justify-between">
          {/* Left Column */}
          {loginInfo && (
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-center md:text-left text-white">
              <img
                className="w-32 h-32 md:w-24 md:h-24 rounded-full"
                src={
                  (userdata && userdata?.picture) ||
                  "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="User Pic"
              />
              <div className="flex flex-col items-center md:items-start">
                <h2 className="text-xl font-bold">
                  {userdata && userdata.firstName}{" "}
                  {userdata && userdata.lastName}
                </h2>
                <p className="text-sm">
                  Member since{" "}
                  {metrics.creationDate &&
                    new Date(metrics.creationDate).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                </p>
                <Link
                  href="/home/my-account/products"
                  className="bg-[#F5BA41] px-10 py-3 rounded-md text-black mt-2 hover:bg-white hover:text-black hover:border-black transition duration-300"
                >
                  Products
                </Link>
              </div>
            </div>
          )}

          {/* Right Column */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end text-center sm:text-start pt-10 md:pt-0 text-white gap-5 md:gap-10">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">
                {metrics && metrics.totalTrades}
              </span>
              <span className="text-sm">Total Trades</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                {/* Dynamically generate the stars based on averageRating */}
                {Array.from({ length: 5 }, (v, i) => {
                  const isFilled = i + 1 <= Math.floor(metrics?.averageRating); // Filled stars for whole numbers
                  const isHalfFilled =
                    i + 1 > Math.floor(metrics?.averageRating) &&
                    i + 1 <= Math.ceil(metrics?.averageRating); // Half-filled star condition (optional)

                  return (
                    <span key={i}>
                      {
                        isFilled
                          ? "★" // Unicode for filled star
                          : isHalfFilled
                          ? "⯪" // Optional half-filled star (could use other symbols or CSS for half stars)
                          : "☆" // Unicode for empty star
                      }
                    </span>
                  );
                })}
                <span className="text-sm">
                  ({metrics?.averageRating || 0} Reviews)
                </span>
              </div>
              <span className="text-sm">Ratings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
