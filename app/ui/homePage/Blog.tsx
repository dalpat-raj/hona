import { getFirstBlog } from "@/lib/data";
import { formatDate } from "@/lib/helpers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiCalendarDate, CiUser } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";

const Blog = async () => {
  const { data, error } = await getFirstBlog();
  return (
    <>
      {data && !Array.isArray(data) ? (
        <div className="w-full py-10 max-sm:py-6 px-12 max-md:px-4 max-sm:px-2">
          <h2 className="text-blue text-center text-[24px] max-sm:text-[16px] font-bold mb-6">Our Blogs</h2>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6 justify-between items-start">
            <div>
              <Image
                src={data.image}
                alt={data.title}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>
            <div>
              <div className="flex justify-between items-center gap-4">
                <div className="flex justify-start items-center gap-4">
                  <div className="rounded-[50%] bg-gray p-2">
                    <CiUser />
                  </div>
                  <p className="text-sm font-bold">{data.author}</p>
                </div>
                <div className="flex justify-start items-center gap-4">
                  <CiCalendarDate />
                  <p className="text-sm font-semibold">
                    {formatDate(data.createdAt)}
                  </p>
                </div>
              </div>
              <h2 className="text-xl text-blue font-bold my-2">{data.title}</h2>
              <p className="text-md text-blue">{data.shortDescription.slice(0,100)}...</p>
              <p className="text-sm text-blue my-2">{data.content.slice(0,400)}...</p>
              <Link href={`/pages/blog/${data.id}`}>
              <div className="text-[#735AE5] flex justify-start items-center gap-4 mt-2">
                <p>Explore Article</p>
                <FaArrowRight />
              </div>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Blog;
