import { caveat } from '@/app/ui/Fonts'
import {  getCollections } from '@/lib/data'
import CollectionCarousel from '@/app/ui/collections/CollectionCarousel'



const Collections = async () => {
  const collections = await getCollections();
  
  return (
    collections?.length >= 1 && (
      <div className='w-full my-8 max-md:my-8 max-sd:my-4 px-12 max-md:px-4 max-sm:px-2'>
        <div className='text-center mb-8'>
            <h2 className={` text-[28px] max-sm:text-[22px] font-bold`}>Our Collections</h2>
        </div>
        <div className='w-full'>
            <CollectionCarousel collections={collections} />
        </div>
      </div>
    )
  )
}

export default Collections