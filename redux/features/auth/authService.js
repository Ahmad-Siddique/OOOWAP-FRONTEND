// services/authService.js
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/auth/";
// axios.defaults.baseURL = API_URL;

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL+"register", userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL+"login", userData);
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
    localStorage.setItem("loginInfo", JSON.stringify(response.data));
    // localStorage.setItem(
    //   "planSelected",
    //   JSON.stringify(response.data.data.planSelected)
    // );
  }

  return response.data;
};

// Update User Info
const updateUserProfile = async (data, token) => {
  const response = await axios.put(API_URL+"updateProfile", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("loginInfo");
};

const authService = {
  register,
  login,
  getMe,
  updateUserProfile,
  logout,
};

export default authService;
