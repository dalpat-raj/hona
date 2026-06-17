// import { User } from '@/lib/definations'
import { Address } from '@/lib/definations';
import { formatDate } from '@/lib/helpers';
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
import { CiUser } from 'react-icons/ci';

interface UserData {
  id: string; 
  name: string | null;
  email: string; 
  phone: string;
  password?: string | null;
  image?: string | null;
  role: string;
  createdAt: Date;
};

const User = ({users}: {users: UserData}) => {
    
    
  return (
    <div>
        <div className='flex justify-center items-center max-sm:justify-start bg-gray rounded-full p-2'>
        <CiUser/>
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
            <p className='text-[14px] text-gray-600'>{users?.phone}</p>
        </div>
        <div className='flex justify-start gap-2 items-center mb-1'>
            <p className='text-[14px] font-semibold text-gray-800'>Join Us:</p>
            <p className='text-[14px] text-gray-600'>{formatDate(users?.createdAt)}</p>
        </div>
    </div>
  )
}

export default User