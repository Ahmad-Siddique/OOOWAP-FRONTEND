import axios from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

// Add a product
const addProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post("/product/products", productData, config);
  return response.data;
};

// Get all products
const getAllProducts = async (token) => {
    console.log("ALL PRODUCT TOKEN",token)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  const response = await axios.get("/product/", config);
  return response.data;
};

const getAllCategories = async (token) => {
  console.log("ALL PRODUCT TOKEN", token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/category/categories", config);
  return response.data;
};


// Get single product
const getProduct = async (productId,token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  const response = await axios.get(`/product/${productId}`, config);
  return response.data;
};

// Update product
const updateProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `/product/products/${productData.id}`,
    productData,
    config
  );
  return response.data;
};

// Delete product
const deleteProduct = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`/product/${productId}`, config);
  return response.data;
};

const productService = {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
};

export default productService;
