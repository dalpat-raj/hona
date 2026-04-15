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
import { sideNavData } from '@/lib/placeholder_data'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'


const DropDown = () => {
    const pathname = usePathname();
  return (
    <DropdownMenu>
    <DropdownMenuTrigger className='w-[33px] h-[33px] hidden max-md:block outline-none rounded-full absolute top-0 left-0 py-1 z-50'></DropdownMenuTrigger>
    <DropdownMenuContent className='mr-8 px-2'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {
            sideNavData.map((item, i)=>{
                const LinkIcon = item.icon;
                return (
                    <DropdownMenuItem key={i}>
                    <Link href={item.url}>
                    <div className={clsx("flex justify-start gap-4 items-center text-gray-500",{
                        'text-[#ffc029] text-[16px] font-semibold': pathname === item.url
                    })}>
                        <div className='test-black'><LinkIcon size={20}/></div>
                        <p className='text-[14px] '>{item.title}</p>
                    </div>
                    </Link>
                    </DropdownMenuItem>
                )
            })
        }
    </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default DropDown