import { CartItem } from "@/lib/definations";
import { removeFromCart } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import Image from "next/image";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { ImageSkeleton } from "@/app/ui/skeletons";

interface CartItemCardProps {
  item: CartItem;
  quantityChangeHandler: (item: CartItem) => void; // Function that takes a CartItem and returns void
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  quantityChangeHandler,
}) => {
  const [value, setValue] = useState(item?.quantity);
  const [imageLoading, setImageLoading] = useState(true);
  const dispatch = useAppDispatch();

  const increment = (item: CartItem) => {
    if (item?.stock <= value) {
      alert("Product stock limited");
    } else {
      setValue(value + 1);
      const updateCartData = { ...item, quantity: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (item: CartItem) => {
    if (value > 1) {
      setValue(value - 1);
      const updateCartData = { ...item, quantity: value - 1 };
      quantityChangeHandler(updateCartData);
    } else {
      dispatch(
  removeFromCart({
    productId: item.productId,
    variantId: item.variantId,
  })
);
    }
  };
  
  return (
    <div className="flex justify-start items-center gap-2">
      <div className="w-[80px] h-[80px]">
        {imageLoading && <ImageSkeleton />}
        <Image
          src={item?.image}
          alt={item?.title}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onLoad={() => setImageLoading(false)}
        />
      </div>
      <div className="w-full">
        <p className="text-[14px] text-blue capitalize leading-none">
          {item?.title}...
        </p>
        <p className="text-[13px] text-black">Model - {item?.modelNumber}</p>
        <div className="w-full flex justify-between items-center gap-4">
          <div className="mt-2 h-8 w-28 border border-green-600 grid grid-cols-4 items-center">
            <button
              onClick={() => decrement(item)}
              className="col-span-1 h-full flex items-center justify-center text-black"
            >
              <FaMinus size={10} />{" "}
            </button>
            <p className="col-span-2 text-center text-black text-[14px]">
              {item?.quantity}
            </p>
            <button
              onClick={() => increment(item)}
              className="col-span-1 h-full flex items-center justify-center  text-black"
            >
              <FaPlus size={10} />{" "}
            </button>
          </div>
          <p className="text-[14px] text-blue leading-none">
            Rs. {item?.price?.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
