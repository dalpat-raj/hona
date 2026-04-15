import { AllCouponData } from "@/lib/definations"
import CouponCard from "./CouponCard"

const Coupon = ({coupons}: {coupons: AllCouponData[]}) => {
  return (
    <div>
      {
        coupons?.length >= 1 ? (
          <div className="p-6 max-sm:px-2 max-sm:py-4 w-3/5 max-sm:w-full">
            <h2 className="text-[15px] ">Available Coupons</h2>
            <div className="border border-gray-200 mt-4">
              {
                coupons?.map((item,i)=>(
                  <div key={i}>
                    <CouponCard coupon={item}/>
                  </div>
                ))
              }
            </div>
          </div>
        ) : (
          <div className="w-full h-[70vh] flex justify-center items-center">
            <h2 className="text-[15px] font-semibold">Coupons Not Available ❌</h2>
          </div>
        )
      }
    </div>
  )
}

export default Coupon