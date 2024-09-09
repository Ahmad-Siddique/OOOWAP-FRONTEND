"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout as logoutAction } from "../GlobalRedux/features/auth/authSlice";

const Header = () => {
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { loginInfo } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutAction());
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally handle logout error (e.g., show a message to the user)
    }
  };

  if (!isClient) return null;

  return (
    <div className="navbar bg-base-100 px-6">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/tiers" className="hover:text-primary">
                Tiers
              </Link>
            </li>
            <li>
              <Link href="/my-account" className="hover:text-primary">
                My Account
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" className="hover:text-primary">
                How it Works
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-primary">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-primary">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/parent" className="hover:text-primary">
                Parent
              </Link>
              <ul className="p-2">
                <li>
                  <Link href="/parent/submenu1" className="hover:text-primary">
                    Submenu 1
                  </Link>
                </li>
                <li>
                  <Link href="/parent/submenu2" className="hover:text-primary">
                    Submenu 2
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/item3" className="hover:text-primary">
                Item 3
              </Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl hover:text-primary">
          daisyUI
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
            <span className="text-lg font-semibold text-black">{loginInfo.user.firstName}</span>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={loginInfo.user.image}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link
                    href="/profile"
                    className="flex items-center justify-between hover:text-primary"
                  >
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="hover:text-primary">
                    Settings
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
