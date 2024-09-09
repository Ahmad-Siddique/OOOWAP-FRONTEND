"use client";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api/v1";
// API_URL is correctly defined using NEXT_PUBLIC_API_URL
const API_URL = process.env.NEXT_PUBLIC_API_URL + "/auth/";
console.log("API_URL", API_URL); // Ensure it logs the correct value

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

// Login user
const login = async (userData) => {
//   const API_URL = "http://localhost:5000/api/v1/auth/login"; // Hardcode the URL
//   console.log("API_URL", API_URL); // Double-check the logged output
  const response = await axios.post(
    API_URL + "login",
    userData
    );
    console.log(response)
  return response.data;
};

// Get User Info
const getMe = async (token) => {
  const response = await axios.get(API_URL + "getMe", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem(
      "planSelected",
      JSON.stringify(response.data.data.planSelected)
    );
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("loginInfo");
  
};

const authService = {
  register,
  logout,
  login,
  getMe,
};

export default authService;
