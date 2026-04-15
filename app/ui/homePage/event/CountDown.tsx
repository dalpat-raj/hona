'use client'
import React, { useEffect, useState } from 'react'

type Props = {}

const CountDown = ({endDates}: {endDates: Date}) => {

    const endDate = new Date(endDates).getTime(); 
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
  
    useEffect(() => {
      setTimeLeft(endDate - Date.now());
      const timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft === null) return null; 
          return prevTimeLeft - 1000; 
        });
      }, 1000);
  
      return () => clearInterval(timer);
    }, [endDate]);

    if (timeLeft === null) {
      return null;
    }
  
    const formatTimeLeft = (time: number) => {
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((time % (1000 * 60)) / 1000);
      return {
        days: String(days).padStart(2, '0'), 
        hours: String(hours).padStart(2, '0'), 
        minutes: String(minutes).padStart(2, '0'), 
        seconds: String(seconds).padStart(2, '0'), 
      };
    };
  
    const {days, hours, minutes, seconds } = formatTimeLeft(timeLeft);
  return (
    <div>
        {timeLeft > 0 ? (
           <div className='flex gap-2'>
            <div className=' '>
                <p className='text-[14px] font-semibold p-2 bg-blackOverlay w-[40px] rounded-md text-white flex justify-center items-center'>{days}</p>
                <p className='text-[12px] text-center'>Day</p>
            </div>
            <div className=' '>
                <p className='text-[14px] font-semibold p-2 bg-blackOverlay w-[40px] rounded-md text-white flex justify-center items-center'>{hours}</p>
                <p className='text-[12px] text-center'>Hour</p>
            </div>
            <div className=' '>
                <p className='text-[14px] font-semibold p-2 bg-blackOverlay w-[40px] rounded-md text-white flex justify-center items-center'>{minutes}</p>
                <p className='text-[12px] text-center'>Minuts</p>
            </div>
            <div className=' '>
                <p className='text-[14px] font-semibold p-2 bg-blackOverlay w-[40px] rounded-md text-white flex justify-center items-center'>{seconds}</p>
                <p className='text-[12px] text-center'>Second</p>
            </div>
           </div>
            ) : (
            <span className='text-red-500'>Event has ended</span>
            )}
    </div>
  )
}

export default CountDown