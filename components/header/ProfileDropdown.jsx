"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

const ProfileDropdown = ({ loginInfo, logOut }) => {
  const [userdata, setuserdata] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const userDataString = localStorage.getItem("ooowap-user");
    console.log("Suuuuuuuuuuu",userDataString)
    // Try parsing and catch any errors
    try {
      const parsedData = userDataString ? JSON.parse(userDataString) : null;
      console.log("Parsed user data:", parsedData); // Log the parsed user data
      setuserdata(parsedData);
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
      setuserdata(null); // Reset userdata in case of an error
    } finally {
      setLoading(false); // Set loading to false after data retrieval
    }
  }, []);

  // Show loading state if necessary
  if (loading) return <div>Loading...</div>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-10 h-10">
        <div
          className="bg-center w-10 h-10 rounded-full bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${loginInfo.user.image})` }}
        ></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-primary mt-1 text-black">
        <DropdownMenuLabel>
          <div className="pb-2 flex flex-col gap-1 border-b border-black/30">
            <h1 className="text-lg font-bold">{loginInfo.user.firstName}</h1>
            <p className="text-xs text-black/80 font-normal">
              Balance:{" "}
              <span className="text-black text-sm font-bold">
                ${userdata ? userdata.balance : "0.00"}
              </span>
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href="/home/deposit">Deposit Money</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/home/withdraw">Withdraw Money</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            onClick={() => {
              localStorage.removeItem("ooowap-user");
              logOut();
            }}
          >
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
