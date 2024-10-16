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
import axios from "axios";

const ProfileDropdown = ({ loginInfo, logOut }) => {
  const [userdata, setuserdata] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
 const config = {
   headers: {
     Authorization: `Bearer ${loginInfo && loginInfo?.user?.token}`,
   },
 };
  const fetchUser = async () => {
    try {
      console.log("HEADER FETCH")
      // Replace with your actual API endpoint
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/auth/getuserprofile",
        config
      );
      setuserdata(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // setErrorMessage("Failed to load user data. Please try again.");
      // setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
    // const userDataString = localStorage.getItem("ooowap-user");
    // console.log("Suuuuuuuuuuu",userDataString)
    // // Try parsing and catch any errors
    // try {
    //   const parsedData = userDataString ? JSON.parse(userDataString) : null;
    //   if (loginInfo && parsedData==null) {
    //      window.location.reload();
    //   }
    //   console.log("Parsed user data:", parsedData); // Log the parsed user data
    //   setuserdata(parsedData);
    // } catch (error) {
    //   console.error("Error parsing user data from localStorage", error);
    //   setuserdata(null); // Reset userdata in case of an error
    // } finally {
    //   setLoading(false); // Set loading to false after data retrieval
    // }
  }, []);

  // Show loading state if necessary
  // if (loading) return <div>Loading...</div>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-10 h-10">
        <div
          className="bg-center w-10 h-10 rounded-full bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${userdata?.image})` }}
        ></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-primary mt-1 text-black">
        <DropdownMenuLabel>
          <div className="pb-2 flex flex-col gap-1 border-b border-black/30">
            <h1 className="text-lg font-bold">{userdata?.firstName}</h1>
            <p className="text-xs text-black/80 font-normal">
              Balance:{" "}
              <span className="text-black text-sm font-bold">
                {console.log("BALANCE", userdata?.balance)}$
                {userdata ? userdata?.balance : "0.00"}
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
