import { getMyOrders } from '@/lib/data';
import { UserProfile } from '@/lib/definations';
import OrderCard from './OrderCard';

interface UserProps {
  user: UserProfile | any;
}



const Orders: React.FC<UserProps> = async({user}) => {
    const orders = await getMyOrders(user?.id as string);
    
  return (
    <div className='h-full'>
        <div className='px-2 py-4'>
        {
            orders.map((item,i)=>(
                <div key={i}>
                    <OrderCard order={item}/>
                </div>
            ))
            }
        </div>
    </div>
  )
}

export default Orders