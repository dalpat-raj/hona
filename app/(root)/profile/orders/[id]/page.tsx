import dynamic from "next/dynamic"
import LoaderBall from "@/app/ui/loader/BallLoader"

const OrderDetails = dynamic(()=> import('@/app/ui/homePage/profile/orders/orderDetails/OrderDetails'), {loading:()=><LoaderBall/>}) 

const page = ({params} : {params : {id: number}}) => {
    const id = params.id
    
  return (
      <OrderDetails id={id}/>
  )
}

export default page