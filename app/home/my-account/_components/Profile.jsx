import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useRouter } from "next/navigation";

const Profile = ({ loginInfo }) => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const config = {
    headers: {
      Authorization: `Bearer ${loginInfo && loginInfo?.token}`,
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

  useEffect(() => {
    if (!loginInfo) {
      router.push("/login");
    }
    fetchUserData();
  }, [loginInfo]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Main Content Column */}
        <div className="md:col-span-3">
          <div className="bg-white shadow-lg p-6 mb-6 rounded-lg">
            {loginInfo && (
              <div className="flex flex-col items-center">
                <img
                  src={loginInfo.user.image}
                  alt="User"
                  className="rounded-full w-40 h-40 mb-4 border-4 border-[#D5B868]"
                />
                <h2 className="text-3xl font-bold text-black mb-2">
                  {loginInfo.user.firstName} {loginInfo.user.lastName}
                </h2>
                <p className="text-gray-600 mt-2 text-lg text-center">
                  {userData.userDescription || "No description available"}
                </p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-3xl font-bold text-[#D5B868] mb-6">
              Featured Products
            </h3>
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
        <div className="hidden md:block">
          <Sidebar loginInfo={loginInfo} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
