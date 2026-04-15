
import { OrderCountAdmin } from "@/lib/data"
import { RingChart } from "./RingChart"

export const description = "A donut chart with text"

export const ChartOrderWrapper = async ()=>{
  const data = await OrderCountAdmin()
  
  return <RingChart data={data}/>
}


