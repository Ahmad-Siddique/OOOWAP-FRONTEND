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
  const [descriptionLength, setDescriptionLength] = useState(0);

  // Ensure this component is only rendered client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Don't render anything on the server
  }

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setDescriptionLength(value.length);
      handleInputChange(e);
    }
  };

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
      <DialogContent className="max-w-3xl mx-auto" style={{ height: "600px" }}>
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
              className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500 transition duration-150"
              required
            />
          </div>

          {/* Brand field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Brand</label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="form-select w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500 transition duration-150"
              required
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
          </div>

          {/* Price field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Price</label>
            <input
              type="text" // Change to text to remove controls
              name="price"
              value={formData.price}
              onChange={(e) => {
                // Ensure only numeric input
                if (/^\d*\.?\d*$/.test(e.target.value)) {
                  handleInputChange(e);
                }
              }}
              className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500 transition duration-150"
              required
            />
          </div>

          {/* Width and Height fields */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Width</label>
              <input
                type="text" // Change to text to remove controls
                name="width"
                value={formData.width}
                onChange={(e) => {
                  // Ensure only numeric input
                  if (/^\d*\.?\d*$/.test(e.target.value)) {
                    handleInputChange(e);
                  }
                }}
                className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500 transition duration-150"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Height</label>
              <input
                type="text" // Change to text to remove controls
                name="height"
                value={formData.height}
                onChange={(e) => {
                  // Ensure only numeric input
                  if (/^\d*\.?\d*$/.test(e.target.value)) {
                    handleInputChange(e);
                  }
                }}
                className="form-input w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500 transition duration-150"
                required
              />
            </div>
          </div>

          {/* Description field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleDescriptionChange}
              className="form-textarea w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500 transition duration-150"
              rows="4"
              maxLength={200}
              required
            ></textarea>
            <div className="text-gray-600 text-sm mt-1">
              {descriptionLength}/200
            </div>
          </div>

          {/* Condition field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              className="form-select w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500 transition duration-150"
              required
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Old">Old</option>
              {/* Add more options as needed */}
            </select>
          </div>

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
              </button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
