import dynamic from "next/dynamic"
import LoaderBall from "@/app/ui/loader/BallLoader"
import { getCurrentUser } from '@/lib/auth';

const Orders = dynamic(()=> import('@/app/ui/homePage/profile/orders/Orders'), {loading:()=> <LoaderBall/>})

const page = async() => {
  const user = await getCurrentUser()
  return (
    <Orders user={user}/>
  )
}

export default page