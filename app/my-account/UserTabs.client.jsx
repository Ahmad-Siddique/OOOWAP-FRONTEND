"use client";
import { useState } from "react";
import Profile from "./Profile";
import Products from "./Products";
import ProfileSettings from "./ProfileSettings";
import PendingItems from "./PendingItems";
import Reviews from "./Reviews";
import TradeHistory from "./TradeHistory";

export default function UserTabs() {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <div className="p-4">
            <Profile />
          </div>
        );
      case "Products":
        return (
          <div className="p-4">
            <Products />
          </div>
        );
      case "Profile Settings":
        return (
          <div className="p-4">
            <ProfileSettings />
          </div>
        );
      case "Pending Items":
        return (
          <div className="p-4">
           <PendingItems />
          </div>
        );
      case "Reviews":
        return (
          <div className="p-4">
            <Reviews />
          </div>
        );
      case "Trade History":
        return (
          <div className="p-4">
            <TradeHistory />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="tabs flex justify-center space-x-1">
        <a
          className={`tab tab-bordered ${
            activeTab === "Profile" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("Profile")}
        >
          Profile
        </a>
        <a
          className={`tab tab-bordered ${
            activeTab === "Products" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("Products")}
        >
          Products
        </a>
        <a
          className={`tab tab-bordered ${
            activeTab === "Profile Settings" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("Profile Settings")}
        >
          Profile Settings
        </a>
        <a
          className={`tab tab-bordered ${
            activeTab === "Pending Items" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("Pending Items")}
        >
          Pending Items
        </a>
        <a
          className={`tab tab-bordered ${
            activeTab === "Reviews" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("Reviews")}
        >
          Reviews
        </a>
        <a
          className={`tab tab-bordered ${
            activeTab === "Trade History" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("Trade History")}
        >
          Trade History
        </a>
      </div>

      {/* Tab Content - Ensure content is beneath the tabs */}
      <div className="mt-2 w-full border-t-2 pt-4">{renderContent()}</div>
    </div>
  );
}
