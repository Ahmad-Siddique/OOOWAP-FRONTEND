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
import axios from "axios";
import { ChevronRightIcon } from "lucide-react";
import { toast } from "react-toastify";

export default function DeleteProductModal({
  product,
  fetchProducts = () => {},
  token,
}) {
  const handleDelete = async (productId) => {
    try {
      console.log("Deleting product with id: ", productId);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`,
        config
      );
      fetchProducts();
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.log("ERROR", error)
      toast.error("Error deleting product!");
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <button className="w-fit flex items-center gap-1 bg-red-600 group text-white py-2 font-light pl-5 pr-4">
          Delete
          <ChevronRightIcon className="h-5 w-0 group-hover:w-5 transition-all ease-in duration-150" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this product?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            product and remove your data from our servers.
          </DialogDescription>
          <div className="flex items-center pt-5 gap-1">
            <DialogClose asChild>
              <button
                onClick={() => handleDelete(product._id)}
                className="w-fit flex items-center gap-1 bg-red-600 group text-white py-2 font-light pl-5 pr-4"
              >
                Confirm
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
