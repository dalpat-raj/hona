import React from "react";
import SignInForm from "@/app/ui/homePage/auth/signIn/SignInForm";

const SignIn = () => {
  return (
    <div className="w-full h-full flex justify-center items-center py-6 px-2 bg-bg">
      <div className="w-3/12 max-lg:w-5/12 max-sm:w-full h-auto p-4 shadow-custom-shadow rounded-md bg-white">
        <section className="my-4 text-center grid grid-cols-12 gap-2 items-center">
          <div className="col-span-3 h-[1px] bg-gray-300"></div>
          <p className="col-span-6 text-[13px] font-semibold">SIGN-IN</p>
          <div className="col-span-3 h-[1px] bg-gray-300"></div>
        </section>

        <section>
          <SignInForm />
        </section>
      </div>
    </div>
  );
};

export default SignIn;
