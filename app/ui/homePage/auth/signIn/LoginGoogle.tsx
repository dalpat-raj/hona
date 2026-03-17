"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

const LoginGoogle = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "facebook") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex gap-4 items-center my-4">
      <div
        onClick={() => onClick("google")}
        className="w-full gap-4  hover:cursor-pointer border border-gray-300 rounded-md py-[5px] px-4 flex justify-center items-center"
      >
        <FcGoogle size={18} />
        <p className="">Google</p>
      </div>
      <div
        onClick={() => onClick("facebook")}
        className="w-full gap-4  hover:cursor-pointer border border-gray-300 rounded-md py-[5px] px-4 flex justify-center items-center"
      >
        <FaFacebook size={18} className="text-blue-600" />
        <p className="">Facebook</p>
      </div>
    </div>
  );
};

export default LoginGoogle;
