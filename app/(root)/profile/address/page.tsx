import dynamic from 'next/dynamic';

import { getCurrentUser } from "@/lib/auth";
const Addresses = dynamic(()=> import('@/app/ui/homePage/profile/address/Address'), {loading:()=><LoaderBall/>})
import LoaderBall from '@/app/ui/loader/BallLoader';

const page = async() => {
  const user = await getCurrentUser();
  
  return (
    <Addresses user={user}/>
  )
}

export default page