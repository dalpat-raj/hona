import dynamic from 'next/dynamic';
import LoaderBall from '@/app/ui/loader/BallLoader';
const Collection = dynamic(()=> import("@/app/ui/dashboard/collection/Collection"), {loading:()=> <LoaderBall/>});


const page = () => {
  return (
    <Collection/>
  )
}

export default page