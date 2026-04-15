import dynamic from 'next/dynamic'
import LoaderBall from '@/app/ui/loader/BallLoader'
const Event = dynamic(()=> import("@/app/ui/dashboard/event/Event"), {loading:()=> <LoaderBall/>});


const page = () => {
  return (
    <Event/>
  )
}

export default page