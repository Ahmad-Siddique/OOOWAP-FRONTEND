"use client"; // Ensure the component is a Client Component

import Link from "next/link";
import Image from "next/image";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { authenticate } from "../../lib/action";
import { useFormState, useFormStatus } from "react-dom";

const LoginPage = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();

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
              className="p-6 border-b-4 border-[#D5B868] rounded-none bg-white text-black placeholder-gray-500 text-lg"
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="p-6 border-b-4 border-[#D5B868] rounded-none bg-white text-black placeholder-gray-500 text-lg"
              required
            />
            <button
              type="submit"
              className="py-3 px-6 bg-[#D5B868] text-white rounded-md hover:bg-[#b38b59] transition"
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
