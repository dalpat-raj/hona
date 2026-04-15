"use client"
import { userProfileOption } from '@/lib/placeholder_data'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { LogoutButton } from '@/app/ui/homePage/auth/logout-button'

type Props = {}

const NavLinks = (props: Props) => {
    const pathname = usePathname();
    
  return (
    <div className='h-full relative'>
    {
        userProfileOption.map((item, i)=>{
            const LinkIcon = item.icon;
            return (
                <Link href={item.url} key={i}>
                <div className={clsx("flex justify-start gap-2 items-center font-bold text-blue text-[15px] transition duration-75 ease-in-out delay-75 px-2 py-3 cursor-pointer hover:bg-gray-100",{
                    'bg-gray-100 text-gray-500 transition duration-75 ease-in-out delay-75': pathname == item.url
                })}>
                    <div><LinkIcon size={20}/></div>
                    <p className='text-[14px] font-semibold'>{item.title}</p>
                </div>
                </Link>
            )
        })
    }
    <div className='absolute bottom-2 left-0 w-full flex justify-start gap-2 items-center font-bold text-blue text-[15px] transition duration-75 ease-in-out delay-75 px-2 py-3 cursor-pointer hover:bg-gray-100'>
        <LogoutButton>
            <div className="flex justify-start gap-2 items-center text-gray-500">
              <div className='test-black'><AiOutlineLogout size={20}/></div>
              <button type='submit' className='text-[14px] font-semibold'>LogOut</button>
              <input type="text" name="logout" readOnly value={"Logout"} className='hidden'/>
            </div>
          </LogoutButton>
    </div>
    </div>
  )
}

export default NavLinks


