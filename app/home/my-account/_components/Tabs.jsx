"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Tabs = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full max-w-7xl md:flex-row">
      {[
        "Profile",
        "Products",
        "Profile Settings",
        "Pending Items",
        "Accepted/Completed Trades",
        "Reviews",
        "Trade History",
        "Dispute",
       
      ].map((tab, index) => (
        <Link
          key={index}
          className={`px-4 text-sm lg:text-base border-b md:border-b-0 md:border-r border-black/10 py-3 lg:py-5 ${
            index === 0 && "md:border-l"
          } `}
          href={
            tab === "Profile"
              ? "/home/my-account"
              : tab === "Accepted/Completed Trades"
              ? "/home/my-account/accepted-completed-trades"
              : `/home/my-account/${tab.toLowerCase().replace(" ", "-")}`
          }
        >
          {tab}
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
