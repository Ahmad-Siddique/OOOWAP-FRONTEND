"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import moment from "moment"; // for formatting dates
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // Shadcn Button component
import { Input } from "@/components/ui/input"; // Shadcn Input component

const PendingItems = ({ loginInfo }) => {
  const [pendingTrades, setPendingTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [offererProducts, setoffererProducts] = useState();

  const fetchPendingTrades = async () => {
    try {
      const token = loginInfo ? loginInfo.user.token : null;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/trade/pending`,
        config
      );
      setPendingTrades(data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching trades");
    } finally {
      setLoading(false);
    }
  };


  const fetchUserData = async () => {
    try {
      // Fetching ooowap-user from localStorage
      const localStorageUser = JSON.parse(localStorage.getItem("ooowap-user"));

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

  useEffect(() => {
    fetchPendingTrades();
  }, [loginInfo]);

  const handleAcceptTrade = async (tradeId) => {
    try {
      const token = loginInfo ? loginInfo.user.token : null;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/trade/accept`,
        { tradeId },
        config
      );

      fetchPendingTrades();
      toast.success("Trade Accepted");
      fetchUserData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to accept trade");
    }
  };

  const handleRejectTrade = async (tradeId) => {
    try {
      const token = loginInfo ? loginInfo.user.token : null;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/trade/reject`,
        { tradeId },
        config
      );

      setPendingTrades(pendingTrades.filter((trade) => trade._id !== tradeId));
      toast.success("Trade Rejected");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject trade");
    }
  };

  const fetchOffererProducts = async (id, excludedid, setLoading) => {
    setLoading(true); // Start loading
    try {
      const localStorageUser = JSON.parse(localStorage.getItem("ooowap-user"));
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

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/products/${id}/exclude/${excludedid}`,
        config
      );

      setoffererProducts(response.data.products);
    } catch (error) {
      console.log(error);
      // setError(error.response?.data?.message || "Error fetching trades");
    } finally {
      setLoading(false); // End loading
    }
  };

  // Open Modal for Change Trade
  const handleOpenModal = (trade) => {
    fetchOffererProducts(
      trade.offerer._id,
      trade.offererProduct._id,
      setLoading
    );
    setSelectedTrade(trade);
    setIsModalOpen(true);
  };

  const handleReverseTrade = async (offerer) => {
    try {
      const token = loginInfo ? loginInfo.user.token : null;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/trade/reverse`,
        {
          tradeId: selectedTrade._id,
          selectedOffererProductId: selectedTrade.offererProduct._id,
        },
        config
      );
      fetchPendingTrades();
      setIsModalOpen(false);
      toast.success("Trade Offer Sent");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to accept trade");
    }
  };

  // Modal for changing the trade item
  const Modal = () => {
    const [selectedItem, setSelectedItem] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const shippingCost = 10; // Fixed shipping price

    const handleItemSelect = (itemId) => {
      const selectedProduct = offererProducts.find(
        (item) => item._id === itemId
      );
      setSelectedItem(selectedProduct);
    };

    const calculateTotal = () => {
      if (!selectedItem) return 0;
      return selectedItem.price + shippingCost;
    };

    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white rounded-lg p-6 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Change Trade Item
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Modify the item for trade. Ensure the item is in good condition
              before submitting.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Loading indicator */}
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 0116 0 8 8 0 01-16 0"
                  />
                </svg>
              </div>
            ) : (
              <>
                {/* Dropdown for selecting trade item */}
                <div className="relative">
                  <select
                    value={selectedItem?._id || ""}
                    onChange={(e) => handleItemSelect(e.target.value)}
                    className="block w-full bg-white border border-gray-300 rounded-lg p-2 shadow-sm focus:ring focus:ring-opacity-50"
                  >
                    <option value="" disabled>
                      Select a trade item
                    </option>
                    {offererProducts &&
                      offererProducts.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Display selected product details */}
                {selectedItem && (
                  <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Selected Item Details
                    </h3>
                    <div className="flex gap-4 items-start mt-3">
                      <img
                        src={selectedItem.imageUrl}
                        alt={selectedItem.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex flex-col">
                        <p className="text-gray-700 font-medium">
                          {selectedItem.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Brand: {selectedItem.brand}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Price: ${selectedItem.price.toFixed(2)}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Start Date:{" "}
                          {moment(selectedTrade.startDate).format(
                            "MMMM Do YYYY"
                          )}
                        </p>
                        <p className="text-gray-500 text-sm">
                          End Date:{" "}
                          {moment(selectedTrade.endDate).format("MMMM Do YYYY")}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Shipping: ${shippingCost.toFixed(2)}
                        </p>
                        <p className="text-gray-800 font-semibold mt-2">
                          Total: ${calculateTotal().toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <DialogFooter className="flex justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReverseTrade}
              disabled={!selectedItem}
              className="rounded-md bg-[#F5BA41] hover:bg-[#F5BA41] text-white"
            >
              Submit Trade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Pending Trades</h1>

      {loading && <p>Loading pending trades...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ToastContainer />

      {/* Modal Component */}
      {isModalOpen && <Modal />}

      {!loading && pendingTrades.length === 0 && (
        <p className="text-gray-600">No pending trades at the moment.</p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pendingTrades.map((trade) => (
          <div
            key={trade._id}
            className="bg-white rounded-lg shadow-lg p-6 relative flex flex-col max-w-full lg:max-w-lg mx-auto"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Trade Proposal
              </h2>

              <div className="flex flex-col sm:flex-row lg:flex-col justify-between gap-4">
                {/* Offerer's Product */}
                <div className="bg-gray-100 p-4 rounded-lg flex-1">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Offerer's Product
                  </h3>
                  <div className="w-full aspect-w-4 aspect-h-3 flex items-center justify-center mb-2">
                    <img
                      src={trade.offererProduct.imageUrl}
                      alt={trade.offererProduct.name}
                      className="w-full max-w-xs h-auto object-cover rounded"
                    />
                  </div>
                  <p className="text-gray-800 font-medium">
                    {trade.offererProduct.name}
                  </p>
                  <p className="text-gray-600">
                    Brand: {trade.offererProduct.brand}
                  </p>
                  <p className="text-gray-600">
                    Price: ${trade.offererProduct.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600">
                    Condition: {trade.offererProduct.condition}
                  </p>
                </div>

                {/* Receiver's Product */}
                <div className="bg-gray-100 p-4 rounded-lg flex-1">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Your Product
                  </h3>
                  <div className="w-full aspect-w-4 aspect-h-3 flex items-center justify-center mb-2">
                    <img
                      src={trade.receiverProduct.imageUrl}
                      alt={trade.receiverProduct.name}
                      className="w-full max-w-xs h-auto object-cover rounded"
                    />
                  </div>
                  <p className="text-gray-800 font-medium">
                    {trade.receiverProduct.name}
                  </p>
                  <p className="text-gray-600">
                    Brand: {trade.receiverProduct.brand}
                  </p>
                  <p className="text-gray-600">
                    Price: ${trade.receiverProduct.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600">
                    Condition: {trade.receiverProduct.condition}
                  </p>
                </div>
              </div>

              <p className="text-gray-500 mt-4">
                Offer Start Date:{" "}
                {moment(trade.startDate).format("MMMM Do YYYY")}
              </p>
              <p className="text-gray-500">
                Offer End Date: {moment(trade.endDate).format("MMMM Do YYYY")}
              </p>
            </div>

            <div className="flex justify-between items-center mt-auto space-x-4">
              <Button
                className="bg-[#F5BA41] text-white px-4 py-2 rounded-lg hover:bg-[#F5BA41]"
                onClick={() => handleAcceptTrade(trade._id)}
              >
                Accept
              </Button>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={() => handleRejectTrade(trade._id)}
              >
                Reject
              </Button>
              <Button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => handleOpenModal(trade)}
              >
                Change Trade Item
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingItems;
