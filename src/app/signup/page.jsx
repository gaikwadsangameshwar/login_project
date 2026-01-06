'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

function Signup() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async (e) => {
    e.preventDefault(); // 🔥 VERY IMPORTANT

    try {
      setLoading(true);

      const res = await axios.post("/api/users/signup", user);

      toast.success("Signup successful 🎉");
      router.push("/login");

    } catch (error) {
      const message =
        error?.response?.data?.message || "Signup failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isValid =
      user.email &&
      user.password &&
      user.username;

    setButtonDisabled(!isValid);
  }, [user]);

  return (
    <div className="bg-gray-900 flex justify-center items-center min-h-screen">
      <div className="bg-gray-600 rounded-lg p-8 shadow-lg max-w-sm w-full">
        <h2 className="text-center text-3xl text-white mb-6 font-bold">
          {loading ? "Processing..." : "Signup"}
        </h2>

        <form onSubmit={onSignup}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              value={user.username}
              onChange={(e) =>
                setUser({ ...user, username: e.target.value })
              }
              placeholder="username"
              className="w-full px-3 py-2 bg-gray-600 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
              placeholder="email"
              className="w-full px-3 py-2 bg-gray-600 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              placeholder="password"
              className="w-full px-3 py-2 bg-gray-600 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
            />
          </div>

          <button
            disabled={buttonDisabled || loading}
            className={`rounded-md py-3 w-full text-white transition ${
              buttonDisabled || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
            type="submit"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>

          <div className="text-center mt-4 text-sm text-gray-200">
            Already have an account?{" "}
            <Link href="/login" className="text-yellow-400 underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;