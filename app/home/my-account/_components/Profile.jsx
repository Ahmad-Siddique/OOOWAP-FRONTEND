"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const Profile = ({ loginInfo }) => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const config = {
    headers: {
      Authorization: `Bearer ${loginInfo && loginInfo?.user?.token}`,
    },
  };

  const fetchUserData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/featured-products`,
        config
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching userData:", error);
      setError("Failed to load data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchUserData();
  // }, [loginInfo]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Main Content Column */}
        <div className="md:col-span-3 flex flex-col gap-10">
          <div className="relative w-full h-72">
            <div className="absolute w-full bg-[#F5E9A6] left-3 top-3 p-5">
              {loginInfo && (
                <div className="flex flex-col">
                  <img
                    src={loginInfo?.user.image}
                    alt="User"
                    className="rounded-full w-52 h-52 border-4 border-[#D5B868]"
                  />
                  {/* <h2 className="text-3xl font-bold text-black mb-2">
                  {loginInfo.user.firstName} {loginInfo.user.lastName}
                </h2>
                <p className="text-gray-600 mt-2 text-lg text-center">
                  {userData.userDescription || "No description available"}
                </p> */}
                </div>
              )}
            </div>
            <div className="absolute w-full bg-[#FDDC26] left-2 top-2 p-5">
              {loginInfo && (
                <div className="flex flex-col">
                  <img
                    src={loginInfo.user.image}
                    alt="User"
                    className="rounded-full w-52 h-52 border-4 border-[#D5B868]"
                  />
                  {/* <h2 className="text-3xl font-bold text-black mb-2">
                  {loginInfo.user.firstName} {loginInfo.user.lastName}
                </h2>
                <p className="text-gray-600 mt-2 text-lg text-center">
                  {userData.userDescription || "No description available"}
                </p> */}
                </div>
              )}
            </div>
            <div className="absolute w-full bg-[#DFAF2E] left-1 top-1 p-5">
              {loginInfo && (
                <div className="flex flex-col">
                  <img
                    src={loginInfo.user.image}
                    alt="User"
                    className="rounded-full w-52 h-52 border-4 border-[#D5B868]"
                  />
                  {/* <h2 className="text-3xl font-bold text-black mb-2">
                  {loginInfo.user.firstName} {loginInfo.user.lastName}
                </h2>
                <p className="text-gray-600 mt-2 text-lg text-center">
                  {userData.userDescription || "No description available"}
                </p> */}
                </div>
              )}
            </div>
            <div className="absolute w-full bg-white p-5">
              {loginInfo && (
                <div className="flex flex-col">
                  <img
                    src={loginInfo.user.image}
                    alt="User"
                    className="rounded-full w-52 h-52 border-4 border-[#D5B868]"
                  />
                  {/* <h2 className="text-3xl font-bold text-black mb-2">
                  {loginInfo.user.firstName} {loginInfo.user.lastName}
                </h2>
                <p className="text-gray-600 mt-2 text-lg text-center">
                  {userData.userDescription || "No description available"}
                </p> */}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="px-3 border-l-[6px] border-primary">
              <div className="border-b-2 border-primary pb-2 w-fit">
                <span className="text-5xl font-bold italic border-b-2 text-primary border-primary">
                  This is Dashboard
                </span>
              </div>
            </div>
            <span className="text-blue-800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
              ipsam perferendis. Totam quisquam est exercitationem a. Culpa,
              voluptatibus a dolorem nulla vero quae voluptates velit inventore
              maiores? Dolor libero, laborum, distinctio suscipit officiis nisi
              vel quidem laboriosam, fuga voluptatibus perferendis? Commodi
              nostrum sequi, quam et, eligendi sed assumenda, officiis modi
              aliquam fuga nam molestiae quae provident. Dolorum distinctio
              numquam nostrum? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Nisi, ipsam perferendis. Totam quisquam est
              exercitationem a. Culpa, voluptatibus a dolorem nulla vero quae
              voluptates velit inventore maiores? Dolor libero, laborum,
              distinctio suscipit officiis nisi vel quidem laboriosam, fuga
              voluptatibus perferendis? Commodi nostrum sequi, quam et, eligendi
              sed assumenda, officiis modi aliquam fuga nam molestiae quae
              provident. Dolorum distinctio numquam nostrum? Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Nisi, ipsam perferendis.
              Totam quisquam est exercitationem a. Culpa, voluptatibus a dolorem
              nulla vero quae voluptates velit inventore maiores? Dolor libero,
              laborum, distinctio suscipit officiis nisi vel quidem laboriosam,
              fuga voluptatibus perferendis? Commodi nostrum sequi, quam et,
              eligendi sed assumenda, officiis modi aliquam fuga nam molestiae
              quae provident. Dolorum distinctio numquam nostrum? Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Nisi, ipsam
              perferendis. Totam quisquam est exercitationem a. Culpa,
              voluptatibus a dolorem nulla vero quae voluptates velit inventore
              maiores? Dolor libero, laborum, distinctio suscipit officiis nisi
              vel quidem laboriosam, fuga voluptatibus perferendis? Commodi
              nostrum sequi, quam et, eligendi sed assumenda, officiis modi
              aliquam fuga nam molestiae quae provident. Dolorum distinctio
              numquam nostrum? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Nisi, ipsam perferendis. Totam quisquam est
              exercitationem a. Culpa, voluptatibus a dolorem nulla vero quae
              voluptates velit inventore maiores? Dolor libero, laborum,
              distinctio suscipit officiis nisi vel quidem laboriosam, fuga
              voluptatibus perferendis? Commodi nostrum sequi, quam et, eligendi
              sed assumenda, officiis modi aliquam fuga nam molestiae quae
              provident. Dolorum distinctio numquam nostrum?
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6">Featured Items</h3>
            {isLoading ? (
              <div className="flex flex-col items-center">
                <svg
                  className="animate-spin h-12 w-12 text-[#D5B868]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span className="mt-2 text-gray-700 text-xl">Loading...</span>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded mb-4">
                {error}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userData.featuredProducts &&
                userData.featuredProducts.length > 0 ? (
                  userData.featuredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white shadow-md p-6 rounded-lg"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-40 object-cover mb-4 rounded-lg"
                      />
                      <h4 className="text-xl font-semibold mb-2">
                        {product.name} ({product.price})
                      </h4>
                      <p className="text-gray-600">{product.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-lg">
                    No featured products available.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="">
          <Sidebar loginInfo={loginInfo} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
