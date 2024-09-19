"use client"; // Ensure the component is a Client Component
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../GlobalRedux/features/auth/authSlice"; // Import reset action
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter(); // Use the router for redirection
  const { email, password } = formData;

  const dispatch = useDispatch();

  const { loginInfo, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message || "Invalid credentials. Please try again!", {
        closeOnClick: true,
        autoClose: 2000,
      });
    }

    if (isSuccess && loginInfo && loginInfo.token) {
      if (typeof window !== "undefined") {
        localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
        toast.success("Login successful!", {
          closeOnClick: true,
          autoClose: 2000,
        });
        router.push("/");
      }
    }

    const resetAuthState = setTimeout(() => {
      dispatch(reset());
    }, 500); // Delay reset by 500ms

    return () => clearTimeout(resetAuthState); // Cleanup timeout on component unmount
  }, [isError, isSuccess, loginInfo, message, dispatch, router]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Left Side */}
      <div className="flex items-center justify-center bg-gray-100 p-8">
        <div className="max-w-md w-full px-4 py-8">
          <h1 className="text-5xl font-bold mb-10 text-center text-black">
            Login to Borrow
          </h1>
          <form className="flex flex-col space-y-6" onSubmit={onSubmit}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
              className="p-6 border-b-4 border-[#D5B868] rounded-none bg-white text-black placeholder-gray-500 text-lg"
              required
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              className="p-6 border-b-4 border-[#D5B868] rounded-none bg-white text-black placeholder-gray-500 text-lg"
              required
            />
            <button
              type="submit"
              className="py-3 px-6 bg-[#D5B868] text-white rounded-md hover:bg-[#b38b59] transition"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
            <p className="text-center text-black">
              <Link
                href="/forgot-password"
                className="text-[#D5B868] underline"
              >
                Forgot Password?
              </Link>
            </p>
            <p className="text-center text-black">
              Not a member?{" "}
              <Link href="/signup" className="text-[#D5B868] underline">
                Apply
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login background"
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

export default LoginPage;
