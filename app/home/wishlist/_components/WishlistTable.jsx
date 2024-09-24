"use client";

import { ChevronRightIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WishlistTable({ wishlist, handleRemove = () => {} }) {
  const router = useRouter();
  return (
    <div className="w-full overflow-auto">
      <table className="table-auto w-full border border-black/10">
        <thead>
          <tr className="border border-black/10">
            <th className="py-2 px-5 text-nowrap">Product</th>
            <th className="py-2 px-5 text-nowrap">Price</th>
            <th className="py-2 px-5 text-nowrap">Add to cart</th>
            <th className="py-2 px-5 text-nowrap">Remove</th>
          </tr>
        </thead>
        <tbody>
          {wishlist.map((product) => (
            <tr className="border border-black/10" key={product._id}>
              <td className="">
                <div className="flex py-2 px-10 text-nowrap items-center space-x-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                  <h3 className="text-lg">{product.name}</h3>
                </div>
              </td>
              <td className="text-center">${product.price}</td>
              <td className="">
                <div className="flex items-center justify-center w-full">
                  <button
                    onClick={() => router.push(`/home/shop/${product._id}`)}
                    className="w-fit flex items-center gap-1 bg-black group text-white py-2 px-5 text-nowrap font-light pl-5 pr-4"
                  >
                    Trade
                    <ChevronRightIcon className="h-5 w-0 group-hover:w-5 transition-all ease-in duration-150" />
                  </button>
                </div>
              </td>
              <td className="">
                <div className="flex items-center justify-center w-full">
                  <button
                    onClick={() => handleRemove(product._id)}
                    className="btn bg-red-600 text-white hover:bg-red-800 p-2 rounded-full transition duration-200"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
