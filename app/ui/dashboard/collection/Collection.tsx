import { getAdminCollctions } from '@/lib/data';
import React from 'react'
import CollectionDelete from './CollectionDelete';
import CollectionEdit from './CollectionEdit';
import CollectionImage from './CollectionImage';


const Collection = async() => {

    const collections = await getAdminCollctions();
    
  return (
    <div className='p-4 relative flex justify-start gap-4 flex-wrap items-center bg-white'>
        {
            collections?.map((item, i)=>(
                <div className='border border-gray-200 rounded-lg p-4 w-full flex justify-between items-center' key={i}>
                    <CollectionImage image={item?.image}/>
                        <p>{item?.title}</p>
                    <div className='flex items-center gap-2'>
                        <CollectionEdit items={item}/>
                        <CollectionDelete id={item?.id} />
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default Collection