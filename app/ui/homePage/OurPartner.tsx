import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import anywash from "../../../public/anywash.png";
import stone from "../../../public/stone.jpg";
import keo from "../../../public/keo.jpg";
import ora from "../../../public/ora.jpg";
import dish from "../../../public/dish.jpg";

const OurPartner = () => {
  const partners = [
    { img: stone, brand: "2 Stone" },
    { img: anywash, brand: "Anywash" },
    { img: ora, brand: "Ora" },
    { img: dish, brand: "Dish" },
    { img: keo, brand: "Keo" },
  ];
  return (
    <div className="w-full h-[80vh] max-md:h-[60vh] relative py-8 max-sm:py-6 px-12 max-md:px-4 max-sm:px-2 bg-[url('/bg.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-bga/50"></div>
      <div className="relative z-10 h-full w-full flex justify-center items-center">
        <div>
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-[28px] max-sm:text-[24px] font-bold text-blue">
              By
            </h2>
            <div className="w-[150px] max-sm:w-[105px]">
              <Image
                src={logo}
                alt="logo"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="w-full shadow boxShadow bg-white mt-8 rounded-xl flex flex-wrap justify-center items-center gap-6 p-4">
            {partners?.map((item, i) => (
              <div
                key={i}
                className="w-[22%] sm:w-[18%] md:w-[150px] min-w-[90px]"
              >
                <Link href={`/products?brand=${item?.brand}`}>
                  <Image
                    src={item?.img}
                    alt="logo"
                    className="w-full h-auto object-contain"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPartner;
