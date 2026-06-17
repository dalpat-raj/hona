import React from "react";
import Image from "next/image";
import Link from "next/link";
import anywash from "../../../public/anywash.png";
import stone from "../../../public/stone.jpg";
import keo from "../../../public/keo.jpg";
import ora from "../../../public/ora.jpg";
import dish from "../../../public/dish.jpg";
import { getCollections } from "@/lib/data";

const OurCollection = async() => {
  const collections = await getCollections();
  return (
    <div className="w-full relative py-10 max-sm:py-6 px-12 max-md:px-4 max-sm:px-2  bg-cover bg-center">
      <div className="flex justify-between items-center gap-2 overflow-x-scroll no-scrollbar">
        {collections?.map((item) => (
          <Link
            href={`/products?collection=${item?.title}`}
            key={item?.title}
          >
            <div className="flex flex-col items-center gap-2 cursor-pointer">
              <div className="w-[200px] h-[120px] max-sm:w-[80px] border-[1px] border-gray max-sm:h-[80px] p-2 rounded-full flex justify-center items-center overflow-hidden">
                <Image
                  src={item?.image}
                  alt={item?.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "80%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <p className="text-blue">{item?.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OurCollection;
