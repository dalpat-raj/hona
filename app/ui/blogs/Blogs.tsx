import React from "react";
import { BlogsData } from "@/lib/definations";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { formatDate } from "@/lib/helpers";
import { CiCalendarDate, CiUser } from "react-icons/ci";

type Props = {
  blogs: BlogsData[];
};

const Blogs = ({ blogs }: Props) => {
  return (
    <div className="py-8 max-sm:py-6 px-12 max-md:px-4 max-sm:px-2">
      <h2 className="text-center font-bold text-[18px] pb-8">Our Story</h2>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 max-md:gap-6 items-center">
        {blogs?.map((item, i) => (
          <div
            className="col-span-1 border-[1px] border-gray rounded-sm overflow-hidden"
            key={i}
          >
            <div className="">
              <Image
                src={item.image}
                alt={item.title}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
            <div className="p-4">
              <p>{item.title}</p>
              <div className="text-[#735AE5] flex justify-start items-center gap-4 mt-2">
                <Link href={`/pages/blog/${item.id}`}>Explore Article</Link>
                <FaArrowRight />
              </div>
              <div className="flex items-center justify-center my-2">
                <span className="block w-[100%] h-[1px] bg-gray"></span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <div className="flex justify-start items-center gap-4">
                  <div className="rounded-[50%] bg-gray p-2">
                    <CiUser />
                  </div>
                  <p>{item.author}</p>
                </div>
                <div className="flex justify-start items-center gap-4">
                  <CiCalendarDate />
                  <p>{formatDate(item.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
