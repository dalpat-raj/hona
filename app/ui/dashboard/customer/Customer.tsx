import { getCustomers } from '@/lib/data'
import React from 'react'
import CustomerCard from './CustomerCard.';



const Customer = async () => {
    const customers = await getCustomers();
    
  return (
    <div className='p-4 mt-4'>
        <div className='grid grid-cols-8 gap-4'>
        {
            customers?.map((customer,i)=>(
                <CustomerCard customer={customer} key={i}/>
            ))
        }
        </div>
    </div>
  )
}

export default Customer