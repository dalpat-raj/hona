"use client"
import React from 'react'
import { OrderTopNavData } from '@/lib/placeholder_data'
import { Input } from "@/components/ui/input"
import clsx from 'clsx'

type Props = {
    orderType: string,
    setOrderType: React.Dispatch<React.SetStateAction<string>>,
}

const TopNav = ({orderType, setOrderType}: Props) => {
  
  return (
        <div className='flex justify-between items-center py-2'>
        <div className='flex justify-start items-center gap-4'>
            {
                OrderTopNavData.map((item, i)=>(
                    <div key={i} className={clsx("flex justify-start gap-2 items-center text-gray-500",{
                        'text-gray-800 border-b border-gray-500': orderType === item.title
                    })}>
                        <p onClick={()=>setOrderType(item.title)} className='text-[14px] cursor-pointer capitalize'>{item.title}</p>
                    </div>
                ))
            }
        </div>
        <div>
                {/* <form action=""> */}
                    <div className='flex gap-2'>
                    <Input type='date' />
                    <Input type='date' />
                    </div>
                {/* </form> */}
        </div>
        </div>   
   
  )
}

export default TopNav