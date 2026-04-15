"use client"
import { AllCouponData } from '@/lib/definations'
import { formatDate } from '@/lib/helpers';
import { toast } from 'sonner';

const CouponCard = ({coupon}: {coupon: AllCouponData}) => {
  
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(coupon?.code);
      toast.success("Code Copied! ✅")
    } catch (error) {
      toast.error('Failed to copy ❌')
    }
  };
    
  return (
    <div className='relative flex justify-between max-sm:flex-col max-sm:gap-2 border-b border-gray-200 p-4 max-sm:px-2'>
        <div>
            <h2 className='font-semibold text-[14px] mb-2'>
              {coupon.code} 
              <button 
                onClick={handleCopyClick} 
                className="ml-4 text-blue-500 hover:text-blue-700"
              >
                Copy
              </button>
              </h2>
            <p className='text-gray-600 text-[14px]'>Flate {coupon.discount} % off on all item's</p>
        </div>
        <div className='max-sm:absolute max-sm:right-2'>
          {coupon.isActive ? (
            <div className='flex gap-2 justify-center items-center'>
              <div className='w-4 h-4 rounded-full border border-green-500 flex justify-center items-center'>
              <p className='w-2 h-2 rounded-full bg-green-500'></p>
              </div>
              <p className='text-[14px]'>Activated</p>
            </div>
          ) : (
            <div className='flex gap-2 justify-center items-center'>
              <div className='w-4 h-4 rounded-full border border-red-500 flex justify-center items-center'>
                <p className='w-2 h-2 rounded-full bg-red-500'></p>
              </div>
              <p className='text-[14px]'>Expired</p>
            </div>
          )}
        </div>
        <p className='text-gray-600 text-[14px]'>Valid till {formatDate(coupon?.expirationDate)}</p>
        
    </div>
  )
}

export default CouponCard