"use client"; // Ensure the component is a Client Component

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  // const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setProfilePicPreview(URL.createObjectURL(file)); // Create a URL for preview
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone Number is required";
    if (!/^\d+$/.test(formData.phone)) newErrors.phone = "Invalid phone number";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare form data for submission, including profile picture
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("firstName", formData.firstName);
    formDataToSubmit.append("lastName", formData.lastName);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("phonenumber", formData.phone);
    formDataToSubmit.append("password", formData.password);
    if (profilePic) {
      formDataToSubmit.append("image", profilePic);
    }

    // Dispatch register action
    // dispatch(register(formDataToSubmit));
  };

  // Check if registration is successful and navigate to login page
  if (isSuccess) {
    toast.success("Registration successful! Redirecting to login...", {
      closeOnClick: true,
      autoClose: 2000,
    });
    router.push("/login");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Left Side */}
      <div className="flex items-center justify-center bg-gray-100 p-8">
        <div className="w-full px-4 py-8 max-w-2xl">
          <h1 className="text-5xl font-bold mb-10 text-center text-black">
            Join Our Membership
          </h1>
          <form
            className="flex flex-col space-y-6"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="p-6 border-b-4 border-[#D5B868] rounded-none bg-white text-black placeholder-gray-500 text-lg"
              required
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName}</p>
            )}
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="p-6 border-b-4 border-[#D5B868] rounded-none bg-white text-black placeholder-gray-500 text-lg"
              required
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName}</p>
            )}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="p-6 border-b-4 border-[#D5B868] rounded-none bg-white text-black placeholder-gray-500 text-lg"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="p-6 border-b-4 border-[#D5B868] rounded-none bg-white text-black placeholder-gray-500 text-lg"
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone}</p>
            )}
            <div className="mb-6">
              <label
                htmlFor="profilePic"
                className="block text-sm font-medium mb-1 text-black"
              >
                Profile Picture
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  onChange={handleFileChange}
                  className="input input-bordered border-gray-300 border-2 focus:border-[#D5B868] focus:ring-[#D5B868]"
                />
                {profilePicPreview && (
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-full overflow-hidden border border-[#D5B868] bg-white">
                    <Image
                      src={profilePicPreview}
                      alt="Profile Picture Preview"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                )}
              </div>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="p-6 border-b-4 border-[#D5B868] rounded-none bg-white text-black placeholder-gray-500 text-lg"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="p-6 border-b-4 border-[#D5B868] rounded-none bg-white text-black placeholder-gray-500 text-lg"
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}
            <button
              type="submit"
              className="py-3 px-6 bg-[#D5B868] text-white rounded-md hover:bg-[#b38b59] transition disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
            <p className="text-center text-black">
              Already a member?{" "}
              <a href="/login" className="text-[#D5B868] underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Signup background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
