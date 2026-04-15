"use client"
import React, { useState } from 'react'
import { Review } from '@/lib/definations'
import { adminReviewDelete } from '@/action/reviews'
import { formatDate } from '@/lib/helpers'
import { toast } from 'sonner'
import ButtonWithSpinner from '@/app/ui/button/ButtonWithSpinner'
import Rating from '@/app/ui/rating/Rating'
import ReviewImg from './ReviewImg'

const ReviewsCard = ({reviews}: {reviews: Review}) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const res = await adminReviewDelete(formData);
        if(res?.success){
            setLoading(false)
            toast.success(res.success)
        }else {
            setLoading(false)
            if(res?.error) toast.success(res.error)
        }
    }

  return (
    <div className='mb-6 border-b border-gray-200 pb-4'>
        <div className='flex justify-between'>
            <div className='flex justify-start items-center bg-gray-200 w-max pr-6 rounded-lg gap-1'>
                <div className='w-6 h-6 rounded-full bg-green-500 flex justify-center items-center p-1 text-[16px] text-white font-bold'>{reviews.name.slice(0, 1)}</div>
                <p className='text-[14px]'>{reviews.name}</p>
            </div>

            <div className='flex justify-center items-center gap-2 text-[12px] text-gray-400'>
                <p>{formatDate(reviews.createdAt)}</p>
                <p>{reviews.createdAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
            </div>

            <div>
                <form onSubmit={handleDelete}>
                    <input type="text" readOnly name='id' value={reviews.id} className='hidden' />
                    <input type="text" readOnly name='productId' value={reviews.productId} className='hidden' />
                    <input type="text" readOnly name='rating' value={reviews.rating} className='hidden' />
                    <div className='w-24 h-8'>
                        <ButtonWithSpinner loading={loading}>
                            Deleted
                        </ButtonWithSpinner>
                    </div>
                </form>
            </div>
        </div>
        <div className='my-2'><Rating rating={reviews.rating} /></div>
        <div>
            <p className='text-gray-500 leading-none'>{reviews.message}</p>
        </div>
        <div className='my-4 flex gap-2'>
            {reviews?.images?.map((item,i)=>(
            <ReviewImg img={item} key={i}/>
            ))}
        </div>
    </div>
          
  )
}

export default ReviewsCard