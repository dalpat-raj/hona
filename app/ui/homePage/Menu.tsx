"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { RiFacebookBoxLine } from "react-icons/ri";

const Menu = () => {
  return (
    <div>
      <ul className="max-md:w-full max-md:h-screen overflow-y-auto max-md:inline-block list-none max-md:absolute max-md:top-16 max-md:left-0 inline-flex cursor-pointer bg-bg text-green-800">
        <div className="py-4 max-md:px-4">
          <li className={"max-md:border-0 border-b-2 mr-10 "}>
            <Link href="/">Home</Link>
          </li>
        </div>
        <div className="flex justify-between items-center py-4 max-md:px-4">
          <li className={"max-md:border-0 border-b-2 mr-10 "}>Apple</li>
          <div className="hidden max-md:block">
            <GoArrowRight size={20} />
          </div>
        </div>
        <div className="flex justify-between items-center py-4 max-md:px-4">
          <li className={"max-md:border-0 border-b-2 mr-10"}>Samsung</li>
          <div className="hidden max-md:block">
            <GoArrowRight size={20} />
          </div>
        </div>
        <div className="flex justify-between items-center py-4 max-md:px-4">
          <li className={"max-md:border-0 border-b-2 mr-10 "}>OnePlus</li>
          <div className="hidden max-md:block">
            <GoArrowRight size={20} />
          </div>
        </div>
        <div className="flex justify-between items-center py-4 max-md:px-4">
          <li className={"max-md:border-0 border-b-2 mr-10 "}>Accessories</li>
          <div className="hidden max-md:block">
            <GoArrowRight size={20} />
          </div>
        </div>

        {/* Social Links  */}
        <div className="hidden max-md:block max-md:bg-[#eeeeee] fixed w-full bottom-0 ">
          <ul className="flex gap-4 p-4 ">
            <li>
              <Link href={"/"}>
                <RiFacebookBoxLine size={25} />
              </Link>
            </li>
            <li>
              <Link href={"/"}>
                <AiOutlineInstagram size={25} />
              </Link>
            </li>
            <li>
              <Link href={"/"}>
                <AiOutlineYoutube size={25} />
              </Link>
            </li>
          </ul>
        </div>
      </ul>
    </div>
  );
};

export default Menu;
