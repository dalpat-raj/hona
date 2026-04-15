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
  // const discountPercentage =
  //   prod.originalPrice && prod.sellingPrice
  //     ? (
  //         ((prod.originalPrice - prod.sellingPrice) / prod.originalPrice) *
  //         100
  //       ).toFixed(0)
  //     : "0";
  
  return (
    <Link href={`/products/${formatTitle(prod.title)}`} className="relative">
      <ProductCardImage images={prod?.variants[0]?.images} />

      <div className="absolute -top-2 -right-2 uppercase bg-bgg px-2 py-1 rounded-md">
        <p className="text-white text-[13px] font-semibold tracking-tightest z-50">
          Save 50%
          {/* Save {discountPercentage}% */}
        </p>
      </div>

      <div className="pt-2 text-[15px] font-semibold capitalize text-blue text-center max-sm:text-start">
        <p>{prod?.title}</p>
      </div>
      {1 && (
        <div className="flex items-center gap-2 py-2 justify-center max-sm:justify-start">
          <Rating rating={prod?.ratings} />
          <p className="text-[14px]">({prod?.reviews?.length || 0})</p>
        </div>
      )}
      {prod?.ratings >= 1 && (
        <div className="flex items-center justify-center max-sm:flex-col max-sm:items-start gap-2 pl-2">
          <Rating rating={prod?.ratings} />
          <p className="text-[14px]">({prod?.reviews?.length || 0})</p>
        </div>
      )}
      <div className="flex gap-4 items-center justify-center max-sm:flex-col max-sm:items-start max-sm:gap-1 text-center pb-2">
        <p className="text-[13px] text-blue">
          Rs. {prod?.variants[0]?.sellingPrice.toFixed(2)}
        </p>
        <p className="text-[13px] line-through mixerColor">
          Rs. {prod?.variants[0]?.originalPrice.toFixed(2)}
        </p>
      </div> 
    </Link>
  );
};

export default ProductCard;
