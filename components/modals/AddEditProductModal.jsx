"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRightIcon } from "lucide-react";

export default function AddEditProductModal({
  product,
  editProduct,
  handleSubmit = () => {},
  formData = {},
  handleInputChange = () => {},
  handleFileChange = () => {},
  handleEdit = () => {},
  imagePreview,
  isSubmitting,
}) {
  const [isMounted, setIsMounted] = useState(false);

  // Ensure this component is only rendered client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Don't render anything on the server
  }

  return (
    <Dialog>
      <DialogTrigger>
        <button
          onClick={() => {
            editProduct ? handleEdit(product) : null;
          }}
          className="w-fit flex items-center gap-1 bg-gray-400 group text-white py-2 font-light pl-5 pr-4"
        >
          {editProduct ? "Edit" : "Add"}
          <ChevronRightIcon className="h-5 w-0 group-hover:w-5 transition-all ease-in duration-150" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editProduct ? "Edit" : "Add"} Product</DialogTitle>
          <DialogDescription>
            Please fill the form to {editProduct ? "edit" : "add"} a product.
          </DialogDescription>
        </DialogHeader>
        <form
          className="overflow-auto max-h-[50vh] pr-4"
          onSubmit={handleSubmit}
        >
          {/* Name field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input w-full border-b-2 border-gray-300"
            />
          </div>

          {/* Brand field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Brand</label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="form-select w-full border-b-2 border-gray-300"
            >
              <option value="">Select Brand</option>
              {[
                "Nike",
                "Adidas",
                "Puma",
                "Gucci",
                "Louis Vuitton",
                "Versace",
                "Chanel",
                "Prada",
                "Balenciaga",
                "Hermes",
                "Other",
              ].map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            {formData.brand === "Other" && (
              <input
                type="text"
                name="customBrand"
                value={formData.customBrand}
                onChange={handleInputChange}
                placeholder="Enter brand name"
                className="form-input w-full border-b-2 border-gray-300 mt-2"
              />
            )}
          </div>

          {/* Price field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="form-input w-full border-b-2 border-gray-300"
            />
          </div>

          {/* Size field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Size</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              className="form-input w-full border-b-2 border-gray-300"
            />
          </div>

          {/* Description field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-textarea w-full border-b-2 border-gray-300"
              rows="4"
            ></textarea>
          </div>

          {/* Condition field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Condition</label>
            <input
              type="text"
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              className="form-input w-full border-b-2 border-gray-300"
            />
          </div>

          {/* Image 1 */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Image 1</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "image")}
              className="form-input w-full border-b-2 border-gray-300"
            />
            {imagePreview[0] && (
              <img
                src={imagePreview[0]}
                alt="Preview"
                className="mt-4 w-20 h-20 object-cover"
              />
            )}
          </div>

          {/* Image 2 */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Image 2</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "imageUrl1")}
              className="form-input w-full border-b-2 border-gray-300"
            />
            {imagePreview[1] && (
              <img
                src={imagePreview[1]}
                alt="Preview"
                className="mt-4 w-20 h-20 object-cover"
              />
            )}
          </div>

          {/* Image 3 */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Image 3</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "imageUrl2")}
              className="form-input w-full border-b-2 border-gray-300"
            />
            {imagePreview[2] && (
              <img
                src={imagePreview[2]}
                alt="Preview"
                className="mt-4 w-20 h-20 object-cover"
              />
            )}
          </div>

          {/* Submit buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              className={`w-fit flex items-center gap-1 bg-green-400 group text-white py-2 font-light pl-5 pr-4 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {editProduct ? "Update" : "Add"}
              <ChevronRightIcon className="h-5 w-0 group-hover:w-5 transition-all ease-in duration-150" />
            </button>
            <DialogClose asChild>
              <button
                type="button"
                className={`w-fit flex items-center gap-1 bg-gray-400 group text-white py-2 font-light pl-5 pr-4 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                Cancel
                <ChevronRightIcon className="h-5 w-0 group-hover:w-5 transition-all ease-in duration-150" />
              </button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
