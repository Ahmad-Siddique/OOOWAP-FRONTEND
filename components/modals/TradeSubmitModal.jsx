"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function TradeOfferModal({ isOpen, onClose, product, handleTrade }) {
  const shippingCost = 10; // Shipping price
  const totalAmount = product.price + shippingCost; // Total calculation

    const handleSubmit = (id) => {
        console.log("ID",id)
        handleTrade(id.userId._id);
        onClose()
    // Your logic for sending the trade offer goes here
    // toast.success("Trade offer sent successfully");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger>
        <button className="w-fit flex items-center gap-1 bg-black group text-gray-300 py-2 pl-5 pr-4">
          <span>Make a Trade Offer</span>
          <ChevronRightIcon className="h-5 w-0 group-hover:w-5 transition-all ease-in duration-150" />
        </button>
      </DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Trade Offer Details</DialogTitle>
          <DialogDescription>
            Review your trade offer before sending it.
          </DialogDescription>
          <div className="pt-5 flex flex-col items-center">
            {/* Display Product Image */}
            <img
              src={product.imageUrl || "/placeholder.png"}
              alt={product.name}
              className="w-48 h-auto object-cover mb-4"
            />
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-md text-gray-600">${product.price.toFixed(2)}</p>

            {/* Shipping and Total */}
            <div className="mt-4 w-full">
              <p className="text-sm">
                Website Shipping Price:{" "}
                <span className="font-semibold">
                  ${shippingCost.toFixed(2)}
                </span>
              </p>

              <p className="text-sm">
                Product Shipping Price:{" "}
                <span className="font-semibold">
                  $0.0
                </span>
              </p>

              <p className="text-lg font-semibold mt-2">
                Total:{" "}
                <span className="font-bold">${totalAmount.toFixed(2)}</span>
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex items-center pt-5 gap-1">
              <DialogClose asChild>
                <button
                  onClick={() => handleSubmit(product)}
                  className="w-fit flex items-center gap-1 bg-[#F5BA41] group text-white py-2 font-light pl-5 pr-4"
                >
                  Send Trade Offer
                  <ChevronRightIcon className="h-5 w-0 group-hover:w-5 transition-all ease-in duration-150" />
                </button>
              </DialogClose>
              <DialogClose asChild>
                <button className="w-fit flex items-center gap-1 bg-gray-400 group text-white py-2 font-light pl-5 pr-4">
                  Cancel
                  <ChevronRightIcon className="h-5 w-0 group-hover:w-5 transition-all ease-in duration-150" />
                </button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
