import { useAppSelector } from '@/lib/store/hooks'
import React, { useEffect, useState } from 'react'
import ItemCard from './ItemCard'
import { CartItem } from '@/lib/definations'
import ButtonWithSpinner from '@/app/ui/button/ButtonWithSpinner'

type Props = {
    setCoupon: React.Dispatch<React.SetStateAction<string>>,
    checkCoupon: React.FormEventHandler<HTMLFormElement>,
    shippingCharge: number,
    discountPrice: number,
    subTotal: number,
    totalPrice: number,
    loading: boolean,
    couponApplyed: boolean,
}

const CheckoutItems = ({setCoupon, checkCoupon, shippingCharge, discountPrice, subTotal, totalPrice, loading, couponApplyed}: Props) => {
    const cart: CartItem[] = useAppSelector((state) => state.cart.items);
    const [cartitems, setCartItems] = useState<CartItem[]>()

    useEffect(()=>{
        setCartItems(cart && cart)
    },[cart])

  return (
    <div className='pr-12 max-md:pr-0'>
        {
            cartitems?.map((item,i)=>(
                <ItemCard item={item} key={i}/>
            ))
        }

        <div className='mt-6'>
            <form onSubmit={checkCoupon}>
                <div className='w-full flex justify-between items-center gap-4'>
                    <input 
                    type="text" 
                    name='coupon'
                    placeholder='Discount code or gift card'
                    onChange={(e)=>setCoupon(e.target.value)}
                    className='text-[15px] w-full py-3 border-2 border-gray-200 rounded-lg
                    pl-2'
                    />
                    <div className='w-24 h-11'>
                    <ButtonWithSpinner loading={loading}>
                        {couponApplyed ? "Success" : "Apply"}
                    </ButtonWithSpinner>
                    </div>
                </div>
            </form>
        </div>
        {/* price  */}
        <div className='mt-6'>
            <div className='flex justify-between items-center mb-2'>
                <p className='text-[15px] text-gray-700'>Subtotal</p>
                <p className='text-[15px] '>₹ {subTotal.toFixed(2)}</p>
            </div>
            <div className='flex justify-between items-center mb-2'>
                <p className='text-[15px] text-gray-700'>Discount</p>
                <p className='text-[15px] '>- ₹ {discountPrice.toFixed(2)}</p>
            </div>
            <div className='flex justify-between items-center mb-2'>
                <p className='text-[15px] text-gray-700'>Shipping</p>
                <p className='text-[15px] text-gray-700'>+ ₹ {shippingCharge.toFixed(2)}</p>
            </div>
            <div className='flex justify-between items-center mb-3'>
                <div>
                <h2 className='text-[18px] font-bold text-gray-600'>Total</h2>
                <p className='text-[13px] leading-none text-gray-400'>Including ₹ 548.95 in taxes</p>
                </div>
                <div className='flex items-end gap-2'>
                    <small className='text-gray-500'>INR</small>
                    <h2>₹ {loading ? "calculating" : totalPrice.toFixed(2)}</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckoutItems