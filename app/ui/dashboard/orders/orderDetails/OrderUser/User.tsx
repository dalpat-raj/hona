// import { User } from '@/lib/definations'
import { Address } from '@/lib/definations';
import { formatDate } from '@/lib/helpers';
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface UserData {
  id: string; 
  name: string | null;
  email: string; 
  password: string | null;
  image: string | null;
  role: string;
  addressId: number | null;
  createdAt: Date;
};

const User = ({users, address}: {users: UserData | null, address: Address | null}) => {
    
    
  return (
    <div>
        <div className={clsx('flex justify-center items-center max-sm:justify-start', {
            'hidden' : users?.image === null
        })}>
        <Image
            src={"/e22.jpg"}
            alt='fsd'
            width={0}
            height={0}
            sizes='100vw'
            style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%'}}
            />
        </div>
        <div className='flex justify-start gap-2 items-center mb-1'>
            <p className='text-[14px] font-semibold text-gray-800'>Name:</p>
            <p className='text-[14px] text-gray-600'>{users?.name}</p>
        </div>
        <div className='flex justify-start gap-2 items-center mb-1'>
            <p className='text-[14px] font-semibold text-gray-800'>Email:</p>
            <p className='text-[14px] text-gray-600'>{users?.email.slice(0,12)}...</p>
        </div>
        <div className='flex justify-start gap-2 items-center mb-1'>
            <p className='text-[14px] font-semibold text-gray-800'>Phone:</p>
            <p className='text-[14px] text-gray-600'>{address?.phone}</p>
        </div>
        <div className='flex justify-start gap-2 items-center mb-1'>
            <p className='text-[14px] font-semibold text-gray-800'>Join Us:</p>
            <p className='text-[14px] text-gray-600'>{formatDate(users?.createdAt)}</p>
        </div>
    </div>
  )
}

export default User