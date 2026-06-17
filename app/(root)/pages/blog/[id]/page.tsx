import LoaderBall from '@/app/ui/loader/BallLoader';
import { getBlog, getBlogDetails } from '@/lib/data';
import dynamic from 'next/dynamic';
import React from 'react'
const BlogDetails = dynamic(()=> import('@/app/ui/blogs/BlogDetails'), {loading:()=><LoaderBall/>})

interface PageProps {
  params: {id: string };
}

const page = async({ params }: PageProps) => {
    const {id} = await params
    const blog = await getBlogDetails(id);
    const {data, error} = await getBlog(); 

  return (
    <BlogDetails blog={blog} blogs={data}/>
  )
}

export default page