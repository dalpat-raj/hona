"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { ImageSkeleton } from '../../skeletons'

const BrandImage = ({image}: {image: string}) => {
    const [imgLoding, setImgLoading] = useState<boolean>(true)

  return (
    <div className='w-[50px] h-[50px]'>
        {imgLoding && <ImageSkeleton/>}
        <Image
        src={image}
        alt={image + 1}
        width={0}
        height={0}
        sizes='100vw'
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
        onLoad={()=>setImgLoading(false)}
        />
    </div>
  )
}

export default BrandImage