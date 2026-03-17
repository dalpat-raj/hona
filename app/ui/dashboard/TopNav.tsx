"use client";
import Image from "next/image";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosNotificationsOutline } from "react-icons/io";
import DropDown from "./DropDown";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { useCurrentUser } from "@/hooks/use-current-user";
import { caveat } from "@/app/ui/Fonts";

const TopNav = () => {
  const url = usePathname();
  const parts = url.split("/");
  const endpoint = parts[parts.length - 1];

  // const user = useCurrentUser();
  const user = "ADMIN";

  return (
    <>
      <div>
        <h2
          className={`${caveat.className} text-[32px] leading-none max-sm:text-[24px] font-bold text-green-800 capitalize`}
        >
          {endpoint}
        </h2>
      </div>

      <div
        className={clsx("block", {
          hidden: endpoint !== "products",
        })}
      >
        <Link href="/dashboard/products/createProduct">
          <div className="flex justify-center items-center gap-2 rounded-lg bg-green-600 text-white text-[14px] px-2 py-1">
            <FaPlus size={18} />
            <p>Add Product</p>
          </div>
        </Link>
      </div>

      <div
        className={clsx("block", {
          hidden: endpoint !== "events",
        })}
      >
        <Link href="/dashboard/events/createEvent">
          <div className="flex justify-center items-center gap-2 rounded-lg bg-green-600 text-white text-[14px] px-2 py-1">
            <FaPlus size={18} />
            <p>Add Event</p>
          </div>
        </Link>
      </div>

      <div
        className={clsx("block", {
          hidden: endpoint !== "coupon",
        })}
      >
        <Link href="/dashboard/coupon/createCoupon">
          <div className="flex justify-center items-center gap-2 rounded-lg bg-green-600 text-white text-[14px] px-2 py-1">
            <FaPlus size={18} />
            <p>Add Coupon</p>
          </div>
        </Link>
      </div>

      <div
        className={clsx("block", {
          hidden: endpoint !== "collection",
        })}
      >
        <Link href="/dashboard/collection/createCollection">
          <div className="flex justify-center items-center gap-2 rounded-lg bg-green-600 text-white text-[14px] px-2 py-1">
            <FaPlus size={18} />
            <p>Add Collection</p>
          </div>
        </Link>
      </div>

      <div className="flex items-center justify-between gap-16 max-md:gap-8">
        <div className="relative max-sm:hidden">
          <div className="absolute top-[50%] translate-y-[-50%] left-2">
            <CiSearch />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="bg-white py-1 pl-8 rounded-md w-[25vw] max-md:w-[35vw]"
          />
        </div>
        <div className="flex justify-end items-center gap-4 max-sm:gap-2">
          <div>
            <HiOutlineDotsVertical size={20} />
          </div>
          <div>
            <IoIosNotificationsOutline size={20} />
          </div>
          <div className="relative rounded-full overflow-hidden w-[33px] h-[33px]">
            <Image
              src={user?.image || "/e22.jpg"}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <DropDown />
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
