import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineMailOutline, MdOutlineWifiCalling3  } from "react-icons/md";

const page = () => {
  return (
    <div >
        <div className='privacy-policy w-full px-32 py-12 pr-0 max-md:px-4 max-sm:px-2 bg-bgg flex justify-between items-center max-lg:flex-col max-lg:gap-6'>
            <div className='basis-[50%]'>
                <h2 className='text-[36px] max-lg:text-[24px] font-bold text-white max-lg:text-center' >CONTACT<br/>INFORMATION</h2>
            </div>
            <div className='text-white font-semibold flex flex-col gap-4 max-lg:text-[14px]'>
                <div className='flex justify-start items-center gap-4 '>
                    <IoHomeOutline size={22} className='shrink-0'/>
                    <p className='text-wrap max-lg:text-[12px]'>SF/224, RHYTHM PLAZA FLORA, AMAR JAWAN CIRCLE, S.P.RING ROAD, NIKOL, AHMEDABAD, GUJARAT, 382350</p>
                </div>
                <div className='flex justify-start items-center gap-4'>
                    <MdOutlineMailOutline size={22}/>
                    <p>frndtechnologyenovationpvtltd@gmail.com</p>
                </div>
                <div className='flex justify-start items-center gap-4'>
                    <MdOutlineWifiCalling3 size={22}/>
                    <div>
                        <p>Whatsapp:- 6356060606</p>
                        <p>Service:- 6356060606</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page