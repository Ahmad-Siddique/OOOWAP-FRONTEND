"use client";

import { useRef, useState, useEffect } from "react";
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

const EditProductPage = ({ loginInfo, params }) => {
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
  const [productdata,setproductdata] = useState({})
    const id = params.id;

  const [descriptionLength, setDescriptionLength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();

  // Fetch product data based on productId
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL+`/product/${id}`,
          {
            headers: {
              Authorization: `Bearer ${loginInfo?.user.token}`,
            },
          }
        );
        const productData = response.data;

        setFormData({
          name: productData.name,
          brand: productData.brand,
          price: productData.price,
          width: productData.width,
          height: productData.height,
          description: productData.description,
          condition: productData.condition,
          imageUrl: productData.imageUrl, // Initialize as null or existing image URL if applicable
          imageUrl1: productData.imageUrl1, // Same as above
          imageUrl2: productData.imageUrl2, // Same as above
        });
        setproductdata(response.data);
        setDescriptionLength(productData.description.length); // Set the initial length
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchProductData();
  }, [id, loginInfo]); // Fetch data when productId or loginInfo changes

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
    setIsSubmitting(true); // Lock buttons during submission
    try {
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSubmit.append(key, formData[key]);
      });

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/product/products/${productdata._id}`,
        formDataToSubmit,
        config
      );

      router.push("/home/my-account/products");
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsSubmitting(false); // Unlock buttons after submission
    }
  };

  // Show loading indicator or form
  if (loading) {
    return <div>Loading...</div>; // You can customize this loading indicator
  }

  return (
    <div className="px-10 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
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
            value={formData.brand || ""} // Ensure it's an empty string if null
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, brand: value }))
            }
          >
            <SelectTrigger>
              <SelectValue>{formData.brand || "Select Brand"}</SelectValue>
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
            value={formData.condition}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, condition: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Condition">
                {formData.condition && formData.condition}
              </SelectValue>
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
            Width (cm)
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
            Height (cm)
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
          imagePreview={formData.imageUrl}
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
          {isSubmitting ? "Submitting" : "Update Product"}
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
      placeholder={`Enter ${label}`}
      className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-primary transition-all duration-200 hover:border-gray-400"
    />
  </div>
);

// Image Upload Component
const ImageUpload = ({ label, onChange, imagePreview }) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files.length) {
      onChange(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      onChange(e.target.files[0]);
    }
  };

  return (
    <div>
      <Label className="font-medium text-gray-700">{label}</Label>
      <div
        onDrag={handleDrag}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border-dashed border-2 border-gray-300 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer ${
          dragActive ? "bg-gray-100" : ""
        }`}
        onClick={() => fileInputRef.current.click()} // Click to open file input
      >
        {imagePreview ? (
          typeof imagePreview === "string" ? ( // If it's a URL, show it as an image
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-auto object-cover"
              style={{ width: "150px", height: "150px" }} // Adjust width/height
            />
          ) : (
            <img
              src={URL.createObjectURL(imagePreview)}
              alt="Preview"
              className="w-full h-auto object-cover"
              style={{ width: "150px", height: "150px" }} // Adjust width/height
            />
          )
        ) : (
          <p className="text-center text-gray-500">
            Drag and drop your file here, or click to upload
          </p>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </div>
  );
};


export default EditProductPage;
