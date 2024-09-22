"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Profile from "./Profile";
import Products from "./Products";
import ProfileSettings from "./ProfileSettings";
import PendingItems from "./PendingItems";
import Reviews from "./Reviews";
import TradeHistory from "./TradeHistory";
import Dispute from "./Dispute";
import AcceptedTrades from "./AcceptedTrades";

export default function UserTabs() {
  const [activeTab, setActiveTab] = useState("Profile");
  const router = useRouter();

  const { loginInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!loginInfo || !loginInfo.token) {
      router.push("/login"); // Redirect to login page if not authenticated
    }
  }, [loginInfo, router]);

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <Profile />;
      case "Products":
        return <Products />;
      case "Profile Settings":
        return <ProfileSettings />;
      case "Pending Items":
        return <PendingItems />;
      case "Accpted/Completed Trades":
        return <AcceptedTrades />

      case "Reviews":
        return <Reviews />;
      case "Trade History":
        return <TradeHistory />;
      case "Dispute":
        return <Dispute />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="tabs flex flex-col md:flex-row justify-center space-x-0 md:space-x-1 space-y-1 md:space-y-0">
        {[
          "Profile",
          "Products",
          "Profile Settings",
          "Pending Items",
          "Accpted/Completed Trades",
          "Reviews",
          "Trade History",
          "Dispute",
        ].map((tab) => (
          <a
            key={tab}
            role="tab"
            aria-current={activeTab === tab ? "true" : "false"}
            className={`tab tab-bordered w-full md:w-auto ${
              activeTab === tab ? "tab-active" : ""
            }`}
            onClick={() => setActiveTab(tab)}
            tabIndex={0} // Make the tab focusable
          >
            {tab}
          </a>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 md:mt-2 w-full border-t-2 pt-4">
        {renderContent()}
      </div>
    </div>
  );
}
