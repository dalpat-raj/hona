import Collections from '@/app/ui/collections/Collections'
import { CollectionsSkeletons } from '@/app/ui/skeletons';
import React, { Suspense } from 'react'


const page = async () => {
  
  return (
    <div className='w-full my-12 max-md:my-8 max-sd:my-4 px-12 max-md:px-4 max-sm:px-2'>
        <Suspense fallback={<CollectionsSkeletons/>}>
          <Collections/>
        </Suspense>
    </div>
  )
}

export default page