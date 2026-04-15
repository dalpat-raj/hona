import { getMyOrders } from '@/lib/data';
import OrderCard from '@/app/ui/homePage/profile/orders/OrderCard';




const Orders = async() => {
    const session = await auth()
    const orders = await getMyOrders(session?.user?.id as string);
      

  return (
    <div className='h-full'>
        <div className='px-2 py-4'>
        {
            orders.map((item,i)=>(
                <div key={i}>
                      
                </div>
            ))
            }
        </div>
    </div>
  )
}

export default Orders