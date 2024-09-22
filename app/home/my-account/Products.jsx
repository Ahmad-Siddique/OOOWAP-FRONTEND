import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Products = () => {
  const { loginInfo } = useSelector((state) => state.auth);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    categories: "",
    price: "",
    currency: "USD",
    size: "",
    description: "",
    condition: "",
    image: null,
    imageUrl1: null,
    imageUrl2: null,
  });
  const [editProduct, setEditProduct] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [imagePreview, setImagePreview] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for locking buttons

  const config = {
    headers: {
      Authorization: `Bearer ${loginInfo.token}`,
    },
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/userproducts`,
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
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/category/categories`,
          config
        );
        setCategories(response.data);
      } catch (error) {
        toast.error("Error fetching categories!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
    fetchProducts();
  }, [loginInfo.token]);

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
     
      console.log("Categories",formData.categories)
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

      setShowModal(false);
      fetchProducts(); // Refetch products after add/update
    } catch (error) {
      toast.error("Error adding/updating product!");
    } finally {
      setIsSubmitting(false); // Unlock buttons after submission
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/product/products/${productId}`,
        config
      );
      toast.success("Product deleted successfully!");
      fetchProducts(); // Refetch products after deletion
      setShowDeletePopup(false);
    } catch (error) {
      toast.error("Error deleting product!");
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      categories: product.categories,
      price: product.price,
      currency: product.currency,
      size: product.size,
      description: product.description,
      condition: product.condition,
      image: null,
      imageUrl1: null,
      imageUrl2: null,
    });
    setImagePreview([product.imageUrl, product.imageUrl1, product.imageUrl2]);
    setShowModal(true);
  };

  const openDeletePopup = (productId) => {
    setProductToDelete(productId);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    handleDelete(productToDelete);
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
        <button
          className="btn btn-green"
          onClick={() => {
            setEditProduct(null);
            setFormData({
              name: "",
              categories: "",
              price: "",
              currency: "USD",
              size: "",
              description: "",
              condition: "",
              image: null,
              imageUrl1: null,
              imageUrl2: null,
            });
            setImagePreview([]);
            setShowModal(true);
          }}
        >
          Add Product
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            {products &&
              products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow-lg p-4 mb-6 flex flex-col md:flex-row items-center"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full md:w-32 h-32 object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">
                      {product.name} ({product.price})
                    </h2>
                    <p className="text-gray-600">
                      No. of Trades: {product.tradesCount}
                    </p>
                    <div className="mt-2 space-x-2">
                      <button
                        className="btn bg-black text-white border-black hover:bg-[#D5B868] hover:text-black transition duration-300"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn bg-[#D5B868] text-black border-[#D5B868] hover:bg-black hover:text-white transition duration-300"
                        onClick={() => handleFeature(product._id)}
                      >
                        Feature
                      </button>
                      <button
                        className="btn bg-red-600 text-white border-red-600 hover:bg-black hover:text-white transition duration-300"
                        onClick={() => openDeletePopup(product._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4"
            style={{
              maxHeight: "80vh",
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#D5B868 transparent",
            }}
          >
            <h2 className="text-2xl font-semibold mb-4">
              {editProduct ? "Edit Product" : "Add Product"}
            </h2>
            <form onSubmit={handleSubmit}>
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
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                  name="categories"
                  value={formData.categories}
                  onChange={handleInputChange}
                  className="form-select w-full border-b-2 border-gray-300"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
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
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Currency</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="form-select w-full border-b-2 border-gray-300"
                >
                  <option value="USD">USD</option>
                  {/* Add more currencies as needed */}
                </select>
              </div>
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
              <div className="flex justify-between">
                <button
                  type="submit"
                  className={`btn bg-black text-white border-black hover:bg-[#D5B868] hover:text-black transition duration-300 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting} // Disable button when submitting
                >
                  {editProduct ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className={`btn bg-[#D5B868] text-black border-[#D5B868] hover:bg-black hover:text-white transition duration-300 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting} // Disable button when submitting
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-between mt-4">
              <button onClick={confirmDelete} className="btn btn-red">
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeletePopup(false)}
                className="btn btn-gray"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
