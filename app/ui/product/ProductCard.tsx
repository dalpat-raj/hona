import React from "react";
import Link from "next/link";
import { Product } from "@/lib/definations";
import Rating from "@/app/ui/rating/Rating";
import { formatTitle } from "@/lib/helpers";
import ProductCardImage from "@/app/ui/product/ProductCardImage";

interface ProductCardProps {
  prod: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ prod }) => {
  const discountPercentage =
    prod.originalPrice && prod.sellingPrice
      ? (
          ((prod.originalPrice - prod.sellingPrice) / prod.originalPrice) *
          100
        ).toFixed(0)
      : "0";

  return (
    <Link href={`/products/${formatTitle(prod.title)}`} className="relative">
      <ProductCardImage images={prod.images} />

      <div className="absolute top-0 right-0 uppercase bg-blackOverlay px-2 py-1">
        <p className="text-white text-[13px] font-semibold tracking-tightest z-50">
          Save {discountPercentage}%
        </p>
      </div>

      <div className="py-2 text-[15px] font-semibold capitalize text-green-800 text-center">
        <p>{prod?.title}</p>
      </div>
      {prod?.rating >= 1 && (
        <div className="flex items-center gap-2 pl-2">
          <Rating rating={prod?.rating} />
          <p className="text-[14px]">({prod?.review?.length || 0})</p>
        </div>
      )}
      <div className="flex gap-4 items-center justify-center text-center">
        <p className="text-[13px] mixerColor">
          Rs. {prod?.sellingPrice?.toFixed(2)}
        </p>
        <p className="text-[13px] line-through text-green-800">
          Rs. {prod?.originalPrice.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
