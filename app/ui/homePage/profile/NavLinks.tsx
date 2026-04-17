"use client";

import { userProfileOption } from "@/lib/placeholder_data";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Logout from "../auth/Logout";

const NavLinks = () => {
  const pathname = usePathname();

 
  return (
    <div className="h-full relative">
      {userProfileOption.map((item, i) => {
        const LinkIcon = item.icon;
        return (
          <Link href={item.url} key={i}>
            <div
              className={clsx(
                "flex gap-2 items-center font-bold text-blue text-[15px] px-2 py-3 cursor-pointer hover:bg-gray-100 transition",
                {
                  "bg-gray-100 text-gray-500":
                    pathname === item.url,
                }
              )}
            >
              <LinkIcon size={20} />
              <p className="text-[14px] font-semibold">
                {item.title}
              </p>
            </div>
          </Link>
        );
      })}

      <div
        className="absolute bottom-2 left-0 w-full flex gap-2 items-center px-2 py-3 cursor-pointer hover:bg-gray-100 transition"
      >
        <Logout/>
      </div>
    </div>
  );
};

export default NavLinks;