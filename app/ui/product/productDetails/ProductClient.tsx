"use client";

import { useState } from "react";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";



const ProductClient = ({ product }: any) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || null
    );

  return (
    <div className="px-12 py-4 max-md:px-4 max-sm:px-2">
      <div className="w-full h-auto grid grid-cols-2 max-sm:grid-cols-1 grid-rows-subgrid max-sm:grid-rows-1 max-sm:gap-4">
        <div className="col-span-1  max-sm:col-span-2 row-span-1">
          {/* <ProductImage productImages={selectedVariant?.images} /> */}
          <ProductImage productImages={selectedVariant?.images || []} />
        </div>
        <div className="col-span-1  max-sm:col-span-2 pl-12 max-md:px-4 max-sm:px-0 scroll-smooth overflow-scroll no-scrollbar overflow-y-auto">
          <ProductDetails
            productDetail={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default ProductClient;