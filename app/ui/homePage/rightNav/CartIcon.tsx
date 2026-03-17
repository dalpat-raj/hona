"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Cart from "@/app/ui/homePage/cart/SideCart";
import { useAppSelector } from "@/lib/store/hooks";
import { CartItem } from "@/lib/definations";
import { MdOutlineShoppingCart } from "react-icons/md";

type Props = {};

const CartIcon = (props: Props) => {
  const cart = useAppSelector((state) => state.cart.items);
  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  const [openCart, setOpenCart] = useState<boolean>(false);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    setCartCount(cart?.length >= 1 ? cart?.length : 0);
    setCartItem(cart);

    if (!firstLoad && cart?.length > cartItem?.length) {
      setOpenCart(true);
    }

    if (firstLoad) {
      setFirstLoad(false);
    }
  }, [cart]);
  return (
    <>
      <div
        className="relative cursor-pointer"
        onClick={() => setOpenCart(true)}
      >
        <MdOutlineShoppingCart size={23} />
        <p className="w-5 h-5 absolute -top-2/3 -right-2 bg-green-800 text-white text-sm flex items-center justify-center rounded-full">
          {cartCount}
        </p>
      </div>

      <div
        onClick={() => setOpenCart(!openCart)}
        className={clsx(
          "h-screen w-4/6 max-lg:w-2/4 max-sm:w-0 fixed -top-0 left-0 z-50 cursor-pointer bg-blackOverlay addCartExtra",
          { "hidden fixed -top-0 -left-3/4": openCart !== true },
        )}
      ></div>
      <div
        className={clsx(
          "h-screen no-scrollbar overflow-scroll bg-white w-2/6 max-lg:w-2/4 max-sm:w-full fixed top-0 right-0 z-50 addCart",
          { "hidden fixed -top-0 -right-1/4": openCart !== true },
        )}
      >
        <Cart setOpenCart={setOpenCart} cartItem={cartItem} />
      </div>
    </>
  );
};

export default CartIcon;
