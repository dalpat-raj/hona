import dynamic from 'next/dynamic';
import LoaderBall from '@/app/ui/loader/BallLoader';
const Brand = dynamic(()=> import("@/app/ui/dashboard/brand/Brand"), {loading:()=> <LoaderBall/>});


const page = () => {
  return (
    <Brand/>
  )
}

export default page