import { UserOrders } from '@/lib/definations'
import { formatDate } from '@/lib/helpers'
import Image from 'next/image'
import React from 'react'

type Props = {
  order: UserOrders | null,
}

const Items = ({order}: Props) => {
  const statusHistory = order?.statusHistory;
  const items = order?.items;
  
  return (
    <div>
        <div className='border-b border-gray-300'>
          <p className='text-[16px] font-bold text-gray-800 py-2'>Items Summary</p>
        </div>
        <div className='flex justify-between gap-2 flex-wrap'>
        {
          items?.map((item,i)=>(
            <div key={i} className='py-2'>
            <div className='flex gap-2'>
              <div className=''>
                <Image
                src={item.image}
                alt={item.title}
                width={0}
                height={0}
                sizes='100vw'
                style={{width:'70px', height: '80px', objectFit: 'cover'}}
                />
              </div>
                <div className='flex flex-col gap-1'>
                <p className='text-[14px] text-gray-800'>{item.title}</p>
                <p className='text-gray-500 text-[14px] '>color: {item.color}</p>
                <p className='text-gray-500 text-[14px] '>model: {item.model}</p>
                </div>
            </div>
            <div className='text-[14px] pb-1 pt-1 text-gray-600'><p>model Number: {item.modelNumber}</p></div>
            <div className='text-[14px] pb-1 text-gray-600'><p>quantity: {item.quantity}</p></div>
            <div className='text-[14px] pb-1 text-gray-600 max-sm:hidden'><p>price: ₹{item.price.toFixed(2)}</p></div>
            <div className='text-[14px] pb-1 text-gray-600 font-bold'><p>total Price: ₹{(item.price * item.quantity).toFixed(2)}</p></div>
          </div>
          ))
        }
        <div className='py-2'>
          {
            statusHistory?.map((item, i)=>(
              <p key={i} className='text-[14px] pb-1 text-gray-600'>{item?.status} <span className='px-1'>At</span> 
              <span className='text-[13px] text-gray-500'>( {formatDate(item?.changedAt)} {item?.changedAt?.toLocaleTimeString()} )</span>
              </p>
            ))
          }
        </div>
        </div>

    </div>
  )
}

export default Items