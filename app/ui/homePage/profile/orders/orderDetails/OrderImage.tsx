"use client"
import { useState } from 'react'
import Image from 'next/image'
import { ImageSkeleton } from '@/app/ui/skeletons'

const OrderImage = ({image}: {image: string}) => {
    const [imageLoading, setImageLoading] = useState(true);
  return (
    <div className='w-[120px] h-[110px] max-sm:w-[90px]  '>
        { imageLoading && <ImageSkeleton/>}
        <Image
            src={image}
            alt={image + 1}
            width={0}
            height={0}
            sizes='100vw'
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
            onLoad={()=>setImageLoading(false)}
        />
    </div>
  )
}

export default OrderImage