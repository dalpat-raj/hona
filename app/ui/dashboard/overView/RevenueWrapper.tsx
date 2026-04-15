import { getMonthlyRevenueLast12Months } from '@/lib/data'
import React from 'react'
import RevenueChart from './RevenueChart';


const RevenueWrapper = async () => {
    // const data = await getMonthlyRevenueLast12Months();    
    const data = [];
    
  return (
    <RevenueChart data={data}/>
    // <RevenueChart />
  )
}

export default RevenueWrapper