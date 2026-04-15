import React from 'react'
import Link from 'next/link'
import clsx from 'clsx';
import { UserOrders} from '@/lib/definations';
import { formatDate } from '@/lib/helpers';


type Props = {
  order: UserOrders
}


const OrderCard = ({order}:Props) => {
  console.log(order);
  
  return (
    <Link href={`/dashboard/orders/${order.id}`}>
    <div className='grid grid-cols-8 items-center max-sm:grid-cols-4 shadow-custom-shadow rounded-xl mb-4 px-2 py-2'>
        <div className='text-[14px] font-semibold col-span-1 text-gray-600'>#{order.id}</div>
        <div className='text-[14px] col-span-1 text-gray-600 max-sm:hidden'>{order?.user?.name}</div>
        <div className='text-[14px] col-span-1 text-gray-600'>Rs. {order.totalAmount.toFixed(2)}</div>
        <div className='text-[14px] col-span-1 text-gray-600 max-sm:hidden'>{order.paymentInfoId}</div>
        <div className='text-[14px] col-span-1 text-gray-600'>{formatDate(new Date(order.createdAt))}</div>
        <div  className={clsx(
        "text-[14px] col-span-2 max-sm:col-span-1 text-gray-600 flex justify-center items-center",
        order.status === "Order Confirmed" && "bg-green-100 w-max py-1 px-4 rounded-lg font-semibold",   
        order.status === "pickup" && "bg-gray-100 w-max py-1 px-4 rounded-lg font-semibold",   
        order.status === "shipped" && "bg-green-100 w-max py-1 px-4 rounded-lg font-semibold",   
        order.status === "delivered" && "bg-green-100 w-max py-1 px-4 rounded-lg font-semibold text-green-800",   
        order.status === "cancled" && "bg-red-100 w-max py-1 px-4 rounded-lg font-semibold text-red-800",   
        order.status === "refunded" && "bg-yellow-100 w-max py-1 px-4 rounded-lg font-semibold text-yellow-600",   
      )}>
        {order.status}
        </div>
        <div className='text-[14px] col-span-1 max-sm:hidden'><button className='text-[13px] text-white bg-[#333] py-1 px-4 rounded-sm'>View</button></div>
    </div>
    </Link>
  )
}

export default OrderCard