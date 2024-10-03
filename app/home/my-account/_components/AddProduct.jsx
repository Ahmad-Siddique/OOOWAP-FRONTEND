"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddProductPage = ({loginInfo}) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    width: "",
    height: "",
    description: "",
    condition: "",
    imageUrl: null,
    imageUrl1: null,
    imageUrl2: null,
  });
  const [descriptionLength, setDescriptionLength] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    };
     const config = {
       headers: {
         Authorization: `Bearer ${loginInfo?.user.token}`,
       },
     };

    const handleImageChange = (field) => (file) => {
      setFormData((prev) => ({ ...prev, [field]: file }));
    };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setDescriptionLength(value.length);
      handleInputChange(e);
    }
  };

  const validateNumberInput = (e) => {
    const value = e.target.value;
    // Allow empty input or input greater than 0
    if (value === "" || (!isNaN(value) && Number(value) > 0)) {
      handleInputChange(e);
    }
    };
    

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMITTING")
    setIsSubmitting(true); // Lock buttons during submission
    try {
     console.log("FORM DATA",formData)
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSubmit.append(key, formData[key]);
      });

     
        await axios.post(
         `${process.env.NEXT_PUBLIC_API_URL}/product/products`,
          formDataToSubmit,
          config
        );

        router.push("/home/my-account/products")
        // toast.success("Product added successfully!");
   
      fetchProducts(); // Refetch products after add/update
    } catch (error) {
        console.log(error)
    //   toast.error("Error adding/updating product!");
    } finally {
      setIsSubmitting(false); // Unlock buttons after submission
    }
  };

  return (
    <div className="px-10 py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <div className="space-y-6">
        {renderInputField(
          "Product Name",
          "name",
          formData.name,
          handleInputChange
        )}

        {/* Using Shadcn Select for Brand */}
        <div>
          <Label htmlFor="brand" className="font-medium text-gray-700">
            Brand
          </Label>
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, brand: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Gucci">Gucci</SelectItem>
              <SelectItem value="Chanel">Chanel</SelectItem>
              <SelectItem value="Louis Vuitton">Louis Vuitton</SelectItem>
              <SelectItem value="Prada">Prada</SelectItem>
              <SelectItem value="Michael Kors">Michael Kors</SelectItem>
              <SelectItem value="Kate Spade">Kate Spade</SelectItem>
              <SelectItem value="Coach">Coach</SelectItem>
              <SelectItem value="Fendi">Fendi</SelectItem>
              <SelectItem value="Tory Burch">Tory Burch</SelectItem>
              <SelectItem value="Burberry">Burberry</SelectItem>
              <SelectItem value="Bottega Veneta">Bottega Veneta</SelectItem>
              <SelectItem value="Dior">Dior</SelectItem>
              <SelectItem value="Versace">Versace</SelectItem>
              <SelectItem value="Chloé">Chloé</SelectItem>
              <SelectItem value="Givenchy">Givenchy</SelectItem>
              <SelectItem value="Miu Miu">Miu Miu</SelectItem>
              <SelectItem value="Marc Jacobs">Marc Jacobs</SelectItem>
              <SelectItem value="Valentino">Valentino</SelectItem>
              <SelectItem value="Salvatore Ferragamo">
                Salvatore Ferragamo
              </SelectItem>
              <SelectItem value="Longchamp">Longchamp</SelectItem>
              <SelectItem value="Rebecca Minkoff">Rebecca Minkoff</SelectItem>
              <SelectItem value="Celine">Celine</SelectItem>
              <SelectItem value="J.Crew">J.Crew</SelectItem>
              <SelectItem value="Kate Hill">Kate Hill</SelectItem>
              <SelectItem value="Zara">Zara</SelectItem>
              <SelectItem value="H&M">H&M</SelectItem>
              <SelectItem value="Nicolas Ghesquière">
                Nicolas Ghesquière
              </SelectItem>
              <SelectItem value="AllSaints">AllSaints</SelectItem>
              <SelectItem value="Aldo">Aldo</SelectItem>
              <SelectItem value="Anthropologie">Anthropologie</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Using Shadcn Select for Condition */}
        <div>
          <Label htmlFor="condition" className="font-medium text-gray-700">
            Condition
          </Label>
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, condition: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Used">Used</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Input */}
        <div>
          <Label htmlFor="price" className="font-medium text-gray-700">
            Price
          </Label>
          <Input
            id="price"
            type="text"
            name="price"
            value={formData.price}
            onChange={validateNumberInput}
            placeholder="Enter Price"
            className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-primary transition-all duration-200 hover:border-gray-400"
          />
        </div>

        {/* Width Input */}
        <div>
          <Label htmlFor="width" className="font-medium text-gray-700">
            Width
          </Label>
          <Input
            id="width"
            type="text"
            name="width"
            value={formData.width}
            onChange={validateNumberInput}
            placeholder="Enter Width"
            className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-primary transition-all duration-200 hover:border-gray-400"
          />
        </div>

        {/* Height Input */}
        <div>
          <Label htmlFor="height" className="font-medium text-gray-700">
            Height
          </Label>
          <Input
            id="height"
            type="text"
            name="height"
            value={formData.height}
            onChange={validateNumberInput}
            placeholder="Enter Height"
            className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-primary transition-all duration-200 hover:border-gray-400"
          />
        </div>

        {/* Description Text Area */}
        <div>
          <Label htmlFor="description" className="font-medium text-gray-700">
            Description
          </Label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleDescriptionChange}
            maxLength={200}
            placeholder="Enter Description"
            className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-primary transition-all duration-200 hover:border-gray-400"
          />
          <p className="mt-1 text-sm text-gray-500">{descriptionLength}/200</p>
        </div>

        {/* Image Uploads */}
        <ImageUpload
          label="Image"
          onChange={handleImageChange("imageUrl")}
          imagePreview={formData.image}
        />
        <ImageUpload
          label="Image URL 1"
          onChange={handleImageChange("imageUrl1")}
          imagePreview={formData.imageUrl1}
        />
        <ImageUpload
          label="Image URL 2"
          onChange={handleImageChange("imageUrl2")}
          imagePreview={formData.imageUrl2}
        />

        <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
          type="submit"
          className="mt-6 w-full bg-primary text-white hover:bg-primary-dark transition-colors duration-200"
        >
                  {isSubmitting ? "Submitting" : "Add Product"}
        </Button>
      </div>
    </div>
  );
};

const renderInputField = (label, id, value, handleChange) => (
  <div>
    <Label htmlFor={id} className="font-medium text-gray-700">
      {label}
    </Label>
    <Input
      id={id}
      type="text"
      name={id}
      value={value}
      onChange={handleChange}
      className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-primary transition-all duration-200 hover:border-gray-400"
    />
  </div>
);

const ImageUpload = ({ label, onChange, imagePreview }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0]);
    }
  };

  const handleClick = () => {
    // Trigger the click on the hidden file input
    fileInputRef.current.click();
  };

  return (
    <div>
      <Label htmlFor={label} className="font-medium text-gray-700">
        {label}
      </Label>
      <div
        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
          dragActive ? "border-primary" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick} // Allow click to open file dialog
      >
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12c-1.1 0-2 .9-2 2v28c0 1.1.9 2 2 2h24c1.1 0 2-.9 2-2V14l-8-6z"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-sm text-gray-600">
            {dragActive
              ? "Drop your files here"
              : "Drag and drop your files here or click to select"}
          </p>
          <input
            type="file"
            ref={fileInputRef} // Assign the ref to the file input
            onChange={handleChange}
            className="hidden"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 h-32 w-auto border rounded-md"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
