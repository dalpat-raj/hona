"use client";

import { Product, Variant } from "@/lib/definations";
import { addToCart } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import React, { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaMinus, FaPlus } from "react-icons/fa6";
import ButtonWithSpinner from "../../button/ButtonWithSpinner";

type Props = {
  productDetail: Product;
  selectedVariant: Variant | null;
};

const ProductButtons: React.FC<Props> = ({
  productDetail,
  selectedVariant,
}) => {
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState<number>(1);

  const dispatch = useAppDispatch();

  const AddToCartHandler = async () => {
    if (!selectedVariant) {
      alert("Please select a variant");
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const cartItem = {
      productId: productDetail.id,
      variantId: selectedVariant.id,
      title: productDetail.title,
      price: selectedVariant.sellingPrice,
      stock: selectedVariant.stock,
      sku: selectedVariant.sku,
      modelNumber: selectedVariant.modelNumber,
      color: selectedVariant.color,
      image: selectedVariant.images?.[0]?.url || "",
      quantity: qty,
    };

    dispatch(addToCart(cartItem));
    setLoading(false);
  };

  return (
    <div>
      {/* Quantity */}
      <div className="my-4">
        <p className="text-[11px] font-bold">QUANTITY</p>
        <div className="mt-2 h-8 w-36 border border-green-300 bg-white grid grid-cols-3 items-center">
          <button
            onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
            className="flex items-center justify-center text-blue"
          >
            <FaMinus size={10} />
          </button>

          <p className="text-center text-green-900">{qty}</p>

          <button
            className="flex items-center justify-center text-blue"
            onClick={() =>
              setQty(qty < (selectedVariant?.stock || 1) ? qty + 1 : qty)
            }
          >
            <FaPlus size={10} />
          </button>
        </div>
      </div>

      {/* Add to cart */}
      <div
        onClick={AddToCartHandler}
        className="w-full h-10 flex items-center justify-center gap-4"
      >
        <ButtonWithSpinner loading={loading}>
          <CiShoppingCart size={24} />
          <p className="text-[16px] font-semibold">
            Add To Cart - Rs.{" "}
            {selectedVariant?.sellingPrice
              ? selectedVariant.sellingPrice.toFixed(2)
              : "0.00"}
          </p>
        </ButtonWithSpinner>
      </div>
    </div>
  );
};

export default ProductButtons;
