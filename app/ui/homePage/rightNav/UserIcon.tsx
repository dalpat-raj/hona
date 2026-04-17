import React from "react";
import Link from "next/link";
import { RiUserLine  } from "react-icons/ri";
import DropDown from "@/app/ui/homePage/rightNav/DropDown";
import { getCurrentUser } from "@/lib/auth";

const UserIcon = async () => {
  const user = await getCurrentUser();

  
  
  return (
    <div>
      {user ? (
      <div className="relative">
        <div className="cursor-pointer text-blue relative overflow-hidden font-bold transition-all ease-out hover:scale-110 max-md:hover:scale-100">
          <RiUserLine  size={20} color="text-blue"/>
        </div>
        <DropDown />
      </div>
       ) : ( 
      <Link href={"/auth/sign-in"}>
        <div className="cursor-pointer text-blue relative overflow-hidden transition-all ease-out hover:scale-110 max-md:hover:scale-100">
          <RiUserLine  size={20} color="text-blue"/>
        </div>
      </Link>
      )}
    </div>
  );
};

export default UserIcon;
