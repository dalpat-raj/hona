import Products from '@/app/ui/product/Products';
import { CollectionDataSkeletons } from '@/app/ui/skeletons';
import { Suspense } from 'react';


const page = ({ params }: { params: { title: string } }) => {
const titles = params?.title;


  return (
    <div className='w-full my-12 max-md:my-8 max-sd:my-4 px-12 max-md:px-4 max-sm:px-2'>
      <Suspense fallback={<CollectionDataSkeletons/>}>
       <Products titles={titles}/>
      </Suspense>
        
    </div>
  )
}

export default page