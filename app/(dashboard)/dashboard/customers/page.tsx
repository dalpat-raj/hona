import dynamic from "next/dynamic"
import LoaderBall from "@/app/ui/loader/BallLoader"
const Customer = dynamic(()=>import('@/app/ui/dashboard/customer/Customer'), {loading:()=><LoaderBall/>}) 

const page = () => {
  return (
    <Customer/>
  )
}

export default page