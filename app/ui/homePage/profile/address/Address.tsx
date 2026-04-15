"use client"
import { useState } from 'react'
import dynamic from 'next/dynamic';
import { CiLocationOn } from "react-icons/ci";
import UpdateAddress from '@/app/ui/homePage/profile/address/UpdateAddress';
// const UpdateAddress = dynamic(()=> import('@/app/ui/homePage/profile/address/UpdateAddress'),{ssr:false}) 
const AddressForm = dynamic(()=> import('@/app/ui/homePage/profile/address/AddressForm'),{ssr:false}) 
import { UserProfile } from '@/lib/definations';
import clsx from 'clsx';
import { FaPlus } from 'react-icons/fa6';

type UserProps = {
    user: UserProfile | any;
}

const Addresses: React.FC<UserProps> = ({user}) => {
  const [openAddress, setOpenAddress] = useState<boolean>(false)
  return (
    <div className='p-6 max-sm:px-2 max-sm:py-4'>
        {
            user.address ? (
                <div className='flex flex-col gap-4'>
                    <h2 className={`text-[16px] font-bold text-gray-800`}>Manage Address</h2>
                    <div>
                        <div onClick={()=>setOpenAddress(!openAddress)} className='cursor-pointer flex gap-4 items-center border border-gray-200 px-4 p-3 text-blue-500'>
                            <CiLocationOn/>
                            <p>Update Address</p>
                        </div>
                    </div>
                    
                    <div className={clsx('w-full absolute -top-[100%] right-0 opacity-0 transition duration-300 ease-in-out',{ 'relative transition duration-300 ease-in-out opacity-100' : openAddress === true })}>
                        <UpdateAddress address={user?.address} setOpenAddress={setOpenAddress}/>
                    </div>

                    <div className='border border-gray-200 px-4 p-3'>
                        <div className='flex flex-col gap-2'>
                            <div className='w-auto'><span className='w-auto bg-gray-100 py-1 px-2 text-[13px] text-gray-400 font-semibold rounded-md'>Home</span></div>
                            <div className='flex items-center gap-4 text-[14px] text-gray-800 font-bold'><p>{user?.name}</p><p>{user?.address?.phone}</p> </div>
                            <p className='text-[13px] text-gray-600'>{user?.address?.completeAddress}, {user?.address?.nearbyLandmark}, {user?.address?.city}, {user?.address?.state}, {user?.address?.pinCode}</p>
                        </div>               
                    </div>
                </div>
            ) : (
                <div className='flex flex-col gap-4'>
                    <h2 className={`text-[16px] font-bold text-gray-800`}>Manage Address</h2>
                    <div>
                        <div onClick={()=>setOpenAddress(!openAddress)} className='cursor-pointer flex gap-4 items-center border border-gray-200 px-4 p-3 text-blue-500'>
                            <FaPlus/>
                            <p>Add Address</p>
                        </div>
                    </div>
                    
                    <div className={clsx('w-full absolute -top-[100%] right-0 opacity-0 transition duration-300 ease-in-out',{ 'relative transition duration-300 ease-in-out opacity-100' : openAddress === true })}>
                        <AddressForm userId={user?.id} setOpenAddress={setOpenAddress}/>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Addresses