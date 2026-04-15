import { getOrderDetails } from '@/lib/data'
import Summary from '@/app/ui/dashboard/orders/orderDetails/orderSummary/Summary';
import Items from '@/app/ui/dashboard/orders/orderDetails/OrderItems/Items';
import User from '@/app/ui/dashboard/orders/orderDetails/OrderUser/User';
import DownloadInvoice from '@/app/ui/dashboard/orders/orderDetails/orderInvoice/DownloadInvoice';
import Status from '@/app/ui/dashboard/orders/orderDetails/orderStatus/Status';
import Addresses from '@/app/ui/dashboard/orders/orderDetails/DeliveryAddress/Address';
import { TiMessages } from "react-icons/ti";


const OrderDetail = async ({id}:{id:number}) => {
   const {order, address} = await getOrderDetails(id)
   
  return (
    <div className='p-4 h-full'>
        <div className='grid grid-cols-5 grid-row-12 gap-6 h-full max-md:grid-cols-2 max-sm:flex flex-col'>

            <div className='bg-gray-50 col-span-4 row-span-1 p-2 rounded-lg shadow-custom-shadow max-md:col-span-2'>
                <div className='flex justify-start items-center gap-4'>
                    <h2 className={`flex gap-2 text-[16px] font-bold text-gray-800`}>Order Number <p>#{order?.id}</p></h2>
                    <button className='flex items-center gap-1 bg-[#333] py-1 px-2 rounded-lg text-[14px] text-gray-100'><TiMessages size={18}/>Message Customer</button>
                </div>
            </div>

            <div className='bg-gray-50 col-span-1 row-span-3 p-2 rounded-lg shadow-custom-shadow max-md:col-span-1 max-md:col-start-1 max-md:row-start-9'>
                <div className=''>
                    <h2 className='text-[16px] font-bold text-gray-800'>Payment</h2>
                    <p className='text-[14px] font-semibold text-gray-600'>Cash</p>
                    <p className='text-[14px] font-semibold text-gray-600'>status</p>
                </div>
            </div>

            <div className='bg-gray-50 col-span-2 row-span-4 p-2 rounded-lg shadow-custom-shadow max-md:col-span-1  max-md:row-start-2'>
                <Summary order={order}/>
            </div>

            <div className='bg-gray-50 col-span-2 row-span-4 p-2 rounded-md shadow-custom-shadow max-md:col-span-1 max-md:row-start-2 max-md:col-start-2'>
                <Addresses address={address}/>
            </div>

            <div className='bg-gray-50 col-span-1 row-span-1 rounded-lg shadow-custom-shadow overflow-hidden max-md:col-span-1 max-md:row-start-7 max-md:row-span-1'>
                <DownloadInvoice/>
            </div>

            <div className='bg-gray-50 col-span-1 row-span-1 rounded-lg shadow-custom-shadow overflow-hidden max-md:col-span-1 max-md:row-span-1'>
                <Status order={order} />
            </div>

            <div className='bg-gray-50 col-span-4 row-span-7 p-2 rounded-lg shadow-custom-shadow max-md:col-span-2'>
                <Items order={order}/>
            </div>

            <div className='bg-gray-50 col-span-1 p-2 rounded-lg shadow-custom-shadow max-md:col-span-1 max-md:row-span-2 max-md:row-start-6  max-md:col-start-2'>
                <User users={order?.user ?? null} address={address}/>
            </div>
        </div>
    </div>
  )
}

export default OrderDetail