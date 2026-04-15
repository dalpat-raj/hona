import React from 'react';
import Image from 'next/image'
import NavLinks from './NavLinks';
import { getCurrentUser } from "@/lib/auth";


const SideNav = async() => {
    const user = await getCurrentUser();
  return (
    <div className='flex flex-col gap-6 max-sm:block'>
            <div className='bg-white shadow-custom-shadow rounded-md flex items-center gap-2 p-2 py-3'>
                <div className='rounded-full overflow-hidden'>
                    <Image
                    src={"/imageLoading.jpg"}
                    alt='avatar'
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{width: "50px", height: "50px", objectFit: "cover"}}
                    />
                </div>
                <div>
                    <p className='text-[12px] font-semibold text-blue'>Hello,</p>
                    <p className='text-[16px] font-bold text-blue'>{user?.name}</p> 
                </div>
            </div>

            <div className='h-[57vh] bg-white shadow-custom-shadow rounded-md max-md:hidden'>
                <NavLinks/>
            </div>
        
        
    </div>
  )
}

export default SideNav
