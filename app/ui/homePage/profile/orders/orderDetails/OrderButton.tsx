'use client'
import {  OrderSingleItem, User } from '@/lib/definations'
import React, { useEffect, useState } from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { IoChatbubblesOutline } from "react-icons/io5"
import ReviewForm from './OrderReview' 


type OrderProps = {
  user: User | null;
  item: OrderSingleItem;
}

export const RatingButton: React.FC<OrderProps> = ({user, item}) => {
  const [reviewBox, setReviewBox] = useState<boolean>(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 

  const fetchReviews = async () => {
    if (item?.id) {
      try {
        const response = await fetch(`/api/reviews?productId=${item.productId}`);
        const data = await response.json();
        setReviews(data); 
        setLoading(false);  
      } catch (error) {
        setLoading(false); 
      }
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);
  return (
    <div >
      <button onClick={()=>setReviewBox(!reviewBox)} className='flex gap-2 items-center text-[14px] py-1 text-[rgb(31,56,185)] font-semibold'><AiOutlineStar size={18}/> Rate & Review Product</button>
      <button className='flex gap-2 items-center text-[14px] py-1'><IoChatbubblesOutline size={18}/> Chat with us</button>

      {
          reviewBox && (
              <div className='h-full w-full fixed top-0 left-0 bg-blackOverlay flex justify-center items-center z-50'>
                  <div className='bg-white h-auto w-auto max-sm:h-full max-sm:w-full overflow-scroll no-scrollbar'>
                    <ReviewForm setReviewBox={setReviewBox} user={user} item={item} reviews={reviews}/>
                  </div>
              </div>
          )
      }

    </div>
  )
}

