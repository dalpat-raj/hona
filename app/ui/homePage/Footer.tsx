import Link from "next/link";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FiInstagram } from "react-icons/fi";
import { CiTwitter } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import logo from "../../../public/logo.png"

const Footer = () => {
  return (
    <div className="w-full px-24 max-lg:px-12 max-md:px-4 max-sm:px-2 bg-bga border-t-green-200">
      <div className="py-12 max-sm:py-4 grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-8 text-green-600 max-sm:hidden">
        <div>
          <div className="w-[180px] max-sm:w-[140px] ">
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
          <ul className="text-[14px] font-semibold mt-6">
            <li className="list-none py-1 text-[14px] font-normal transition-all hover:text-[16px] hover:font-bold">
              <Link href={"/"}>Our Story</Link>
            </li>
            <li className="list-none py-1 text-[14px] font-normal transition-all hover:text-[16px] hover:font-bold">
              <Link href={"/"}>Our Blog</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-blue text-[17px] pb-2 font-semibold ">Quick Links</h2>
          <ul>
            <li className="list-none py-1 text-[14px] font-normal transition-all hover:text-[16px] hover:font-bold">
              <Link href={"/pages/about-us"}>About Us</Link>
            </li>
            <li className="list-none py-1 text-[14px] font-normal transition-all hover:text-[16px] hover:font-bold">
              <Link href="/pages/privacy-policy">Privacy Policy</Link>
            </li>
            <li className="list-none py-1 text-[14px] font-normal transition-all hover:text-[16px] hover:font-bold">
              <Link href={"/pages/refund-policy"}>Refund & Exchange Policy</Link>
            </li>
            <li className="list-none py-1 text-[14px] font-normal transition-all hover:text-[16px] hover:font-bold">
              <Link href="/pages/shipping-policy">Shipping Policy</Link>
            </li>
            <li className="list-none py-1 text-[14px] font-normal transition-all hover:text-[16px] hover:font-bold">
              <Link href="/pages/cookie-policy">Cookie Policy</Link>
            </li>
            <li className="list-none py-1 text-[14px] font-normal transition-all hover:text-[16px] hover:font-bold">
              <Link href="/pages/terms-condition">Terms & Condition</Link>
            </li>
            <li className="list-none py-1 text-[14px] font-normal transition-all hover:text-[16px] hover:font-bold">
              <Link href="/pages/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-blue text-[17px] pb-2 font-semibold ">Contact</h2>
          <ul>
            <li className="list-none py-1 text-[14px] font-normal">
              Entity Of Mukesh Kumar
            </li>
            <li className="list-none py-1 text-[14px] font-normal">
              2026 © Contrive
            </li>
            <li className="list-none py-1 text-[14px] font-normal">
              Made With ❤️ In World
            </li>
            <li className="list-none py-1 text-[14px] font-normal">
              Call Us @ 6356060606
            </li>
            <li className="list-none py-1 text-[14px] font-normal">
              Email @ frndtechnologyenovationpvtltd@gmail.com
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-blue text-[17px] pb-2 font-semibold ">Sign up and save</h2>
          <li className="list-none py-1 text-[14px] font-normal">
            Subscribe to get special offers, free giveaways, and
            once-in-a-lifetime deals.
          </li>
          <li className="list-none text-[14px] font-normal mt-4 relative">
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full border-green-300 text-white !bg-white py-2 pl-12"
            />
            <span className="absolute top-0 left-0 h-full w-10 flex items-center justify-center">
              <HiOutlineMailOpen size={20} />
            </span>
          </li>
        </div>
      </div>

      {/* mobile footer  */}
      <div className="hidden max-sm:block py-12 max-sm:py-4 text-white">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline text-blue">
              <h6 className="text-[13px] uppercase font-extrabold">Company</h6>
            </AccordionTrigger>
            <AccordionContent>
              <div className="py-4 transition duration-500 ease-in opacity-100">
                <ul className="text-[14px] font-semibold">
                            <li className="w-[180px] max-sm:w-[140px] ">
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
          </li>
                  <li className="list-none py-1 text-[14px] no-underline font-normal text-black">
                    <Link href={"/pages/ourStory"}>Our Story</Link>
                  </li>
                  <li className="list-none py-1 text-[14px] font-normal text-black">
                    <Link href={"/pages/blog"}>Our Blog</Link>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="hover:no-underline text-blue">
              <h6 className="text-[13px] uppercase font-extrabold">
                Need Help ?
              </h6>
            </AccordionTrigger>
            <AccordionContent>
              <div className="py-4 transition duration-500 ease-in opacity-100">
                <ul className="text-[14px] font-semibold">
                  <li className="list-none py-1 text-[14px] font-normal text-black">
                    <Link href={"/"}>Track Order</Link>
                  </li>
                  <li className="list-none py-1 text-[14px] font-normal text-black">
                    <Link href="/">Cancellation</Link>
                  </li>
                  <li className="list-none py-1 text-[14px] font-normal text-black">
                    <Link href={"/"}>
                      Refund & Exchange Policy
                    </Link>
                  </li>
                  <li className="list-none py-1 text-[14px] font-normal text-black ">
                    <Link href="/">
                      Shipping Information
                    </Link>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="hover:no-underline text-blue">
              <h6 className="text-[13px] uppercase font-extrabold">Contact</h6>
            </AccordionTrigger>
            <AccordionContent>
              <div
                className={"py-4 transition duration-500 ease-in opacity-100"}
              >
                <ul className="text-[14px] font-semibold">
                  <li className="list-none py-1 text-[14px] font-normal text-black">
                    Entity Of Mukhesh Kumar
                  </li>
                  <li className="list-none py-1 text-[14px] font-normal text-black">
                    2026 © Contrive
                  </li>
                  <li className="list-none py-1 text-[14px] font-normal text-black">
                    Made With ❤️ In World
                  </li>
                  <li className="list-none py-1 text-[14px] font-normal text-black">
                    Call Us @ 6356060606
                  </li>
                  <li className="list-none py-1 text-[14px] font-normal text-black">
                    Email @ frndtechnologyenovationpvtltd@gmail.com
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="my-4">
          <h2 className="text-blue max-md:font-bold text-[17px] pb-2">Sign up and save</h2>
          <li className="list-none py-1 text-[14px] font-normal max-md:text-black">
            Subscribe to get special offers, free giveaways, and
            once-in-a-lifetime deals.
          </li>
          <li className="list-none text-[14px] font-normal mt-4 relative">
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full bg-white py-2 pl-12"
            />
            <span className="absolute top-0 left-0 h-full w-10 flex items-center justify-center text-blue">
              <HiOutlineMailOpen size={20} />
            </span>
          </li>
        </div>
      </div>

      <div className="text-green-600 w-full flex items-center justify-center max-md:gap-4 gap-8 pb-8">
        <HiOutlineMailOpen size={25} className="cursor-pointer" />
        <FiInstagram size={25} className="cursor-pointer" />
        <CiTwitter size={25} className="cursor-pointer" />
        <CiYoutube size={25} className="cursor-pointer" />
      </div>

      <div className="text-blue text-center py-8 border-t-[1px] border-gray-400 ">
        <p>TheContrive.com Cover All Right Resevered</p>
      </div>
    </div>
  );
};

export default Footer;
