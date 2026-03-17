import Image from "next/image";
import React from "react";
import Menu from "@/app/ui/homePage/Menu";
import MobileMenu from "@/app/ui/homePage/MobileMenu";
import Link from "next/link";
import RightNav from "@/app/ui/homePage/rightNav/RightNav";
import logo from "../../../../public/logo.png";

type Props = {};

const Navbar = async (props: Props) => {
  return (
    <div className="sticky top-0 left-0 bg-bg z-50">
      {/* <div className="h-15 max-sm:h-10 text-text_primary text-center py-2 max-sm:text-[13px] text-[15px]">
        <p>Pay Online and Get Free Express Shipping + Priority Dispatch</p>
      </div> */}
      <div className="w-full flex justify-between items-center px-12 max-md:px-4 max-sm:px-2 h-20 max-md:h-16  border-b max-lg:border-0 border-green-200 text-base relative">
        <div className="hidden max-md:block">
          <MobileMenu />
        </div>
        <div className="flex justify-between items-center gap-8 max-sm:gap-0">
          <div className="w-[140px] max-sm:w-[100px]">
            <Link href="/">
              <Image
                src={logo}
                alt="logo"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Link>
          </div>
          <div className="max-md:hidden">
            <Menu />
          </div>
        </div>
        <div>
          <RightNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
