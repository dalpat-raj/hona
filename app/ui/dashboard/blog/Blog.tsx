"use client"
import Image from "next/image";
import { caveat } from "@/app/ui/Fonts";
import { BlogsData } from "@/lib/definations";
import { useRouter } from "next/navigation";
import { FaPen } from "react-icons/fa";
import BlogDelete from "./BlogDelete";

type Props = {
  blogs: BlogsData[];
};

const Blog = ({ blogs }: Props) => {
  const router = useRouter();

  const CreateBlog=()=>{
    router.push("/dashboard/blog/createBlog")
  }
  

  return (
    <div className="px-4 my-4 relative">
      <div className="my-4 text-center flex justify-between items-center">
        <h2
          className={`${caveat.className} text-[26px] font-bold text-gray-700`}
        >
          Our Blogs
        </h2>
        <button
          onClick={() => CreateBlog()}
          className="flex justify-center items-center gap-2 rounded-lg bg-[#111827] hover:bg-gray-800 text-white text-[14px] px-2 py-1"
        >
          <FaPen size={16} />
          Add blog
        </button>
      </div>

      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
        {blogs?.map((item, i) => (
          <div
            className="col-span-1 shadow-custom-shadow rounded-md overflow-hidden bg-white p-4"
            key={i}
          >
            <Image
              src={item?.image}
              alt={item.title}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            <div className="flex justify-between items-center py-4 px-2 mt-2">
              <p className="text-[14px] font-semibold">
                <span className="text-gray-600">{item.author}<br/></span>
                <span className="text-gray-600">{item.title}</span>
              </p>
              <div className="flex items-center gap-2">
                {/* <button
                  onClick={() => {
                    setEditData(item);
                    setEditOpen(true);
                  }}
                  className="text-[13px] text-white bg-[#333] py-1 px-2 rounded-sm"
                >
                  <CiEdit size={20} />
                </button>  */}
                <BlogDelete id={item?.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
