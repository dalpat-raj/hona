import React from 'react'
import { Collections } from '@/lib/definations'
import Image from 'next/image'
import Link from 'next/link'


interface CollectionProps {
    collections: Collections;
  }

const CollProdCard: React.FC<CollectionProps> = ({collections}) => {
    const imageUrl1 = collections?.image
    
  return (
    <Link href={`/collections/${collections?.title}`}>
      <div className='collll h-[50vh] max-sm:h-[30vh] relative rounded-lg overflow-hidden'>
        <div className=''>
            <Image
                src={imageUrl1}
                alt={imageUrl1}
                width={0}
                height={0}
                sizes='100vw'
                style={{width: "100%", height: "100%", objectFit: 'cover'}}
            />
        </div>
        <div className='second transition duration-200 ease-in delay-200 h-full w-full bg-blackOverlay absolute top-0 left-0 flext items-center justify-center '>
            <p className='text-[28px] text-white  font-bold absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>{collections?.title}</p>
        </div>
      </div>
    </Link>
  )
}

export default CollProdCard