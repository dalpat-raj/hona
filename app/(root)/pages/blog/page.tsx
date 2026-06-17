import dynamic from 'next/dynamic';
import { getBlog } from '@/lib/data'
import LoaderBall from '@/app/ui/loader/BallLoader';
const Blogs = dynamic(()=> import('@/app/ui/blogs/Blogs'), {loading:()=><LoaderBall/>})
import React from 'react'

const page = async() => {
  const {data, error} = await getBlog();
  return (
    <Blogs blogs={data}/>
  )
}

export default page