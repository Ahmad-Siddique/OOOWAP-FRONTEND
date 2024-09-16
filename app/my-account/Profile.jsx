import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios'
import Sidebar from "./Sidebar";
const Profile = () => {
  const { loginInfo } = useSelector((state) => state.auth);
  const [userData, setuserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  let config = {
    headers: {
      Authorization: `Bearer ${loginInfo.token}`,
    },
  };

  const fetchUSerData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/featured-products`,
        config
      );
      setuserData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching userData:", error);
      // toast.error("Error fetching userData!");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUSerData();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Main Row */}
      <div className="grid grid-cols-12 gap-4">
        {/* First Column (Main Content) */}
        <div className="col-span-9">
          {/* User Card */}
          <div className="bg-white shadow-lg p-6 mb-6">
            {loginInfo && (
              <div className="flex flex-col items-center">
                <img
                  src={loginInfo.user.image}
                  alt="User"
                  className="rounded-full w-32 h-32 mb-4"
                />
                <h2 className="text-xl italic font-bold text-yellow-600 underline underline-double decoration-yellow-400">
                  {loginInfo.user.firstName} {loginInfo.user.lastName}
                </h2>
                <p className="text-gray-600 mt-4">
                  {userData && userData.userDescription}
                </p>
              </div>
            )}
          </div>

          {/* Featured Products */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-600 mb-4">
              Featured Products
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {/* Product Card 1 */}

              {userData.featuredProducts && userData.featuredProducts.length != 0
                ? userData.featuredProducts.map((data) => {
                    return (
                      <div className="bg-white shadow-md p-4">
                        <img
                          src={data.imageUrl}
                          alt="Product 1"
                          className="w-full h-32 object-cover mb-2"
                        />
                        <h4 className="text-lg font-semibold">{data.name}</h4>
                        <p className="text-gray-600">{data.description}</p>
                      </div>
                    );
                  })
                : "No Featured Prodcuts"}

             
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default Profile;
