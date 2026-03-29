import React from "react";
import SignInForm from "@/app/ui/homePage/auth/signIn/SignInForm";

const SignIn = () => {
  return (
    <div className="w-full h-full flex justify-center items-center py-6 px-2 bg-bg">
      <div className="w-8/12 max-lg:w-10/12 max-sm:w-full h-auto p-4 shadow-custom-shadow rounded-md bg-white grid grid-cols-2 gap-2">
        <section className="col-span-1 my-4 text-center grid grid-cols-12 gap-2 items-center max-sm:hidden">
          <p className="col-span-6 text-[13px] font-semibold">SIGN-IN</p>
        </section>

        <section className="col-span-1 max-sm:col-span-2">
          <SignInForm />
        </section>
      </div>
    </div>
  );
};

export default SignIn;
