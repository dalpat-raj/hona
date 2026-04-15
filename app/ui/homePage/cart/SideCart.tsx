import React from "react";
import { CartItem } from "@/lib/definations";
import { RxCross1 } from "react-icons/rx";
import CartItemCard from "./CartItemCard";
import { useAppDispatch } from "@/lib/store/hooks";
import { addToCart } from "@/lib/store/features/cart/cartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface OpenCartSidebarProps {
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItem: CartItem[] | undefined;
}

const Cart = ({ setOpenCart, cartItem }: OpenCartSidebarProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const totalPrice = cartItem?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  );

  const quantityChangeHandler = (item: CartItem) => {
    dispatch(addToCart(item));
  };

  const handleCheckout = () => {
    setOpenCart(false);
    router.push("/checkout");
  };
  const handleCart = () => {
    setOpenCart(false);
    router.push("/cart");
  };

  return (
    <div className="py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[22px] font-extrabold text-blue">Your Cart</p>
        <p
          className="cursor-pointer text-red-700"
          onClick={() => setOpenCart((prev) => !prev)}
        >
          <RxCross1 size={20} />
        </p>
      </div>

      {cartItem?.length ? (
        <div className="overflow-scroll no-scrollbar h-[62vh] max-sm:h-[70vh] flex flex-col gap-3 mt-2">
          {cartItem?.map((item, i) => (
            <CartItemCard
              item={item}
              quantityChangeHandler={quantityChangeHandler}
              key={i}
            />
          ))}
        </div>
      ) : (
        <div className="h-[62vh] max-sm:h-[70vh] flex justify-center items-center">
          <Image
            src={"/emptyCart.jpg"}
            alt="empty cart"
            width={250}
            height={250}
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      {cartItem && (
        <div className="w-full px-4 absolute max-sm:fixed bottom-0 left-0 py-4 bg-gray-100">
          <div className="flex justify-between items-center">
            <p className="text-[18px] font-semibold">Total</p>
            <p className="text-[14px] font-semibold">
              Rs. {totalPrice?.toFixed(2)}
            </p>
          </div>
          <p className="text-[14px] text-gray-500">
            Tax and Shipping calculated at checkout
          </p>
          {cartItem?.length > 0 ? (
            <>
              <button
                onClick={handleCheckout}
                className="mt-4 w-full bg-bgg block py-2 text-white font-semibold text-[14px] rounded-lg"
              >
                PROCESS TO CHAECKOUT
              </button>
              <button
                onClick={handleCart}
                className=" mt-4 w-full block py-2 border border-[#333] font-semibold text-blue text-[14px] rounded-lg"
              >
                VIEW CART
              </button>
            </>
          ) : (
            <div>
              <Link
                href={"/products"}
                className="mt-4 w-full bg-bgg block py-2 text-center text-white font-semibold text-[14px] rounded-lg"
              >
                Explore Product
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
