import { getCurrentUser } from "@/lib/auth";
import React from 'react'
import ReviewCard from '@/app/ui/homePage/profile/reviews/ReviewCard'
import Link from 'next/link';


const Reviews = async() => {
  const user = await getCurrentUser();

  return (
    user?.reviews?.length ? 
    <div className='px-4 max-sm:px-2' >
      {user?.reviews?.map((item, i)=>(
        <ReviewCard item={item} key={i}/>
      ))}
      </div>
     : (
      <div className='p-6 max-sm:p-0 max-sm:py-8 h-[100%]'>
      <div className='w-full h-full flex items-center justify-center'>
      <div className='text-center'>
         <h2 className='text-[18px] font-bold mb-4'>No Reviews</h2>
         <button className='bg-[#333] text-white rounded-md px-8 py-2 text-[14px]'>
           <Link href={"/profile"}>
           Go Back
           </Link>
         </button>
       </div>
      </div>
     </div>
    )
  )
 
}

export default Reviews