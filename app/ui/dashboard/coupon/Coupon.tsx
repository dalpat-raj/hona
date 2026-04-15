import { getCoupons, deactivateCoupons } from '@/lib/data';
import CouponCard from '@/app/ui/dashboard/coupon/couponCard';


const Coupon = async() => {
  
  await deactivateCoupons();
  const coupons = await getCoupons();

  return (
    <div className='p-4'>
      <div className=''>
        <div className='grid grid-cols-7 max-sm:grid-cols-4 gap-2 border-b border-gray-300 mb-4 pb-1 capitalize'>
          <h4 className='text-[14px] font-semibold '>Id</h4>
          <h4 className='text-[14px] font-semibold'>Code</h4>
          <h4 className='text-[14px] font-semibold max-sm:hidden'>discount</h4>
          <h4 className='text-[14px] font-semibold max-sm:hidden'>isActive</h4>
          <h4 className='text-[14px] font-semibold max-sm:hidden'>Start</h4>
          <h4 className='text-[14px] font-semibold max-sm:hidden'>End</h4>
          <h4 className='text-[14px] font-semibold '>Action</h4>
        </div>
        {
          coupons?.map((item,i)=>(
            <CouponCard AllCoupons={item} key={i}/>
          ))
        }
      </div>
    </div>
  )
}

export default Coupon