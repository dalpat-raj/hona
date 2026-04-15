import { Address } from '@/lib/definations'
import React from 'react'


const Addresses = ({address}: {address: Address | null}) => {
    
  return (
    <div>
        <div className='mb-2'>
        <h2 className='text-[16px] font-bold text-gray-800'>Delivery Address</h2>
        </div>
        <div className='flex justify-start items-center gap-2 mb-1'>
            <p className='text-[14px] font-semibold text-gray-700'>Address:</p>
            <p className='text-[14px] text-gray-600'>{address?.completeAddress}</p>
        </div>
        <div className='flex justify-start items-center gap-2 mb-1'>
            <p className='text-[14px] font-semibold text-gray-700'>Landmark:</p>
            <p className='text-[14px] text-gray-600'>{address?.nearbyLandmark}</p>
        </div>
        <div className='flex justify-start items-center gap-2 mb-1'>
            <p className='text-[14px] font-semibold text-gray-700'>City:</p>
            <p className='text-[14px] text-gray-600'>{address?.city}</p>
        </div>
        <div className='flex justify-start items-center gap-2 mb-1'>
            <p className='text-[14px] font-semibold text-gray-700'>State:</p>
            <p className='text-[14px] text-gray-600'>{address?.state}</p>
        </div>
        <div className='flex justify-start items-center gap-2 mb-1'>
            <p className='text-[14px] font-semibold text-gray-700'>PinCode:</p>
            <p className='text-[14px] text-gray-600'>{address?.pinCode}</p>
        </div>
    </div>
  )
}

export default Addresses