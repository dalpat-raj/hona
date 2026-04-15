import dynamic from 'next/dynamic';
import LoaderBall from '@/app/ui/loader/BallLoader'
const Coupon = dynamic(()=> import("@/app/ui/dashboard/coupon/Coupon"), {loading:()=> <LoaderBall/>});



const page = () => {
  return (
    <Coupon/>
  )
}

export default page