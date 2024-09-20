"use client";

import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const { loginInfo } = useSelector((state) => state.auth);
  console.log("Login info", loginInfo);
  const router = useRouter();

  const [metrics, setMetrics] = useState({
    creationDate: "",
    totalTrades: 0,
    averageRating: 0,
  });
  const [loading, setLoading] = useState(true);
console.log("ZOOOOOOOOOOOOOOOOOOOOOO1");
  useEffect(() => {
    if (!loginInfo) {
      router.push("/login")
    }
    console.log("ZOOOOOOOOOOOOOOOOOOOOOO")
    const fetchMetrics = async () => {
      try {
        const token = loginInfo ? loginInfo?.token : null;

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
        console.error("Error fetching user metrics:", error);
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
        className="w-full px-6 md:px-12 lg:px-16 py-12 bg-cover bg-center flex items-center justify-center relative overflow-hidden h-100 md:h-80 lg:h-80 xl:h-80 2xl:h-80"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: "cover", // Ensure the image covers the container
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-center md:justify-between">
          {/* Left Column */}
          {loginInfo && (
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-center md:text-left text-white">
              <img
                className="w-32 h-32 md:w-24 md:h-24 rounded-full"
                src={
                  loginInfo?.user.image ||
                  "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="User Pic"
              />
              <div className="flex flex-col items-center md:items-start">
                <h2 className="text-xl font-bold">
                  {loginInfo?.user.firstName} {loginInfo?.user.lastName}
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
                <button className="btn btn-primary mt-2">Products</button>
              </div>
            </div>
          )}

          {/* Right Column */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right mt-4 md:mt-0 text-white">
            <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-4">
              <h3 className="text-lg font-semibold">Total Trades</h3>
              <p className="text-2xl">{metrics && metrics.totalTrades}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-4 mt-4">
              <h3 className="text-lg font-semibold">Rating</h3>
              <p className="text-2xl">{metrics && metrics.averageRating} / 5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="w-full mt-6">
        {/* Horizontal Lines */}
        <hr className="border-t-2 border-gray-300" />
        {/* Client-Side Tabs Component */}
        <UserTabs />
        <hr className="border-t-2 border-gray-300" />
      </div>
    </div>
  );
}

// Import the client-side component dynamically
const UserTabs = dynamic(() => import("./UserTabs.client"), { ssr: false });
