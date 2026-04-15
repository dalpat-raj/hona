import { getAdminBrands } from '@/lib/data';
import React from 'react'
import BrandDelete from './BrandDelete';
import BrandEdit from './BrandEdit';
import BrandImage from './BrandImage';


const Brand = async() => {

    const brands = await getAdminBrands();
    
  return (
    <>
    {brands?.length >= 1 ? (
        <div className='p-4 relative flex justify-start gap-4 flex-wrap items-center bg-white'>
        {
            brands?.map((item, i)=>(
                <div className='border border-gray-200 rounded-lg p-4 w-full flex justify-between items-center' key={i}>
                    <BrandImage image={item?.image}/>
                        <p>{item?.title}</p>
                    <div className='flex items-center gap-2'>
                        <BrandEdit items={item}/>
                        <BrandDelete id={item?.id} />
                    </div>
                </div>
            ))
        }
    </div>
    ) : (
        <div>

        </div>
    )}

    </>
  )
}

export default Brand