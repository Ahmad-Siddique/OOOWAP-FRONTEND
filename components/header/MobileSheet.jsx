"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MobileSheet = ({ loginInfo, logOut }) => {
   const [userdata, setuserdata] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
   const config = {
     headers: {
       Authorization: `Bearer ${loginInfo && loginInfo?.user?.token}`,
     },
   };
const fetchUser = async () => {
  try {
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





    //  const userDataString = localStorage.getItem("ooowap-user");
    //  console.log("Suuuuuuuuuuu", userDataString);
    //  // Try parsing and catch any errors
    //  try {
    //    const parsedData = userDataString ? JSON.parse(userDataString) : null;
    //    if (loginInfo && parsedData == null) {
    //      window.location.reload();
    //    }
    //    console.log("Parsed user data:", parsedData); // Log the parsed user data
    //    setuserdata(parsedData);
    //  } catch (error) {
    //    console.error("Error parsing user data from localStorage", error);
    //    setuserdata(null); // Reset userdata in case of an error
    //  } finally {
    //    setLoading(false); // Set loading to false after data retrieval
    //  }
   }, []);
  return (
    <Sheet>
      <SheetTrigger>
        <div
          className="bg-center w-10 h-10 rounded-full bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${userdata?.image})` }}
        ></div>
      </SheetTrigger>
      <SheetContent className="bg-black text-white border-primary">
        <SheetHeader>
          <SheetTitle>
            <Image src="/images/logo.png" width={170} height={48} alt="LOGO" />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col px-3 py-5 gap-3">
          <div className="flex items-center gap-3">
            <div
              className="bg-center w-12 h-12 border border-primary rounded-full bg-no-repeat bg-cover"
              style={{ backgroundImage: `url(${userdata?.image})` }}
            ></div>
            <div className="pb-2 flex flex-col border-b border-black/30">
              <h1 className="text-lg font-bold">{userdata?.firstName}</h1>
              <p className="text-xs text-white/80 font-normal">
                Balance:{" "}
                <span className="text-white text-sm font-bold">
                  {console.log("Mobile Balance: ",userdata?.balance)}
                  ${userdata?.balance}
                </span>
              </p>
            </div>
          </div>
          <Link href="/home" className="hover:text-primary">
            Home
          </Link>
          <Link href="/home/deposit" className="hover:text-primary">
            Deposit Money
          </Link>
          <Link href="/home/withdraw" className="hover:text-primary">
            Withdraw Money
          </Link>
          <Link href="/home/tiers" className="hover:text-primary">
            Tiers
          </Link>
          <Link href="/home/my-account" className="hover:text-primary">
            My Account
          </Link>
          <Link href="/home/how-it-works" className="hover:text-primary">
            How it Works
          </Link>
          <Link href="/home/faqs" className="hover:text-primary">
            FAQs
          </Link>
          <Link href="/home/contact-us" className="hover:text-primary">
            Contact Us
          </Link>
          <button
            className="bg-primary text-black px-8 py-2.5"
            onClick={() => logOut()}
          >
            Logout
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
