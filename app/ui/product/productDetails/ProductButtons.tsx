"use client";
import { Product } from "@/lib/definations";
import { addToCart } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import React, { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaMinus, FaPlus } from "react-icons/fa6";
import ButtonWithSpinner from "../../button/ButtonWithSpinner";

type Props = {
  productDetail: Product;
};

const ProductButtons: React.FC<Props> = ({ productDetail }) => {
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState<number>(1);
  const [modell, setModel] = useState<string | undefined>(
    productDetail?.model[0],
  );

  const dispatch = useAppDispatch();

  const AddToCartHandler = async (productDetail: Product | null) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!productDetail) {
      alert("Product details missing");
      return;
    }

    // Prepare the cart item
    const cartItem = {
      productId: productDetail.id,
      title: productDetail.title,
      price: productDetail.sellingPrice,
      stock: productDetail.stock,
      modelNumber: productDetail.modelNumber,
      image: productDetail.images[0],
      color: productDetail.color,
      rating: productDetail?.rating || 0,
      model: productDetail.model[0],
      quantity: qty,
    };
    dispatch(addToCart(cartItem));
    setLoading(false);
  };

  return (
    <div>
      <div className="my-4">
        {productDetail?.model?.length >= 2 && (
          <>
            <p className="text-[11px] font-bold">SELECT MODEL</p>
            <select
              onChange={(e) => setModel(e.target.value)}
              className="mt-2 w-36 border border-green-300 py-1 text-green-700 bg-white outline-none"
            >
              {productDetail?.model?.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      <div className="my-4">
        <p className="text-[11px] font-bold">QUANTITY</p>
        <div className="mt-2 h-8 w-36 border border-green-300 bg-white grid grid-cols-4 items-center">
          <button
            onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
            className="col-span-1 h-full flex items-center justify-center hover:bg-green-200 text-green-700"
          >
            <FaMinus size={10} />{" "}
          </button>
          <p className="col-span-2 text-center text-green-900">{qty}</p>
          <button
            onClick={() => setQty(qty + 1)}
            className="col-span-1 h-full flex items-center justify-center hover:bg-green-200 text-green-700"
          >
            <FaPlus size={10} />{" "}
          </button>
        </div>
      </div>

      <div
        onClick={() => AddToCartHandler(productDetail)}
        className="w-full h-10 flex items-center justify-center gap-4"
      >
        <ButtonWithSpinner loading={loading}>
          <CiShoppingCart size={30} />
          <p className="text-[18px] font-semibold">
            Add To Cart - RS. {productDetail?.sellingPrice.toFixed(2)}
          </p>
        </ButtonWithSpinner>
      </div>
    </div>
  );
};

export default ProductButtons;
