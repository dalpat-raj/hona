import dynamic from "next/dynamic"
import LoaderBall from "@/app/ui/loader/BallLoader"

const Orders = dynamic(()=> import('@/app/ui/homePage/profile/orders/Orders'), {loading:()=> <LoaderBall/>})

const page = () => {
  return (
    <Orders/>
  )
}

export default page