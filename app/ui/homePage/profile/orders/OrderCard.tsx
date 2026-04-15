"use client"
import React, { useState } from 'react'
import { UserOrders } from '@/lib/definations'
import Link from 'next/link'
import Image from 'next/image';
import { ImageSkeleton } from '@/app/ui/skeletons';
import { formatDate } from '@/lib/helpers';

type Props = {
  order: UserOrders
}

const OrderCard: React.FC<Props> = ({order}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const image1 = order?.items[0]?.image;

  const lastStatus = order?.statusHistory[order?.statusHistory.length - 1];

  
  
  return (
    <Link href={`/profile/orders/${order.id}`}>
    <div className='w-full grid grid-cols-6 max-sm:grid-cols-1 gap-3 border border-gray-200 hover:shadow-custom-shadow max-sm:shadow-custom-shadow max-sm:border-0 rounded-xl mb-4 px-2 py-2'>
        <div className='col-span-3 max-sm:col-span-6 flex gap-2'>
          <div className='w-[70px]  h-[80px]'>
          {imageLoading && <ImageSkeleton/>}
            <Image
              src={image1}
              alt={"order"}
              width={0}
              height={0}
              sizes='100vw'
              style={{width: '100%', height: '100%', objectFit: 'cover' }}
              onLoad={()=>setImageLoading(false)}
            />
          </div>
          <div>
            <p className='text-[14px] text-gray-800'>{ order?.items[0]?.title.length > 30 ? order?.items[0]?.title.slice(0,30)+"..." : order?.items[0]?.title}</p>
            <p className='text-[13px] text-gray-500'>color: {order?.items[0]?.color}</p>
          </div>
        </div>

        <div className='col-span-1 max-sm:col-span-6'>
          <p className='text-[14px] max-sm:text-[13px] text-gray-600'>₹ {order.totalAmount}</p>
        </div>

        <div  className="col-span-2 max-sm:col-span-6">
          <div>
            {
              lastStatus.status === "Order Confirmed" && (
                <div>
                  <p className='text-[14px] font-semibold text-gray-800'>Order Confirmed on {formatDate(lastStatus.changedAt)}</p>
                  <p className='text-[12px] text-gray-500'>your order has been confirmed</p>
                </div>
              )
            }
            {
              lastStatus.status === "pickup" && (
                <div>
                  <p className='text-[14px] font-semibold text-gray-800'>Pickup on {formatDate(lastStatus.changedAt)}</p>
                </div>
              )
            }
            {
              lastStatus.status === "shipped" && (
                <div>
                  <p className='text-[14px] font-semibold text-gray-800'>Order Confirmed on {formatDate(lastStatus.changedAt)}</p>
                  <p className='text-[12px] text-gray-500'>on the way</p>
                </div>
              )
            }
            {
              lastStatus.status === "delivered" && (
                <div>
                  <div className='flex gap-2 items-center'>
                  <p className='w-3 h-3 bg-green-500 rounded-full'></p> 
                  <p className='text-[14px] font-semibold text-gray-800'>
                    Delivered on {formatDate(lastStatus.changedAt)}
                  </p>
                  </div>
                  <p className='text-[12px] text-gray-500 py-2'>Your item has been delivered</p>
                  </div>
              )
            }
            {
              lastStatus.status === "cancled" && (
                <div>
                  <div className='flex gap-2 items-center'>
                  <p className='w-3 h-3 bg-red-500 rounded-full'></p> 
                  <p className='text-[14px] font-semibold text-gray-800'>
                    Cancelled on {formatDate(lastStatus.changedAt)}
                  </p>
                  </div>
                  <p className='text-[12px] text-gray-500'>As per your request, your item has been cancelled</p>
                </div>
              )
            }
          </div>
        </div>
    </div>
    </Link>
  )
}

export default OrderCard