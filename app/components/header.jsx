"use client";
import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout as logoutAction } from "../GlobalRedux/features/auth/authSlice";
import { HeartIcon } from "@heroicons/react/outline"; // Import Heroicons HeartIcon

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loginInfo } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutAction());
      console.log("Pushing to /login...");
      router.push("/login"); // Redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar bg-base-100 px-6">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost">
          <img src="/images/logo.png" alt="Logo" className="h-12 w-auto" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/" className="hover:text-primary text-lg">
              Home
            </Link>
          </li>
          <li>
            <Link href="/tiers" className="hover:text-primary text-lg">
              Tiers
            </Link>
          </li>
          <li>
            <Link href="/my-account" className="hover:text-primary text-lg">
              My Account
            </Link>
          </li>
          <li>
            <Link href="/how-it-works" className="hover:text-primary text-lg">
              How it Works
            </Link>
          </li>
          <li>
            <Link href="/faqs" className="hover:text-primary text-lg">
              FAQs
            </Link>
          </li>
          <li>
            <Link href="/contact-us" className="hover:text-primary text-lg">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {loginInfo ? (
          <div className="flex items-center space-x-4">
            {/* Heart Icon for Wishlist */}
            <Link href="/wishlist" className="text-gray-700 hover:text-primary">
              <HeartIcon className="h-6 w-6" />
            </Link>
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold text-black">
                {loginInfo.user.firstName}
              </span>
              <span className="text-md text-gray-600">
                Balance: ${loginInfo.user.balance?.toFixed(2)}
              </span>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User Avatar" src={loginInfo.user.image} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link
                    href="/deposit"
                    className="flex items-center justify-between hover:text-primary"
                  >
                    Deposit Money
                  </Link>
                </li>
                <li>
                  <Link href="/withdraw" className="hover:text-primary">
                    Withdraw Money
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-primary w-full text-left"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
