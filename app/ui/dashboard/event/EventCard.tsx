import { AllEventData } from '@/lib/definations'
import { formatDate } from '@/lib/helpers'
import React from 'react'

type EventProps = {
    AllEvents: AllEventData | any,
}

const EventCard: React.FC<EventProps> = ({AllEvents}) => {
    
  return (
    <div className='border border-gray-200 mb-4 p-2 rounded-md'>
        <div className='w-full grid grid-cols-7 items-center max-sm:grid-cols-4 gap-2'>
            <div className=''>
                <p className='text-[13px] text-gray-900'>#{AllEvents.id}</p>
            </div>
            <div className='col-span-2 max-sm:col-span-2'>
                <p className='text-[14px] text-gray-800'>{AllEvents.title.slice(0,35)}</p>
            </div>
            <div className='max-sm:hidden'>
                <p className='text-[13px] text-gray-700'>{AllEvents.products.length}</p>
            </div>
            <div className='max-sm:hidden'>
                <p className='text-[13px] text-gray-700 max-sm:hidden'>{formatDate(AllEvents.createdAt)}</p>
            </div>
            <div className='max-sm:hidden'>
                <p className='text-[13px] text-gray-700 max-sm:hidden'>{formatDate(AllEvents.endDate)}</p>
            </div>
            <div className=''>
                <button className='text-[13px] text-white bg-[#333] py-1 px-4 rounded-sm'>View</button>
            </div>

        </div>
    </div>
  )
}

export default EventCard