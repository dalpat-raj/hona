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
        order?.status === "CONFIRMED" && "text-[14px] font-semibold",   
        order?.status === "PROCESSING" && "text-[14px] font-semibold",   
        order?.status === "PACKED" && "text-[14px] font-semibold",   
        order?.status === "SHIPPED" && "text-[14px] font-semibold text-green-800",   
        order?.status === "CANCELLED" && "text-[14px] font-semibold text-red-800",   
        order?.status === "REFUNDED" && "text-[14px] font-semibold text-yellow-600",   
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
            <p className='text-[14px] text-gray-600'>₹ {order?.subtotal?.toFixed(2)}</p>
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