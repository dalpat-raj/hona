import React from "react";
import { TbWorld } from "react-icons/tb";
import { FaRegCheckCircle } from "react-icons/fa";
import { AiOutlineGift } from "react-icons/ai";
import { FiTruck } from "react-icons/fi";
import ProdDetailMenu from "./ProdDetailMenu";
import { Product } from "@/lib/definations";
import ProductButtons from "./ProductButtons";
import Rating from "../../rating/Rating";

interface ProductDetailsProps {
  productDetail: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = async ({
  productDetail,
}) => {
  return (
    <div>
      <div>
        <h2 className={`text-[27px] capitalize text-green-800 font-semibold`}>
          {productDetail?.title}
        </h2>
        <p className="text-green-400 text-sm font-bold">
          Model: {productDetail?.modelNumber}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex">
          <Rating rating={productDetail?.rating} />
        </div>
        <p className="text-[14px]">({productDetail?.review?.length})</p>
      </div>

      <div className="my-4 flex items-center gap-4">
        <p className="text-[18px] mixerColor font-semibold">
          Rs. {productDetail?.sellingPrice.toFixed(2)}
        </p>
        <span className="text-[14px] text-green-400">(Tax included)</span>
      </div>

      <ProductButtons productDetail={productDetail} />

      <div className="mt-4">
        <div className="flex justify-start items-center gap-3 mb-3">
          <FiTruck size={20} color="green" />
          <p className="text-[15px] font-semibold text-green-900">
            Free delivery across India <small>IN</small>
          </p>
        </div>
        <div className="flex justify-start items-center gap-3 mb-3">
          <TbWorld size={20} color="green" />
          <p className="text-[15px] font-semibold text-green-900">
            We deliver within 2-4 business days
          </p>
        </div>
        <div className="flex justify-start items-center gap-3 mb-3">
          <FaRegCheckCircle size={20} color="green" />
          <p className="text-[15px] font-semibold text-green-900">
            Trusted by 150000+ customers across India
          </p>
        </div>
        <div className="flex justify-start items-center gap-3 mb-3">
          <AiOutlineGift size={20} color="green" />
          <p className="text-[15px] font-semibold text-green-900">
            Coupon: GRAB15 | Get Flat 15% OFF on orders above 4000
          </p>
        </div>
        <div className="flex justify-start items-center gap-3 mb-3">
          <AiOutlineGift size={20} color="green" />
          <p className="text-[15px] font-semibold text-green-900">
            Coupon: PEEPERLY10 | Get Flat 10% OFF on orders above 1500
          </p>
        </div>
      </div>

      <div className="mt-4 text-green-900">
        {/* <ProdDetailMenu user={session?.user} product={productDetail} /> */}
        <ProdDetailMenu
          user={{ name: "dalpat", email: "dalpatt@gmail.com", role: "USER" }}
          product={productDetail}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
