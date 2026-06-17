import Profile from '@/app/ui/homePage/profile/Profile'
import { getCurrentUser } from "@/lib/auth";

const page = async() => {
  const user = await getCurrentUser();
  
  return (
    <Profile user={user}/>
  )
}

export default page