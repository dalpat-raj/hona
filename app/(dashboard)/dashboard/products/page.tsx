import dynamic from "next/dynamic"
import LoaderBall from "@/app/ui/loader/BallLoader"
const Products = dynamic(()=> import('@/app/ui/dashboard/products/Products'), {loading: ()=> <LoaderBall/>})

export default function page(){
  return (
    <Products/>
  )
}