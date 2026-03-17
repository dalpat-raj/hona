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

const Footer = () => {
  return (
    <div className="w-full px-24 max-lg:px-12 max-md:px-4 max-sm:px-2 bg-bg border-t-green-200">
      <div className="py-12 max-sm:py-4 grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-8 text-green-600 max-sm:hidden">
        <div>
          <h2 className="text-[17px] font-semibold pb-2">Company</h2>
          <ul className="text-[14px] font-semibold">
            <li className="list-none py-1 text-[14px] font-normal hover:text-[16px]">
              <Link href={"/pages/"}>Our Story</Link>
            </li>
            <li className="list-none py-1 text-[14px] font-normal hover:text-[16px]">
              <Link href={"/pages/"}>Our Blog</Link>
            </li>
            <li className="list-none py-1 text-[14px] font-normal hover:text-[16px]">
              <Link href={"/pages/privacy-policy"}>Privacy Policy</Link>
            </li>
            <li className="list-none py-1 text-[14px] font-normal hover:text-[16px]">
              <Link href={"/pages/terms-of-service"}>Terms Of Service</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[17px] pb-2 font-semibold ">Need Help ?</h2>
          <ul>
            <li className="list-none py-1 text-[14px] font-normal hover:text-[16px]">
              <Link href={"/pages/"}>Track Order</Link>
            </li>
            <li className="list-none py-1 text-[14px] font-normal hover:text-[16px]">
              <Link href="/pages/cancellation">Cancellation</Link>
            </li>
            <li className="list-none py-1 text-[14px] font-normal hover:text-[16px]">
              <Link href={"/pages/cancellation"}>Refund & Exchange Policy</Link>
            </li>
            <li className="list-none py-1 text-[14px] font-normal hover:text-[16px]">
              <Link href="/pages/shipping-information">
                Shipping Information
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[17px] pb-2 font-semibold ">Contact</h2>
          <ul>
            <li className="list-none py-1 text-[14px] font-normal">
              Entity Of Dalpat Raj
            </li>
            <li className="list-none py-1 text-[14px] font-normal">
              2024 © Perfect Cover
            </li>
            <li className="list-none py-1 text-[14px] font-normal">
              Made With ❤️ In World
            </li>
            <li className="list-none py-1 text-[14px] font-normal">
              Call Us @ 6356060606
            </li>
            <li className="list-none py-1 text-[14px] font-normal">
              Email @ care@kalakaarindia.in
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[17px] pb-2 font-semibold ">Sign up and save</h2>
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
            <AccordionTrigger className="hover:no-underline">
              <h6 className="text-[13px] uppercase font-extrabold">Company</h6>
            </AccordionTrigger>
            <AccordionContent>
              <div className="py-4 transition duration-500 ease-in opacity-100">
                <ul className="text-[14px] font-semibold">
                  <li className="list-none py-1 text-[14px] font-normal">
                    <Link href={"/pages/"}>Our Story</Link>
                  </li>
                  <li className="list-none py-1 text-[14px] font-normal">
                    <Link href={"/pages/"}>Our Blog</Link>
                  </li>
                  <li className="list-none py-1 text-[14px] font-normal">
                    <Link href={"/pages/privacy-policy"}>Privacy Policy</Link>
                  </li>
                  <li className="list-none py-1 text-[14px] font-normal">
                    <Link href={"/pages/terms-of-service"}>
                      Terms Of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="hover:no-underline">
              <h6 className="text-[13px] uppercase font-extrabold">
                Need Help ?
              </h6>
            </AccordionTrigger>
            <AccordionContent>
              <div className="py-4 transition duration-500 ease-in opacity-100">
                <ul className="text-[14px] font-semibold">
                  <li className="list-none py-1 text-[14px] font-normal">
                    <Link href={"/pages/"}>Track Order</Link>
                  </li>
                  <li className="list-none py-1 text-[14px] font-normal">
                    <Link href="/pages/cancellation">Cancellation</Link>
                  </li>
                  <li className="list-none py-1 text-[14px] font-normal">
                    <Link href={"/pages/cancellation"}>
                      Refund & Exchange Policy
                    </Link>
                  </li>
                  <li className="list-none py-1 text-[14px] font-normal">
                    <Link href="/pages/shipping-information">
                      Shipping Information
                    </Link>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="hover:no-underline">
              <h6 className="text-[13px] uppercase font-extrabold">Contact</h6>
            </AccordionTrigger>
            <AccordionContent>
              <div
                className={"py-4 transition duration-500 ease-in opacity-100"}
              >
                <ul className="text-[14px] font-semibold">
                  <li className="list-none py-1 text-[14px] font-normal">
                    Entity Of Dalpat Raj
                  </li>
                  <li className="list-none py-1 text-[14px] font-normal">
                    2024 © Perfect Cover
                  </li>
                  <li className="list-none py-1 text-[14px] font-normal">
                    Made With ❤️ In World
                  </li>
                  <li className="list-none py-1 text-[14px] font-normal">
                    Call Us @ 6356060606
                  </li>
                  <li className="list-none py-1 text-[14px] font-normal">
                    Email @ care@kalakaarindia.in
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="my-4">
          <h2 className="text-[17px] pb-2">Sign up and save</h2>
          <li className="list-none py-1 text-[14px] font-normal">
            Subscribe to get special offers, free giveaways, and
            once-in-a-lifetime deals.
          </li>
          <li className="list-none text-[14px] font-normal mt-4 relative">
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full !bg-bg py-2 pl-12"
            />
            <span className="absolute top-0 left-0 h-full w-10 flex items-center justify-center">
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

      <div className="text-green-800 text-center py-8 border-t-[1px] border-gray-400">
        <p>Perfect Cover All Right Resevered</p>
      </div>
    </div>
  );
};

export default Footer;
