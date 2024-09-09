import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
const Profile = () => {
      const { loginInfo } = useSelector((state) => state.auth);
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer nec odio. Praesent libero. Sed cursus ante dapibus
                  diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                  Duis sagittis ipsum.Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Integer nec odio. Praesent libero. Sed cursus
                  ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
                  imperdiet. Duis sagittis ipsum.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Integer nec odio. Praesent
                  libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem
                  at nibh elementum imperdiet. Duis sagittis ipsum.Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                  Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
                  quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
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
              <div className="bg-white shadow-md p-4">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Product 1"
                  className="w-full h-32 object-cover mb-2"
                />
                <h4 className="text-lg font-semibold">Product 1</h4>
                <p className="text-gray-600">Description of product 1</p>
              </div>

              {/* Product Card 2 */}
              <div className="bg-white shadow-md p-4">
                <img
                  src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Product 2"
                  className="w-full h-32 object-cover mb-2"
                />
                <h4 className="text-lg font-semibold">Product 2</h4>
                <p className="text-gray-600">Description of product 2</p>
              </div>

              {/* Product Card 3 */}
              <div className="bg-white shadow-md p-4">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Product 3"
                  className="w-full h-32 object-cover mb-2"
                />
                <h4 className="text-lg font-semibold">Product 3</h4>
                <p className="text-gray-600">Description of product 3</p>
              </div>
            </div>
          </div>
              </div>
              <Sidebar />

        
      </div>
    </div>
  );
};

export default Profile;
