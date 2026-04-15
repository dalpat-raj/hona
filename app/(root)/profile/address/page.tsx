import dynamic from 'next/dynamic';

const Addresses = dynamic(()=> import('@/app/ui/homePage/profile/address/Address'), {loading:()=><LoaderBall/>})
import { getCurrentUser } from "@/lib/auth";
import LoaderBall from '@/app/ui/loader/BallLoader';

const page = async() => {
  const user = await getCurrentUser();
  
  return (
    <Addresses user={user}/>
  )
}

export default page