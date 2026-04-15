import { CustomerWithOrderCount, User } from '@/lib/definations'
import Image from 'next/image';
import React from 'react'
import { CiUser } from 'react-icons/ci';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

type Props = {}

const CustomerCard = ({customer}: {customer: CustomerWithOrderCount}) => {
    
  return (
    <div className='col-span-1'>
        <HoverCard>
        <HoverCardTrigger>
            <div className='text-center flex justify-center flex-col items-center cursor-pointer'>
                <div className='bg-gray-100 w-[100px] overflow-hidden flex justify-center items-center rounded-full'>
                    {
                    customer?.image ? (
                        <Image
                        src={customer?.image}
                        alt='customer'
                        width={100}
                        height={100}
                        />
                    ) : (
                        <CiUser size={100}/>
                    )
                }
                </div>
                <p className=''>{customer.name}</p>
            </div>
        </HoverCardTrigger>
        <HoverCardContent>
            <div>
                <p>Email - {customer.email}</p>
                <p>Total Orders - {customer._count.orders}</p>
            </div>
        </HoverCardContent>
        </HoverCard>
    </div>

            

       
  )
}

export default CustomerCard