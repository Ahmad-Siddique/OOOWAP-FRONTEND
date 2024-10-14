"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const TradeInformation = ({ loginInfo, trade }) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [modalSelection, setModalSelection] = useState(""); // Store dropdown selection
  const router = useRouter();

  const handleModalOpen = (action) => {
    setModalAction(action);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalSelection(""); // Reset dropdown selection when modal closes
  };

  const handleConfirm = async () => {
    if (modalSelection !== "Yes") {
      handleModalClose();
      return;
    }


    const fetchUserData = async () => {
      try {
        // Fetching ooowap-user from localStorage
        const localStorageUser = JSON.parse(
          localStorage.getItem("ooowap-user")
        );

        // Check if loginInfo or token exists
        const token = localStorageUser ? localStorageUser.token : null;

        if (!token) {
          console.error("Token not found in localStorage.");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch user data from API
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/auth/getMe",
          config
        );

        const apiUserData = response.data.data;

        // Compare balance in localStorage and API response
        if (localStorageUser.balance !== apiUserData.balance) {
          // Update localStorage with the new balance and other user data
          localStorageUser.firstName = apiUserData.firstName;
          localStorageUser.lastName = apiUserData.lastName;
          localStorageUser.balance = apiUserData.balance;
          localStorageUser.email = apiUserData.email;
          localStorageUser.picture = apiUserData.photoURL;

          // Store updated user data in localStorage
          localStorage.setItem("ooowap-user", JSON.stringify(localStorageUser));

          // Reload the page to reflect updated user data
          window.location.reload();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    setLoading(true);
    try {
      const token = loginInfo.user.token;
      const endpoint =
        modalAction === "received"
          ? `/trade/trade/offerer-received/${trade._id}`
          : `/trade/trade/offerer-finished/${trade._id}`;

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUserData();
      window.location.reload();
    } catch (error) {
      console.error("Error processing trade:", error);
    } finally {
      setLoading(false);
      handleModalClose();
    }
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">
        Trade Details
      </h1>

      <div className="bg-white shadow-lg p-8 rounded-lg border border-gray-300">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {trade.offerer.firstName} is trading their{" "}
          <span className="font-bold">{trade.offererProduct.name}</span> for
          your <span className="font-bold">{trade.receiverProduct.name}</span>
        </h2>

        <div className="flex flex-col md:flex-row md:space-x-8 mb-6">
          {/* Offerer's Product */}
          <div className="flex items-center w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src={trade.offererProduct.imageUrl}
              alt="Offerer's Product"
              className="w-40 h-40 object-cover rounded-md shadow-md"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-[#D5B868]">
                {trade.offerer._id == loginInfo.user.id
                  ? "Your Product"
                  : "Trade Partner's Product"}
              </h3>
              <h4 className="text-xl font-semibold text-gray-800">
                {trade.offererProduct.name}
              </h4>
              <p className="text-gray-600">
                Price:{" "}
                <span className="font-bold">${trade.offererProduct.price}</span>
              </p>
            </div>
          </div>

          {/* Receiver's Product */}
          <div className="flex items-center w-full md:w-1/2">
            <img
              src={trade.receiverProduct.imageUrl}
              alt="Receiver's Product"
              className="w-40 h-40 object-cover rounded-md shadow-md"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-[#D5B868]">
                {trade.receiver._id == loginInfo.user.id
                  ? "Your Product"
                  : "Trade Partner's Product"}
              </h3>
              <h4 className="text-xl font-semibold text-gray-800">
                {trade.receiverProduct.name}
              </h4>
              <p className="text-gray-600">
                Price:{" "}
                <span className="font-bold">
                  ${trade.receiverProduct.price}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-lg font-semibold">
            Trade Status:{" "}
            <span
              className={`font-bold ${
                trade.status === "completed" ? "text-green-600" : "text-black-600"
              }`}
            >
              {trade.status}
            </span>
          </p>
          <p className="text-lg font-semibold">
            Start Date:{" "}
            <span className="font-bold">
              {new Date(trade.startDate).toLocaleDateString()}
            </span>
          </p>
          <p className="text-lg font-semibold">
            End Date:{" "}
            <span className="font-bold">
              {new Date(trade.endDate).toLocaleDateString()}
            </span>
          </p>
        </div>

        <div className="mt-6">
          <p className="text-lg font-semibold">
            Trade Partner’s Item Received:{" "}
            <span
              className={`font-bold `}
              // ${
              //   trade.status === "completed" ?
              //      "text-green-600"
              //     : "text-black-600"
              // }
            >
              {trade.offerer._id == loginInfo.user.id
                ? !trade.offererReceived
                  ? "No"
                  : "Yes"
                : !trade.receiverReceived
                ? "No"
                : "Yes"}
            </span>
          </p>
          <p className="text-lg font-semibold">
            Product Return:{" "}
            <span className="font-bold">
              {trade.offerer._id == loginInfo.user.id
                ? !trade.offererFinished
                  ? "No"
                  : "Yes"
                : !trade.receiverFinished
                ? "No"
                : "Yes"}
            </span>
          </p>
        </div>

        <div className="mt-8 flex flex-col space-y-4">
          {trade.offerer._id == loginInfo.user.id
            ? (trade.offererReceived != true ||
                trade.offererReceived == null) && (
                <button
                  onClick={() => handleModalOpen("received")}
                  className={`bg-[#D5B868] text-white py-3 px-6 rounded-lg hover:bg-[#F5BA41] transition duration-200 ease-in-out ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading || trade.offererFinished}
                >
                  {loading
                    ? "Processing..."
                    : "Confirm Receipt of Other's Product"}
                </button>
              )
            : (trade.receiverReceived != true ||
                trade.receiverReceived == null) && (
                <button
                  onClick={() => handleModalOpen("received")}
                  className={`bg-[#D5B868] text-white py-3 px-6 rounded-lg hover:bg-[#F5BA41] transition duration-200 ease-in-out ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading || trade.receiverReceived}
                >
                  {loading
                    ? "Processing..."
                    : "Confirm Receipt of Other's Product"}
                </button>
              )}
          {trade.offerer._id == loginInfo.user.id
            ? trade.offererReceived &&
              (trade.offererFinished != true ||
                trade.offererFinished == null) && (
                <button
                  onClick={() => handleModalOpen("finished")}
                  className={`bg-[#D5B868] text-white py-3 px-6 rounded-lg hover:bg-[#F5BA41] transition duration-200 ease-in-out ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading
                    ? "Processing..."
                    : "Confirm Receipt of Your Product Back"}
                </button>
              )
            : trade.receiverReceived &&
              (trade.receiverFinished != true ||
                trade.receiverFinished == null) && (
                <button
                  onClick={() => handleModalOpen("finished")}
                  className={`bg-[#D5B868] text-white py-3 px-6 rounded-lg hover:bg-[#F5BA41] transition duration-200 ease-in-out ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading
                    ? "Processing..."
                    : "Confirm Receipt of Your Product Back"}
                </button>
              )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {modalAction === "received"
                ? "Confirm Receipt of Other's Product"
                : "Confirm Receipt of Your Product Back"}
            </h2>

            {/* Dropdown Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select an Option:
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={modalSelection}
                onChange={(e) => setModalSelection(e.target.value)}
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={handleModalClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className={`bg-[#F5BA41] text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!modalSelection || loading}
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeInformation;
