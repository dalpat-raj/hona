"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import CheckoutItems from "./checkoutItems/CheckoutItems";
import CheckoutForm from "./checkoutForm/CheckoutForm";
import { CheckoutAddress } from "@/lib/definations";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { CartItem, UserProfile } from "@/lib/definations";
import { clearCart, removeFromCart } from "@/lib/store/features/cart/cartSlice";
import Razorpay from "razorpay";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    HeadlessCheckout?: {
      addToCart: (
        event: any,
        token: string,
        options: { fallbackUrl: string },
      ) => void;
    };
  }
}

interface UserProps {
  user: UserProfile | any;
}

const Checkout: React.FC<UserProps> = ({ user }) => {
  const cart: CartItem[] = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const [subTotal, setSubTotal] = useState<number>(0);
  const [shippingCharge, setShippingCharge] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [coupon, setCoupon] = useState<string>("");
  const [pinCode, setPinCode] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({
    type: "RAZORPAY",
    status: "pending",
  });
  const [saveAddress, setSaveAddress] = useState<boolean>(false);
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const paymentInfoHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setPaymentInfo((prev) => ({ ...prev, type: value }));
      setShippingCharge(value === "COD" ? 99 : 0);
    },
    [],
  );

  const calculateShipping = async (deliveryPinCode: string) => {
    try {
      if (!deliveryPinCode || deliveryPinCode.length !== 6) return;
      //
      const totalWeight = cart.reduce((total, item) => {
        return total + (item.weight || 0) * item.quantity;
      }, 0);

      const dimensions = cart.reduce(
        (acc, item) => {
          acc.length = Math.max(acc.length, item.length || 0);

          acc.breadth = Math.max(acc.breadth, item.breadth || 0);

          acc.height += (item.height || 0) * item.quantity;

          return acc;
        },
        {
          length: 0,
          breadth: 0,
          height: 0,
        },
      );
      //

      const response = await axios.post("/api/shipping/rates", {
        pickupPincode: process.env.NEXT_PUBLIC_PICKUP_PINCODE,
        deliveryPincode: deliveryPinCode,

        weight: totalWeight,

        length: dimensions.length,
        breadth: dimensions.breadth,
        height: dimensions.height,

        cod: paymentInfo.type === "COD",
      });

      const couriers = response.data?.data?.available_courier_companies || [];

      if (!couriers.length) {
        toast.error("Shipping not available for this location");
        return;
      }

      const cheapest = couriers.reduce((prev: any, curr: any) =>
        prev.rate < curr.rate ? prev : curr,
      );

      setShippingCharge(Number(cheapest.rate));
    } catch (error) {
      console.error(error);
      toast.error("Unable to calculate shipping charge");
    }
  };

  const checkCoupon = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`/api/coupon/checkCoupon/${coupon}`);
      if (response.data.discount) {
        const discountAmount = (subTotal * response.data.discount) / 100;
        setDiscountPrice(discountAmount);
        setCouponApplied(true);
        toast.success("coupon applied");
      }
    } catch (error: any) {
      toast.error(
        "Error applying coupon: " +
          (error?.response?.data?.message || error?.message),
      );
      setCouponApplied(false);
    }
    declaration: {
      setCoupon("");
      setLoading(false);
    }
  };

  const orderHandler = async (formData: CheckoutAddress) => {
    try {
      setLoading(true);
      

      const { data } = await axios.post("/api/orders/create", {
        address: formData,
        items: cart,
        coupon,
        saveAddress,
      });
      console.log("order", data);
      
      if (!data.success) {
        toast.error(data.message || "Order create failed");
        return;
      }

      // COD FLOW
      if (data.paymentMethod === "COD") {
        toast.success("Order placed successfully");

        dispatch(clearCart());

        router.push(`/order-success/${data.orderId}`);

        return;
      }

      // RAZORPAY FLOW
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: data.amount,

        currency: "INR",

        order_id: data.razorpayOrderId,

        name: "Your Store",

        description: "Order Payment",

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },

        handler: async function (response: any) {
          try {
            const verifyResponse = await axios.post("/api/payment/verify", {
              orderId: data.orderId,

              razorpay_order_id: response.razorpay_order_id,

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_signature: response.razorpay_signature,
            });


            if (verifyResponse.data.success) {
              toast.success("Payment Successful");

              dispatch(clearCart());

              router.push(`/order-success/${data.orderId}`);
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },

        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled");
          },
        },

        theme: {
          color: "#000000",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response: any) {
        toast.error(response?.error?.description || "Payment Failed");
      });

      razorpay.open();
    } catch (error: any) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const calculatedSubTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }, [cart]);

  useEffect(() => {
    setSubTotal(calculatedSubTotal);
    setTotalPrice(calculatedSubTotal + shippingCharge - discountPrice);
  }, [calculatedSubTotal, shippingCharge, discountPrice]);

  useEffect(() => {
    calculateShipping(pinCode);
  }, [pinCode, paymentInfo.type]);

  if (!cart?.length) {
    return (
      <div className="flex justify-center items-center w-[100vw] h-[70vh]">
        <Image
          src={"/emptyCart.jpg"}
          alt="empty cart"
          width={250}
          height={250}
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 grid-rows-subgrid max-lg:grid-rows-none h-[80vh] max-lg:h-full max-lg:grid-cols-1 overflow-hidden">
      <div className="col-span-1 border-r max-lg:border-0 border-gray-200 p-10 max-sm:px-0 overflow-scroll no-scrollbar">
        <CheckoutForm
          orderHandler={orderHandler}
          paymentInfoHandler={paymentInfoHandler}
          saveAddress={saveAddress}
          setSaveAddress={setSaveAddress}
          paymentInfo={paymentInfo}
          user={user}
          loading={loading}
          setPinCode={setPinCode}
        />
      </div>
      <div className="col-span-1 bg-[#FAFAFA] p-10 max-sm:px-0 overflow-scroll no-scrollbar">
        <CheckoutItems
          setCoupon={setCoupon}
          checkCoupon={checkCoupon}
          shippingCharge={shippingCharge}
          discountPrice={discountPrice}
          subTotal={subTotal}
          totalPrice={totalPrice}
          loading={loading}
          couponApplyed={couponApplied}
        />
      </div>
    </div>
  );
};

export default Checkout;
