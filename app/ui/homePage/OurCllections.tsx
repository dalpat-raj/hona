import React from "react";
import Image from "next/image";
import Link from "next/link";
import anywash from "../../../public/anywash.png";
import stone from "../../../public/stone.jpg";
import keo from "../../../public/keo.jpg";
import ora from "../../../public/ora.jpg";
import dish from "../../../public/dish.jpg";

const OurCollection = () => {
  const partners = [
    { img: stone, collection: "2 Stone" },
    { img: anywash, collection: "Anywash" },
    { img: ora, collection: "Ora" },
    { img: dish, collection: "Dish" },
    { img: keo, collection: "Keo" },
  ];
  return (
    <div className="w-full relative py-8  max-sm:py-6 px-12 max-md:px-4 max-sm:px-2  bg-cover bg-center">
      <div className="flex justify-between items-center gap-2 overflow-x-scroll no-scrollbar">
        {partners.map((item) => (
          <Link
            href={`/products?collection=${item.collection}`}
            key={item.collection}
          >
            <div className="flex flex-col items-center gap-2 cursor-pointer">
              <div className="w-[100px] h-[100px] max-sm:w-[80px] max-sm:h-[80px] p-2 bg-white rounded-full flex justify-center items-center overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.collection}
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="text-blue">{item.collection}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OurCollection;
