"use client"

import { useSelector } from "react-redux";

export default function UserProfile() {

  const { loginInfo} = useSelector(
    (state) => state.auth
  );
  console.log("Login info",loginInfo)
  return (
    <div className="w-screen ">
      {/* First Row */}
      <div
        className="w-full px-10 py-12 bg-cover bg-center h-68 flex items-center justify-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="container w-full  py-8 flex justify-between items-center">
          {/* Left Column */}
          {loginInfo && (
            <div className="flex items-center space-x-4">
              <img
                className="w-17 h-16 rounded-full"
                src={
                  loginInfo
                    ? loginInfo.user.image
                    : "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="User Pic"
              />
              <div className="flex flex-col">
                <h2 className="text-xl font-bold">
                  {loginInfo.user.firstName} {loginInfo.user.lastName}
                </h2>
                <p className="text-sm text-white">Member since .......</p>
                <button className="btn btn-primary mt-2">Products</button>
              </div>
            </div>
          )}

          {/* Right Column */}
          <div className="flex flex-col text-right">
            <div className="flex justify-between space-x-4">
              <h3 className="text-lg font-semibold">Total Trades</h3>
              <p className="text-2xl">10</p>
            </div>
            <div className="flex justify-between space-x-4 mt-4">
              <h3 className="text-lg font-semibold">Rating</h3>
              <p className="text-2xl">4.5 / 5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="w-full mt-6">
        {/* Horizontal Lines */}
        <hr className="border-t-2 border-gray-300" />
        {/* Client-Side Tabs Component */}
        {/* Import Tabs component */}
        <UserTabs />
        <hr className="border-t-2 border-gray-300" />
      </div>
    </div>
  );
}

// Import the client-side component dynamically
import dynamic from "next/dynamic";

const UserTabs = dynamic(() => import("./UserTabs.client"), { ssr: false });
