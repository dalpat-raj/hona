'use client';

import { useEffect, useState } from 'react';
import Pagination from '@/app/(dashboard)/dashboard/pagination/Pagination';
import { useSearchParams } from 'next/navigation';
import TopNav from '@/app/ui/dashboard/orders/TopNav';
import OrderCard from '@/app/ui/dashboard/orders/OrderCard';
import LoaderBall from '@/app/ui/loader/BallLoader';
import { toast } from 'sonner';


const AllOrders = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const limit = 6;
  

  const [orderType, setOrderType] = useState<string>('Order Confirmed')
  const [isFetching, setIsFetching] = useState(false);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchOrders = async (currentPage: number) => {
    if (isFetching) return;

    setIsFetching(true);
    const query = new URLSearchParams();
    if(orderType) query.append('status', orderType);
    query.append('page', currentPage.toString());
    query.append('limit', limit.toString());
    
    try {
      const response = await fetch(`/api/createOrder?${query.toString()}`, { method: 'GET' });
      const {orders, totalOrders, error} = await response.json();
      if(error){
        toast.error(error?.error);
      }
      setOrders(orders);      
      setTotalPages(Math.ceil(totalOrders / limit));
    } catch (error) {
      console.log(error);
      
      toast.error('An unexpected error occurred');
    } finally {
      setIsFetching(false);
    }
  };

  
  useEffect(() => {
    fetchOrders(page);
  }, [page, orderType]);

  if(isFetching){
    return (
      <LoaderBall/>
    )
  }
  

  return (
    <div className="">

      <div className='bg-gray-100'>
        <TopNav orderType={orderType} setOrderType={setOrderType}/>
      </div>

      <div className="py-2 shadow-lg mb-4">
        <div className="grid grid-cols-8 max-sm:grid-cols-4 px-4">
          <div className="col-span-1 text-[14px] font-semibold">Id</div>
          <div className="col-span-1 text-[14px] font-semibold max-sm:hidden">Name</div>
          <div className="col-span-1 text-[14px] font-semibold">Price</div>
          <div className="col-span-1 text-[14px] font-semibold max-sm:hidden">Payment</div>
          <div className="col-span-1 text-[14px] font-semibold">Date</div>
          <div className="col-span-2 max-sm:col-span-1 text-[14px] font-semibold">Status</div>
          <div className="col-span-1 text-[14px] font-semibold max-sm:hidden">Action</div>
        </div>
      </div>

      <div className="px-2">
        {orders?.map((item, i) => (
          <OrderCard order={item} key={i} />
        ))}
      </div>

      <div className="w-full">
        <div className="absolute bottom-3 right-12 max-lg:right-4 max-md:right-4 max-sm:right-2 bg-white p-2">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default AllOrders;



