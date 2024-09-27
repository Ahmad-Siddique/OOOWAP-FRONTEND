"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import MyAccProductCard from "@/components/cards/MyAccProductCard";
import AddEditProductModal from "@/components/modals/AddEditProductModal";
import Sidebar from "./Sidebar";

const Products = ({ loginInfo }) => {
 
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
   
    price: "",
    currency: "USD",
    size: "",
    description: "",
    condition: "",
    image: null,
    brand: "",
    imageUrl1: null,
    imageUrl2: null,
  });
  const [editProduct, setEditProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for locking buttons

  const config = {
    headers: {
      Authorization: `Bearer ${loginInfo?.user.token}`,
    },
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/products/userproducts`,
        config
      );
      setProducts(response.data.data);
    } catch (error) {
      toast.error("Error fetching products!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    
    fetchProducts();
  }, [loginInfo?.user.token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, [field]: file }));

    const newImagePreview =
      field === "image"
        ? [URL.createObjectURL(file), ...imagePreview.slice(1)]
        : [
            ...imagePreview.slice(0, field === "imageUrl1" ? 1 : 2),
            URL.createObjectURL(file),
          ];

    setImagePreview(newImagePreview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Lock buttons during submission
    try {
     
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSubmit.append(key, formData[key]);
      });

      if (editProduct) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/product/products/${editProduct._id}`,
          formDataToSubmit,
          config
        );
        toast.success("Product updated successfully!");
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/product/products`,
          formDataToSubmit,
          config
        );
        toast.success("Product added successfully!");
      }
      fetchProducts(); // Refetch products after add/update
    } catch (error) {
      toast.error("Error adding/updating product!");
    } finally {
      setIsSubmitting(false); // Unlock buttons after submission
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      
      price: product.price,
      currency: product.currency,
      size: product.size,
      description: product.description,
      condition: product.condition,
      brand: product.brand,
      image: null,
      imageUrl1: null,
      imageUrl2: null,
    });
    setImagePreview([product.imageUrl, product.imageUrl1, product.imageUrl2]);
  };

  const handleFeature = async (productId) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/product/products/${productId}/feature`,
        { featured: true },
        config
      );
      toast.success("Product featured successfully!");
      fetchProducts(); // Refresh the product list
    } catch (error) {
      toast.error("Error featuring product!");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <AddEditProductModal
          editProduct={false}
          handleSubmit={handleSubmit}
          formData={formData}
          handleInputChange={handleInputChange}
        
          imagePreview={imagePreview}
          handleFileChange={handleFileChange}
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 flex items-center flex-col gap-0.5 w-full">
            {products &&
              products.map((product) => (
                <MyAccProductCard
                  key={product._id}
                  product={product}
                  fetchProducts={fetchProducts}
                  handleEdit={handleEdit}
                  handleFeature={handleFeature}
                  editProduct={editProduct}
                  handleSubmit={handleSubmit}
                  formData={formData}
                  handleInputChange={handleInputChange}
               
                  imagePreview={imagePreview}
                  handleFileChange={handleFileChange}
                  token={loginInfo?.user.token}
                />
              ))}
          </div>
          <Sidebar loginInfo={loginInfo} />
        </div>
      )}
    </div>
  );
};

export default Products;
