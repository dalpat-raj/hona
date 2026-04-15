import dynamic from "next/dynamic"
import LoaderBall from "@/app/ui/loader/BallLoader"
const AllOrders = dynamic(()=>import('@/app/ui/dashboard/orders/AllOrders'),{loading:()=><LoaderBall/>})

const page = () => {
  return (
    <AllOrders/>
  )
}

export default page