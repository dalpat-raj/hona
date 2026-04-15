import Image from 'next/image';
import React, { useState } from 'react'
import { ImageSkeleton } from '@/app/ui/skeletons';

const ReviewImg = ({img}: {img: string}) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className='w-[70px] h-[70px]'>
        {imageLoading && <ImageSkeleton/>}
        <Image
        src={img}
        alt={img + 1 }
        width={0}
        height={0}
        sizes='100vw'
        style={{width: '100%', height: '100%', objectFit: 'cover' }}
        onLoad={()=>setImageLoading(false)}
        />
    </div>
  )
}

export default ReviewImg