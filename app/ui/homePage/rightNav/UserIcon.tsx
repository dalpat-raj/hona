import React from "react";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import DropDown from "@/app/ui/homePage/rightNav/DropDown";
// import { currentUser } from '@/lib/data';

const UserIcon = async () => {
  // const user = await currentUser();

  return (
    <div>
      {/* {user ? ( */}
      <div className="relative">
        <div className="cursor-pointer relative overflow-hidden">
          <CiUser size={23} />
        </div>
        <DropDown />
      </div>
      {/* ) : ( */}
      <Link href={"/auth/sign-in"}>
        <div className="cursor-pointer relative overflow-hidden">
          <CiUser size={22} />
        </div>
      </Link>
      {/* )} */}
    </div>
  );
};

export default UserIcon;
