"use client";
import React, { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Logout failed");
      }
      toast.success("Log Out")
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex gap-4 items-center text-gray-500"
      onClick={handleLogout}
    >
      <AiOutlineLogout size={20} />
      <p className="text-[14px]">{loading ? "Logging out..." : "Logout"}</p>
    </div>
  );
};

export default Logout;
