import dynamic from "next/dynamic"
const Reviews = dynamic(()=> import('@/app/ui/homePage/profile/reviews/Reviews'),{loading:()=><LoaderBall/>})
import LoaderBall from "@/app/ui/loader/BallLoader"

const page = () => {
  return (
    <Reviews/>
  )
}

export default page