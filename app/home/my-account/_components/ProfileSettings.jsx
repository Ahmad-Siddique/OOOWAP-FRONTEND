import { useState, useEffect } from "react";
import axios from "axios";

const ProfileSettings = ({ loginInfo }) => {
  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    country: "",
    state: "",
    city: "",
    postalcode: "",
    description: "",
    image: null,
    password: "",
    newpassword: "",
    confirmPassword: "",
  });

  // State to manage image preview
  const [previewImage, setPreviewImage] = useState(null);

  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false);

  // State to manage success and error messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Set Axios configuration with token for authorization
  const config = {
    headers: {
      Authorization: `Bearer ${loginInfo.token}`,
    },
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/auth/getuserprofile",
          config
        );

        const userData = response.data;

        // Populate form data with fetched user data
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
          address: userData.address || "",
          country: userData.country || "",
          state: userData.state || "",
          city: userData.city || "",
          postalcode: userData.postalcode || "",
          description: userData.description || "",
          image: null, // Reset image to allow user to upload a new one if desired
          newpassword: "",
          password: "",
          confirmPassword: "",
        });

        // If user has an existing image, set it as the preview
        if (userData.imageUrl) {
          setPreviewImage(userData.imageUrl);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("Failed to load user data. Please try again.");
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setSuccessMessage("");
    setErrorMessage("");

    // Validate required fields
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      country,
      state,
      city,
      postalcode,
      description,
      password,
      newpassword,
      confirmPassword,
    } = formData;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phoneNumber.trim() ||
      !address.trim() ||
      !country.trim() ||
      !state.trim() ||
      !city.trim() ||
      !postalcode.trim() ||
      !description.trim()
    ) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    // Validate email format (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // If password is provided, check if it matches confirmPassword
    console.log(
      "NEW PASSWORD",
      newpassword,
      "Confirm Password",
      confirmPassword
    );
    if (newpassword) {
      if (newpassword !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }
      // Optionally, add more password strength validations here
    }

    // Prepare data for submission
    const submitData = new FormData();
    submitData.append("firstName", firstName);
    submitData.append("lastName", lastName);
    submitData.append("email", email);
    submitData.append("phoneNumber", phoneNumber);
    console.log("ADDRESS", address);
    submitData.append("address", address);
    submitData.append("country", country);
    submitData.append("state", state);
    submitData.append("city", city);
    submitData.append("postalcode", postalcode);
    submitData.append("description", description);

    // Append image if a new one is selected
    if (formData.image) {
      submitData.append("image", formData.image);
    }

    // Append password if provided
    if (password) {
      console.log("PASSWORD", password, "New Password", newpassword);
      submitData.append("password", password);
      submitData.append("newPassword", newpassword);
    }
    console.log("FORM TO SUBMIT: ", submitData);
    setIsLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/updateuserprofile",
        submitData,
        config
      );

      setSuccessMessage("Profile updated successfully!");
      setIsLoading(false);
      console.log("Response data", response.data);
      // dispatch(updateuserprofilecheck({ zz: response.data, gg: loginInfo }));
      // Optionally, update preview image with the new image URL returned from the backend
      if (response.data.imageUrl) {
        setPreviewImage(response.data.imageUrl);
      }

      // Reset password fields
      setFormData((prevData) => ({
        ...prevData,
        password: "",
        newpassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Failed to update profile. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      {/* Display success or error messages */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}

      {/* Display loading spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <svg
            className="animate-spin h-8 w-8 text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span className="ml-2 text-gray-700">Loading...</span>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full border-b-2 border-yellow-400 focus:outline-none py-1"
                placeholder="Enter your first name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full border-b-2 border-yellow-400 focus:outline-none py-1"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border-b-2 border-yellow-400 focus:outline-none py-1"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full border-b-2 border-yellow-400 focus:outline-none py-1"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          {/* Address Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border-b-2 border-yellow-400 focus:outline-none py-1"
                placeholder="Enter your address"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full border-b-2 border-yellow-400 focus:outline-none py-1"
                placeholder="Enter your country"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full border-b-2 border-yellow-400 focus:outline-none py-1"
                placeholder="Enter your state"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full border-b-2 border-yellow-400 focus:outline-none py-1"
                placeholder="Enter your city"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Postal Code</label>
            <input
              type="text"
              name="postalcode"
              value={formData.postalcode}
              onChange={handleInputChange}
              className="w-full border-b-2 border-yellow-400 focus:outline-none py-1"
              placeholder="Enter your postal code"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border-b-2 border-yellow-400 focus:outline-none py-1"
              placeholder="Enter your description"
              required
            />
          </div>

          {/* Profile Image Upload */}
          <div>
            <label className="block text-gray-700">Profile Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full border-b-2 border-yellow-400 focus:outline-none py-1"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Profile"
                className="mt-4 h-32 w-32 object-cover"
              />
            )}
          </div>

          {/* Password Fields */}
          <div>
            <label className="block text-gray-700">Current Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border-b-2 border-yellow-400 focus:outline-none py-1"
              placeholder="Enter your current password (if changing password)"
            />
          </div>

          <div>
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              name="newpassword"
              value={formData.newpassword}
              onChange={handleInputChange}
              className="w-full border-b-2 border-yellow-400 focus:outline-none py-1"
              placeholder="Enter a new password"
            />
          </div>

          <div>
            <label className="block text-gray-700">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full border-b-2 border-yellow-400 focus:outline-none py-1"
              placeholder="Confirm your new password"
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-400 text-white px-4 py-2 rounded"
          >
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfileSettings;
