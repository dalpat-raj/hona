import { BlogsData } from "@/lib/definations";
import { formatDate } from "@/lib/helpers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiCalendarDate, CiUser } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  blog: BlogsData;
  blogs: BlogsData[];
};

const BlogDetails = ({ blog, blogs }: Props) => {
  return (
    <div className="py-8 max-sm:py-6 px-12 max-md:px-4 max-sm:px-2">
      <div className="grid grid-cols-4 max-lg:grid-cols-1 gap-4">
        <div className="col-span-3">
          <div>
            <Image
              src={blog.image}
              alt={blog.title}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <div className="flex justify-between items-center gap-4 mt-4">
            <div className="flex justify-start items-center gap-4">
              <div className="rounded-[50%] bg-gray p-2">
                <CiUser />
              </div>
              <p>{blog.author}</p>
            </div>
            <div className="flex justify-start items-center gap-4">
              <CiCalendarDate />
              <p>{formatDate(blog.createdAt)}</p>
            </div>
          </div>
          <div className="my-4">
            <p className="text-[24px] font-bold capitalize text-primary">
              {blog.title}
            </p>
            <p className="text-[17px] font-medium capitalize my-4">
              {blog.shortDescription}
            </p>
            <p className="text-[14px] font-normal capitalize">{blog.content}</p>
          </div>
        </div>
        <div className="col-span-1">
          <div>
            {blogs.map((item, i) => (
              <div className="flex flex-col gap-6 border-[1px] border-gray mb-6" key={i}>
                <Link href={`/pages/blog/${item.id}`}>
                  <div>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                   <div className="p-2">
                     <p className="text-md font-bold">{item.title}</p>
                    <div className="text-[#735AE5] flex justify-start items-center gap-4 mt-2">
                      <p>
                        Explore Article
                      </p>
                      <FaArrowRight />
                    </div>
                   </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
