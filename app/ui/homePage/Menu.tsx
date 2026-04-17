"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { RiFacebookBoxLine } from "react-icons/ri";

const Menu = () => {
  return (
    <div>
      <ul className="max-md:w-full max-md:h-screen max-md:bg-bga overflow-y-auto max-md:inline-block list-none max-md:absolute max-md:top-16 max-md:left-0 inline-flex cursor-pointer text-Blue">
        <div className="py-4 max-md:px-4">
          <li className={"mr-10 transition-all ease-out hover:scale-110"}>
            <Link href="/">Home</Link>
          </li>
        </div>
        <div className="flex justify-between items-center py-4 max-md:px-4">
          <li className={"mr-10 transition-all ease-out hover:scale-110"}>
            <Link href="/products">Products</Link>
          </li>
        </div>
        <div className="flex justify-between items-center py-4 max-md:px-4">
          <li className={"mr-10 transition-all ease-out hover:scale-110"}>
          <Link href="/pages/about-us">About Us</Link>  
          </li>
        </div>
        <div className="flex justify-between items-center py-4 max-md:px-4">
          <li className={"mr-10 transition-all ease-out hover:scale-110"}>
          <Link href="/pages/contact-us">Contact Us</Link>  
          </li>
        </div>
        <div className="flex justify-between items-center py-4 max-md:px-4">
          <li className={"mr-10 transition-all ease-out hover:scale-110"}>
            <Link href="/pages/blog">blog</Link>  
          </li>
        </div>

        {/* Social Links  */}
        <div className="hidden max-md:block max-md:bg-bga fixed w-full bottom-0 ">
          <ul className="flex gap-4 p-4 ">
            <li>
              <Link href={"/"} className="text-blue">
                <RiFacebookBoxLine size={25} />
              </Link>
            </li>
            <li>
              <Link href={"/"} className="text-red-300">
                <AiOutlineInstagram size={25} />
              </Link>
            </li>
            <li>
              <Link href={"/"} className="text-red-700">
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
