import Link from 'next/link'
import React from 'react'

const ErrorCard = () => {
  return (
    <div>
        <div>
            <Link href={"/auth/sign-in"}><button className='px-4 py-2 bg-[#333] text-white'>Back</button></Link>
        </div>
    </div>
  )
}

export default ErrorCard