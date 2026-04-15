"use client";
import { sideNavData } from "@/lib/placeholder_data";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = () => {
  const pathname = usePathname();

  return sideNavData.map((item, i) => {
    const LinkIcon = item.icon;
    return (
      <Link href={item?.url} key={i}>
        <div
          className={clsx(
            "flex justify-start gap-2 items-center text-white text-[14px] transition duration-100 ease-in-out delay-100",
            {
              "text-[18px] text-white font-semibold py-1 rounded-br-[90px] rounded-tl-[80px] transition duration-100 ease-in-out delay-100":
                pathname == item?.url,
            },
          )}
        >
          <div className="">
            <LinkIcon size={20} />
          </div>
          <p>{item?.title}</p>
        </div>
      </Link>
    );
  });
};

export default NavLinks;
