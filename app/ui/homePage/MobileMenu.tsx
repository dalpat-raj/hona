"use client"
import { useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import Menu from './Menu';



const MobileMenu = () => {
    const [open, setOpen] = useState<boolean>(false)
  return (
    <div className=''>
        {
            open ? (
                <RxCross2
                size={25}
                onClick={()=>setOpen(!open)}
                />
            ) : (
                <AiOutlineMenu 
                size={25}
                onClick={()=>setOpen(!open)}
                />
            )
        }
        {
            open && <Menu />
        }
    </div>
  )
}

export default MobileMenu