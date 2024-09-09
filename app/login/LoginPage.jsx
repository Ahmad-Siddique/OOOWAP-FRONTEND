"use client"; // Ensure the component is a Client Component
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login, getMe } from "../GlobalRedux/features/auth/authSlice";
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
  // console.log(loginInfo)
//   useEffect(() => {
//     if (isError) {
//       toast.error("Invalid credentials. Please try again!", {
//         closeOnClick: true,
//         autoClose: 2000,
//       });
//     }

//     if (isSuccess || loginInfo?.token) {
//       dispatch(getMe(loginInfo.token));
        
//       if (loginInfo.user.isEmailVerified) {
//         router.push("/dashboard");
//       } else {
//         router.push("/email-verify");
//       }
//     }
//   }, [isError, isSuccess, loginInfo, dispatch, router]);

    useEffect(() => {
      if (isSuccess || loginInfo?.token) {
        // Perform client-side localStorage logic inside useEffect
        if (typeof window !== "undefined") {
          localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
          router.push("/")
        }
      }
    }, [isSuccess, loginInfo]);
    
    
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
console.log("LOGGIN IN");
    const userData = {
      email,
      password,
    };
    
    dispatch(login(userData));
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        <div style={{ maxWidth: "400px", width: "100%" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
            }}
          >
            LOGIN TO BORROW
          </h1>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={onSubmit}
          >
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
              style={{
                marginBottom: "1rem",
                padding: "0.5rem",
                border: "1px solid #ccc",
              }}
              required
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              style={{
                marginBottom: "1rem",
                padding: "0.5rem",
                border: "1px solid #ccc",
              }}
              required
            />
            <button
              type="submit"
              style={{
                padding: "0.5rem",
                backgroundColor: "#0070f3",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
            <p style={{ marginTop: "1rem", textAlign: "center" }}>
              Not a member?{" "}
              <Link
                href="/signup"
                style={{ color: "#0070f3", textDecoration: "underline" }}
              >
                Apply
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="w-full h-full relative">
        <Image
          src="https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Description of image"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </div>
  );
};

export default LoginPage;
