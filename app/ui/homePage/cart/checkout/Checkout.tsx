'use client'
import { useEffect, useState, useMemo, useCallback } from 'react';
import CheckoutItems from './checkoutItems/CheckoutItems';
import CheckoutForm from './checkoutForm/CheckoutForm';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { CartItem, UserProfile } from '@/lib/definations';
import axios from 'axios';
import { toast } from 'sonner';
import { clearCart } from '@/lib/store/features/cart/cartSlice';
import Confetti from "canvas-confetti";
import Image from 'next/image';

interface UserProps {
  user: UserProfile | any;
}

const Checkout: React.FC<UserProps> = ({user}: UserProps) => {
  
  const cart: CartItem[] = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const [subTotal, setSubTotal] = useState<number>(0);
  const [shippingCharge, setShippingCharge] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [coupon, setCoupon] = useState<string>('');
  const [paymentInfo, setPaymentInfo] = useState({ type: 'pay', status: 'pending' });
  const [saveAddress, setSaveAddress] = useState<boolean>(false);
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const paymentInfoHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, type: value }));
    setShippingCharge(value === 'cash' ? 99 : 0);
  }, []);

  const checkCoupon = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`/api/coupon/checkCoupon/${coupon}`);
      if (response.data.discount) {
        const discountAmount = (subTotal * response.data.discount) / 100;
        setDiscountPrice(discountAmount);
        setCouponApplied(true);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error('Error applying coupon: ' + error?.message);
      setCouponApplied(false);
    } finally {
      setCoupon('');
      setLoading(false);
    }
  };

  const orderHandler = async (data: any) => {
    setLoading(true);
  
    // Iterating through each cart item to place individual orders
    try {
      
        const orderData = {
          items: cart.map((item) => ({
            productId: item.productId,
            title: item.title,
            price: item.price,
            stock: item.stock,
            modelNumber: item.modelNumber,
            image: item.image,
            color: item.color,
            brand: item.brand,
            rating: item.rating,
            quantity: item.quantity,
          })),
          paymentInfo,
          subTotal,
          shippingCharge,
          totalAmount: totalPrice,
          discountPrice,
          address: data,
          saveAddress,
          userId: user?.id || null,
        };
  
        const res = await axios.post("/api/createOrder", orderData);
      
      
      toast.success(`Order for placed successfully ✅`);
      Confetti();
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.error || "Error placing orders");
    } finally {
      setLoading(false);
      dispatch(clearCart());  
    }
  };

  const calculatedSubTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }, [cart]);

  useEffect(() => {
    setSubTotal(calculatedSubTotal);
    setTotalPrice(calculatedSubTotal + shippingCharge - discountPrice);
  }, [calculatedSubTotal, shippingCharge, discountPrice]);


  if(!cart?.length){
    return (
      <div className='flex justify-center items-center w-[100vw] h-[70vh]'>
        <Image
        src={'/emptyCart.jpg'}
        alt='empty cart'
        width={250}
        height={250}
        style={{objectFit: 'cover'}}
        />
      </div>
    )
  }

  return (
    <div className='grid grid-cols-2 grid-rows-subgrid max-lg:grid-rows-none h-[80vh] max-lg:h-full max-lg:grid-cols-1 overflow-hidden'>
      <div className='col-span-1 border-r max-lg:border-0 border-gray-200 p-10 max-sm:px-0 overflow-scroll no-scrollbar'>
        <CheckoutForm
          orderHandler={orderHandler}
          paymentInfoHandler={paymentInfoHandler}
          saveAddress={saveAddress}
          setSaveAddress={setSaveAddress}
          paymentInfo={paymentInfo}
          user={user}
          loading={loading}
        />
      </div>
      <div className='col-span-1 bg-[#FAFAFA] p-10 max-sm:px-0 overflow-scroll no-scrollbar'>
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