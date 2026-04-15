'use client'
import { orderStatusChange } from '@/action/order';
import ButtonWithSpinner from '@/app/ui/button/ButtonWithSpinner';
import { UserOrders } from '@/lib/definations'
import React, { useState } from 'react'
import { toast } from 'sonner';


type Props = {
  order: UserOrders | null,
};

const Status = ({order}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    setIsLoading(true)
    const formData = new FormData(event.currentTarget); 
    try {
      const res = await orderStatusChange(formData);
      if(res.success) toast.success(res.success)
      if(res.error) toast.success(res.error)
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false)
    }
  };



  return (
    <div className='w-full'>
        <form onSubmit={handleSubmit}>
            <div className='w-full'>
            <select name="status" className='bg-gray-100 focus:outline-0 py-1 px-4 text-[14px] font-semibold border border-gray-300 w-full rounded-lg mb-2'>
                <option value={order?.status}>{order?.status}</option>
                <option value="pickup">pickup</option>
                <option value="shipped">shipped</option>
                <option value="delivered">delivered</option>
                <option value="cancled">cancled</option>
                <option value="refunded">refunded</option>
            </select>
            <input 
            type="number" 
            name='id' 
            defaultValue={order?.id}
            className='hidden'
            />
            </div>
            <div className='h-8'>
              <ButtonWithSpinner loading={isLoading}>
                Submit
              </ButtonWithSpinner>
            </div>
        </form>
    </div>
  )
}

export default Status