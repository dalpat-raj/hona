import { UserOrders } from '@/lib/definations'
import { formatDate } from '@/lib/helpers'
import clsx from 'clsx'
import React from 'react'

type Props = {
  order: UserOrders;
}

const Summary: React.FC<Props> = ({order}) => {

  return (
    <div>
        <div className='flex justify-between items-center mb-2'>
        <h2 className='text-[16px] font-bold text-gray-800'>Order Summary</h2>
        <div  className={clsx(
        "text-[14px] col-span-1 text-gray-600",
        order?.status === "confirmed" && "text-[14px] font-semibold",   
        order?.status === "pickup" && "text-[14px] font-semibold",   
        order?.status === "shipped" && "text-[14px] font-semibold",   
        order?.status === "delivered" && "text-[14px] font-semibold text-green-800",   
        order?.status === "cancled" && "text-[14px] font-semibold text-red-800",   
        order?.status === "refunded" && "text-[14px] font-semibold text-yellow-600",   
      )}>
        {order?.status}
        </div>
        </div>
        <div className='flex justify-between items-center mb-1'>
            <p className='text-[14px] font-semibold text-gray-700'>Order Created</p>
            <p className='text-[14px] text-gray-600'>{formatDate(order?.createdAt)}</p>
        </div>
        <div className='flex justify-between items-center mb-1'>
            <p className='text-[14px] font-semibold text-gray-700'>Order Time</p>
            <p className='text-[14px] text-gray-600'>{order?.createdAt?.toLocaleTimeString()}</p>
        </div>
        <div className='flex justify-between items-center mb-1'>
            <p className='text-[14px] font-semibold text-gray-700'>Subtotal</p>
            <p className='text-[14px] text-gray-600'>₹ {order?.subTotal?.toFixed(2)}</p>
        </div>
        <div className='flex justify-between items-center mb-1'>
            <p className='text-[14px] font-semibold text-gray-700'>Shipping Charge</p>
            <p className='text-[14px] text-gray-600'>₹ {order?.shippingCharge?.toFixed(2)}</p>
        </div>
        <div className='flex justify-between items-center mt-1'>
            <p className='text-[14px] font-semibold '>Total</p>
            <p className='text-[14px] font-semibold'>₹ {order?.totalAmount.toFixed(2)}</p>
        </div>
    </div>
  )
}

export default Summary