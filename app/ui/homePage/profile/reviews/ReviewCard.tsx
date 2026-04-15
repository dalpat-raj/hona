"use client"
import { reviewDelete } from '@/action/reviews'
import ButtonWithSpinner from '@/app/ui/button/ButtonWithSpinner'
import Rating from '@/app/ui/rating/Rating'
import ReviewImg from '@/app/ui/homePage/profile/reviews/ReviewImg'
import { Review } from '@/lib/definations'
import { formatDate } from '@/lib/helpers'
import { useState } from 'react';
import { toast } from 'sonner'


const ReviewCard = ({item}: {item : Review}) => {
    const [loading, setLoading] = useState(false);
    
    const handleDelete = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        setLoading(true)
        const formData = new FormData(e.currentTarget);
        const res = await reviewDelete(formData)
        if(res.success){
            setLoading(false)
            toast.success(res.success)
        }else {
            setLoading(false)
            if(res.error) toast.success(res.error)
        }
    }
 
  return (
    <div className='my-6 border-b border-gray-200' >
        <div className='flex justify-between'>
            <div className='flex justify-start items-center bg-gray-200 w-max pr-6 rounded-lg gap-1'>
                <div className='w-6 h-6 rounded-full bg-green-500 flex justify-center items-center p-1 text-[16px] text-white font-bold'>{item.name.slice(0, 1)}</div>
                <p className='text-[14px]'>{item.name}</p>
            </div>

            <div className='flex justify-center items-center gap-2 text-[12px] text-gray-400'>
                <p>{formatDate(item.createdAt)}</p>
                <p className='max-sm:hidden'>{item.createdAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
            </div>

            <div>
                <form onSubmit={handleDelete}>
                    <input type="text" readOnly name='id' value={item.id} className='hidden' />
                    <input type="text" readOnly name='productId' value={item.productId} className='hidden' />
                    <input type="text" readOnly name='rating' value={item.rating} className='hidden' />
                    <div className='w-20 h-8'>
                        <ButtonWithSpinner loading={loading}>
                            Delete
                        </ButtonWithSpinner>
                    </div>
                </form>
            </div>
        </div>
        <div className='my-2'><Rating rating={item.rating} /></div>
        <div>
            <p className='text-gray-500 text-[14px] leading-none'>{item.message}</p>
        </div>
        <div className='my-4 flex gap-2'>
            {item?.images?.map((item,i)=>(
            <ReviewImg img={item} key={i}/>
            ))}
        </div>
    </div>
         
  )
}

export default ReviewCard