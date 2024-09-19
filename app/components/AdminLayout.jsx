"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaUsers,
  FaBox,
  FaExchangeAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (router && router.pathname) {
      setCurrentPath(router.pathname);
    }
  }, [router]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-8 text-[#D5B868] text-center">
          Admin Panel
        </h1>
        <ul className="space-y-4">
          <li>
            <Link
              href="/admin/users"
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                currentPath.includes("/admin/users")
                  ? "bg-[#D5B868] text-black"
                  : "hover:bg-[#D5B868] hover:text-black"
              }`}
            >
              <FaUsers className="mr-3" /> Users
            </Link>
          </li>
          <li>
            <Link
              href="/admin/products"
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                currentPath.includes("/admin/products")
                  ? "bg-[#D5B868] text-black"
                  : "hover:bg-[#D5B868] hover:text-black"
              }`}
            >
              <FaBox className="mr-3" /> Products
            </Link>
          </li>
          <li>
            <Link
              href="/admin/trades"
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                currentPath.includes("/admin/trades")
                  ? "bg-[#D5B868] text-black"
                  : "hover:bg-[#D5B868] hover:text-black"
              }`}
            >
              <FaExchangeAlt className="mr-3" /> Trades
            </Link>
          </li>
          <li>
            <Link
              href="/admin/disputes"
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                currentPath.includes("/admin/disputes")
                  ? "bg-[#D5B868] text-black"
                  : "hover:bg-[#D5B868] hover:text-black"
              }`}
            >
              <FaExclamationTriangle className="mr-3" /> Disputes
            </Link>
          </li>

          <li>
            <Link
              href="/admin/categories"
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                currentPath.includes("/admin/categories")
                  ? "bg-[#D5B868] text-black"
                  : "hover:bg-[#D5B868] hover:text-black"
              }`}
            >
              <FaExclamationTriangle className="mr-3" /> Categories
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-white p-6 min-h-screen">
        <div className="bg-[#f8f8f8] rounded-lg shadow-md p-6">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
