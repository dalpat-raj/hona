"use client";
import { useState } from "react";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { caveat } from "@/app/ui/Fonts";
import { BannerData } from "@/lib/definations";
import { BannerForm } from "@/app/ui/dashboard/banner/BannerForm";
import { EditForm } from "@/app/ui/dashboard/banner/EditFrom";
import BannerDelete from "@/app/ui/dashboard/banner/BannerDelete";

type Props = {
  banners: BannerData[];
};

const Banner = ({ banners }: Props) => {
  const [editData, setEditData] = useState<BannerData>();
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  

  return (
    <div className="px-4 my-4 relative">
      <div className="my-4 text-center flex justify-between items-center">
        <h2
          className={`${caveat.className} text-[26px] font-bold text-gray-700`}
        >
          Our Banner
        </h2>
        <button
          onClick={() => setOpen(!open)}
          className="flex justify-center items-center gap-2 rounded-lg bg-bgg hover:bg-gray-800 text-white text-[14px] px-2 py-1"
        >
          <FaPlus size={16} />
          Add banner
        </button>
      </div>

      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
        {banners?.map((item, i) => (
          <div
            className="col-span-1 shadow-custom-shadow rounded-md overflow-hidden bg-white p-4"
            key={i}
          >
            <Image
              src={item?.image}
              alt={item.url}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            <div className="flex justify-between items-center py-4 px-2 mt-2">
              <p className="text-[14px] font-semibold">
                Url- <span className="text-gray-600">{item.url}</span>
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditData(item);
                    setEditOpen(true);
                  }}
                  className="text-[13px] text-white bg-[#333] py-1 px-2 rounded-sm"
                >
                  <CiEdit size={20} />
                </button> 
                <BannerDelete id={item?.id} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div></div>

      {open && (
        <div className="w-full h-screen absolute top-0 left-0 bg-blackOverlay">
          <BannerForm setOpen={setOpen} />
        </div>
      )}
      {editOpen && (
        <div className="w-full h-screen fixed top-0 left-0 bg-blackOverlay">
          <EditForm editData={editData} setEditOpen={setEditOpen} />
        </div>
      )}
    </div>
  );
};

export default Banner;
