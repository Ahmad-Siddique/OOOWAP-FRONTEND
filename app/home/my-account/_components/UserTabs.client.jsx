"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Profile from "./Profile";
import Products from "./Products";
import ProfileSettings from "./ProfileSettings";
import PendingItems from "./PendingItems";
import Reviews from "./Reviews";
import TradeHistory from "./TradeHistory";
import Dispute from "./Dispute";
import AcceptedTrades from "./AcceptedTrades";

export default function UserTabs({ loginInfo }) {
  const [activeTab, setActiveTab] = useState("Profile");
  const router = useRouter();
  console.log("LOGIN INFO", loginInfo);

  // useEffect(() => {
  //   if (!loginInfo || !loginInfo.token) {
  //     router.push("/login"); // Redirect to login page if not authenticated
  //   }
  // }, [loginInfo, router]);

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <Profile loginInfo={loginInfo} />;
      case "Products":
        return <Products loginInfo={loginInfo} />;
      case "Profile Settings":
        return <ProfileSettings loginInfo={loginInfo} />;
      case "Pending Items":
        return <PendingItems loginInfo={loginInfo} />;
      case "Accpted/Completed Trades":
        return <AcceptedTrades loginInfo={loginInfo} />;

      case "Reviews":
        return <Reviews loginInfo={loginInfo} />;
      case "Trade History":
        return <TradeHistory loginInfo={loginInfo} />;
      case "Dispute":
        return <Dispute />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-[#F8F8F8]">
      {/* Tabs */}
      <div className="px-5 border-b-4 border-primary bg-white flex items-center justify-center">
        <div className="flex flex-col w-full max-w-7xl md:flex-row">
          {[
            "Profile",
            "Products",
            "Profile Settings",
            "Pending Items",
            "Accpted/Completed Trades",
            "Reviews",
            "Trade History",
            "Dispute",
          ].map((tab, index) => (
            <a
              key={tab}
              role="tab"
              aria-current={activeTab === tab ? "true" : "false"}
              className={`px-4 text-sm lg:text-base border-b md:border-b-0 md:border-r border-black/10 py-3 lg:py-5 ${
                index === 0 && "md:border-l"
              } ${activeTab === tab ? "tab-active" : ""}`}
              onClick={() => setActiveTab(tab)}
              tabIndex={0} // Make the tab focusable
            >
              {tab}
            </a>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="mt-4 md:mt-2 w-full pt-4">{renderContent()}</div>
    </div>
  );
}
