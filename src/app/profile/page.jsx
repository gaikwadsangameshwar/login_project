"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function ProfilePage() {
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUserDetails = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/users/me");
      setUserId(res.data.data._id);

    } catch (error) {
      const message =
        error?.response?.data?.message || "Unauthorized";
      toast.error(message);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
      toast.success("Logout successful 👋");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  // 🔥 Auto-fetch user on page load
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Profile Page</h1>

      {loading ? (
        <p>Loading...</p>
      ) : userId ? (
        <Link
          href={`/profile/${userId}`}
          className="text-blue-500 underline"
        >
          {userId}
        </Link>
      ) : (
        <p>No user data</p>
      )}

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
