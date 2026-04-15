import dynamic from 'next/dynamic';
import { OrderDetailsSkeleton } from '@/app/ui/skeletons';
const OrderDetail = dynamic(()=>import("@/app/ui/dashboard/orders/orderDetails/OrderDetail"), {loading:()=><OrderDetailsSkeleton/>})


const page = ({ params }: { params: { id: number } }) => {
  const id = params.id;
  return (
      <OrderDetail id={id}/>
  )
}

export default page