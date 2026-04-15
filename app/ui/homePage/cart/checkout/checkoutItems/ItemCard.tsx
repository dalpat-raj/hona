import { useState } from 'react'
import { CartItem } from '@/lib/definations';
import Image from 'next/image';
import { ImageSkeleton } from '@/app/ui/skeletons';


const ItemCard = ({item}: {item: CartItem}) => {
 const [imageLoading, setImageLoading] = useState(true);
    

  return (
        <div className='flex justify-between items-center gap-4 mb-4'>
            <div className='flex justify-start items-center gap-4'>
                <div className='relative'>
                <div className='w-[60px] h-[70px] rounded-lg overflow-hidden'>
                    {imageLoading && <ImageSkeleton/>}
                    <Image
                        src={item.image}
                        alt={item.title}
                        width={0}
                        height={0}
                        sizes='100vw'
                        style={{width: '60px', height: '70px', objectFit: 'cover'}}
                        onLoad={()=>setImageLoading(false)}
                    />
                </div>
                <div className='w-5 h-5 absolute -right-1 -top-2 bg-blackOverlay flex justify-center items-center rounded-full'>
                <p className='text-white text-[12px]'>{item.quantity}</p>
                </div>
                </div>
                <p className='text-gray-600 text-[14px]'>{item.title}</p>
            </div>
            <div>
                <p className='text-gray-700 text-[16px]'>Rs. {item.price.toFixed(2)}</p>
            </div>
        </div>
  )
}

export default ItemCard