import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { userProfileOption } from '@/lib/placeholder_data'
import { AiOutlineLogout } from 'react-icons/ai'
import { LogoutButton } from '@/app/ui/homePage/auth/logout-button'


const DropDown = () => {

  return (
    <DropdownMenu>
    <DropdownMenuTrigger className='w-[33px] h-[33px] outline-none rounded-full absolute top-0 left-0 py-1 z-50'>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='mr-3 max-sm:mr-0 py-4 mt-3 max-sm:mt-1 max-sm:p-2 max-sm:pr-8'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {
            userProfileOption.map((item, i)=>{
                const LinkIcon = item.icon;
                return (
                  <Link href={item.url} key={i}>
                    <DropdownMenuItem className='my-4 max-sm:my-6 cursor-pointer'>
                    <div className="flex justify-start gap-4 items-center text-gray-500">
                        <div className='test-black'><LinkIcon size={20}/></div>
                        <p className='text-[14px] '>{item.title}</p>
                    </div>
                    </DropdownMenuItem>
                  </Link>
                )
            })
        }
        <DropdownMenuItem >
          <LogoutButton>
            <div className="flex justify-start gap-4 items-center text-gray-500">
              <div className='test-black'><AiOutlineLogout size={20}/></div>
              <button type='submit' className='text-[14px]'>LogOut</button>
              <input type="text" name="logout" readOnly value={"Logout"} className='hidden'/>
            </div>
          </LogoutButton>
        </DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default DropDown