"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignin = async () => {
    try {
      setLoading(true);

      // API call with proper headers and cookies enabled
      const response = await axios.post(
        "/api/users/login",
        user,
        { withCredentials: true } // Include cookies if the server sets any
      );
      console.log("Login success", response.data);
      toast.success("Login successful!");
      router.push("/"); // Navigate to the home page
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login failed", error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Enable the login button only when both fields are filled
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 shadow-lg">
      <h1 className="text-2xl font-bold">Login</h1>
      <hr className="my-4 w-1/3" />

      <label htmlFor="email" className="mt-4">
        Email
      </label>
      <input
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
        className={`border p-2 w-1/3 mt-2 ${
          user.email && !validateEmail(user.email) ? "border-red-500" : "border-gray-300"
        }`}
        aria-label="Email"
      />
      {user.email && !validateEmail(user.email) && (
        <p className="text-red-500 text-sm mt-1">Invalid email format</p>
      )}

      <label htmlFor="password" className="mt-4">
        Password
      </label>
      <input
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
        className="border p-2 w-1/3 mt-2 border-gray-300"
        aria-label="Password"
      />

      <button
        onClick={onSignin}
        disabled={buttonDisabled || loading}
        className={`p-2 mt-4 w-1/3 rounded ${
          buttonDisabled || loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
        aria-busy={loading}
      >
        {loading ? (
          <span className="loader inline-block w-4 h-4 border-2 border-t-2 border-white rounded-full animate-spin"></span>
        ) : (
          "Login"
        )}
      </button>

      <p className="mt-4">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-blue-500 underline">
          Signup here
        </Link>
      </p>
    </div>
  );
}
