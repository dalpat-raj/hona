import { getOrderDetails } from '@/lib/data'
import Image from 'next/image';
import { RatingButton } from '@/app/ui/homePage/profile/orders/orderDetails/OrderButton';
import OrderStatus from '@/app/ui/homePage/profile/orders/orderDetails/OrderStatus';
import { TbFileInvoice } from 'react-icons/tb';
import { formatDate } from '@/lib/helpers';
import OrderImage from './OrderImage';
import Link from 'next/link';

const OrderDetails = async({id}: {id: string}) => {
    const {order} = await getOrderDetails(id);    
    
    const {address, landmark, city, pinCode, state} = order.address ?? {} ;
    const {name, phone} = order.user ?? {} ;
    
 

  return (
    <div className='max-sm:px-0'>
        <div className='flex flex-col gap-6'>

            <div className='bg-white grid grid-cols-3 max-md:grid-cols-1 max-lg:shadow-none shadow-custom-shadow'>
                <div className='col-span-1 p-6 max-sm:px-4 border-r border-gray-100'>
                    <h2 className='text-[17px] capitalize font-bold'>Delivery Adderss</h2>
                    <p className='text-[14px] font-semibold py-2'>{name}</p>
                    <p className='text-[14px] text-gray-600'>{address +" "+ landmark +" "+ city} - {pinCode+" "+state}</p>
                    <div className='text-[14px] font-semibold pt-2'>Phone number <span className='text-gray-600 font-normal'>{phone}</span></div>
                </div>
                <div className='col-span-1 p-6 max-sm:px-4 border-r border-gray-100'>
                    <h2 className='text-[17px] capitalize font-bold'>Amount</h2>
                    <div className='flex justify-between items-center'>
                        <p className='text-[13px] text-gray-600 font-semibold'>Date -</p>
                        <p className='text-[13px] text-gray-700 py-1'>{formatDate(order?.createdAt)}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='text-[13px] text-gray-600 font-semibold'>Time -</p>
                        <p className='text-[13px] text-gray-700 py-1'>{order?.createdAt.toLocaleTimeString()}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='text-[13px] text-gray-600 font-semibold'>Subtotal -</p>
                        <p className='text-[13px] text-gray-700 py-1'>₹ {order?.subtotal}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='text-[13px] text-gray-600 font-semibold'>Shipping Charge -</p>
                        <p className='text-[13px] text-gray-700 py-1'>₹ {order?.shippingCharge}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='text-[15px] font-bold'>Total</p>
                        <p className='text-14px text-gray-800 font-semibold'>₹ {order?.totalAmount}</p>
                    </div>
                </div>
                <div className='col-span-1 p-6 max-sm:px-0'>
                    <h2 className='text-[17px] capitalize font-bold max-sm:px-4'>More actions</h2>
                    <div className='flex flex-wrap gap-4 justify-between items-center mt-2 max-sm:bg-gray-100 max-sm:py-2 max-sm:px-4'>
                        <div className='flex items-center gap-2 text-[14px]'><TbFileInvoice size={20}/> Download Invoice</div>
                        <button className='bg-bgg py-1 max-sm:py-2 px-4 text-[14px] text-white'><Link href={order?.shipment?.invoiceUrl} target="_blank">Download Invoice</Link></button>
                    </div>
                </div>
            </div>

            {
                order?.items?.map((item, i)=>(
                    <div className='bg-white grid grid-cols-4 max-md:grid-cols-1 max-sm:shadow-custom-shadow ' key={i}>
                        <div className='w-full col-span-1 p-6 max-sm:px-4 flex gap-2'>
                            <OrderImage image={item?.productImage}/>
                            <div>
                                <p className='text-[12px] max-sm:text-[14px]'>{item.productName}</p>
                                <p className='text-[12px] text-gray-500'>{item?.variant?.color}</p>
                                <p className='text-[12px] text-gray-500'>{item?.variant?.modelNumber}</p>
                                <p className='text-[15px] font-semibold'>₹{item?.variant?.sellingPrice}</p>
                            </div>
                        </div>
                        <div className='col-span-2 p-6 max-sm:px-4'>
                            <OrderStatus statusHistory={order?.statusHistory}/>
                        </div>
                        <div className='col-span-1 p-6 max-sm:px-4'>
                            <RatingButton user={order?.user} item={item}/> 
                        </div>
                    </div>
                ))
            }

        </div>
    </div>
  )
}

export default OrderDetails