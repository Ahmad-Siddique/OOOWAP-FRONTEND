"use client"; // Ensure the component is a Client Component

import Link from "next/link";
import Image from "next/image";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { authenticate } from "../../lib/action";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginPage = ({ loginInfo }) => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && loginInfo?.user?.id) {
      // Now safe to access localStorage
      console.log("User info: ", loginInfo); // Log to check if loginInfo is passed correctly

      try {
        window.localStorage.setItem(
          "ooowap-user",
          JSON.stringify(loginInfo.user)
        ); // Store loginInfo in localStorage
        router.push("/home"); // Redirect after saving to localStorage
      } catch (error) {
        console.error("Error saving user data to localStorage:", error);
      }
    }
  }, [loginInfo, router]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Left Side */}
      <div className="flex items-center justify-center bg-gray-100 p-8">
        <div className="max-w-md w-full px-4 py-8">
          <h1 className="text-5xl font-bold mb-10 text-center text-black">
            Login to Borrow
          </h1>
          <form className="flex flex-col space-y-6" action={dispatch}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="p-6 border-b border-b-0.5 border-black rounded-none bg-gray-100 text-black placeholder-gray-500 text-lg"
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="p-6 border-b border-b-0.5 border-black rounded-none bg-gray-100 text-black placeholder-gray-500 text-lg"
              required
            />
            <button
              type="submit"
              className="py-3 px-6 bg-[#F5BA41] text-white rounded-md hover:bg-[#b38b59] transition"
              aria-disabled={pending}
            >
              {pending ? "Loading..." : "Login"}
            </button>
            {errorMessage && (
              <div className="flex items-center gap-1">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </div>
            )}
            <p className="text-center text-black">
              <Link
                href="/home/forgot-password"
                className="text-black underline"
              >
                Forgot Password?
              </Link>
            </p>
            <p className="text-center text-black">
              Not a member?{" "}
              <Link href="/signup" className="text-black underline">
                Apply
              </Link>
            </p>
          </form>
        </div>
      </div>
      {/* Right Side */}
      <div className="relative w-full h-full">
        <Image
          src="/images/ooowap-login.webp"
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
