import dynamic from 'next/dynamic';
import LoaderBall from '@/app/ui/loader/BallLoader'
const ReviewsUi = dynamic(()=> import("@/app/ui/dashboard/reviews/Reviews"), {loading:()=> <LoaderBall/>});


const page = async() => {
  
  return (
     <div>
       <ReviewsUi/>
     </div>
  )
}

export default page