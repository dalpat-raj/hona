import React from "react";
import SignInForm from "@/app/ui/homePage/auth/signIn/SignInForm";
import Image from "next/image";
import logo from "../../../../public/logo.png"

const SignIn = () => {
  return (
    <div className="w-full h-full flex justify-center items-center py-6 bg-bga">
      <div className="w-8/12 max-lg:w-12/12 max-sm:w-full h-auto p-4 max-sm:px-0 grid grid-cols-2 items-center gap-2">
        <section className=" col-span-1 my-4 text-center grid grid-cols-12 gap-2 items-center max-sm:hidden">
          <div className="">
            <div className="w-[100px] max-sm:w-[70px] mb-4">
            <Image
              src={logo}
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <p className="text-blue text-[24px] font-semibold text-nowrap">Welcome to</p>
          <div className="w-[150px] max-sm:w-[110px]">
            <Image
              src={logo}
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <p className="text-nowrap text-[14px] my-4">Sign in to access your saved<br/>addresses and easily proceed<br/>to checkout</p>
          <p className="text-nowrap mt-2">Powered by Shiprocket</p>
          </div>
        </section>

        <section className="col-span-1 max-sm:col-span-2 shadow-custom-shadow rounded-md bg-white py-4 px-3">
          <SignInForm />
        </section>
      </div>
    </div>
  );
};

export default SignIn;
