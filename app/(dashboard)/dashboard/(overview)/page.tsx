import { CardsSkeleton, ChartjsSkeleton } from '@/app/ui/skeletons'
import dynamic from 'next/dynamic'
const CardWrapper = dynamic(()=>import('@/app/ui/dashboard/overView/cards'), {loading:()=><CardsSkeleton/>})
const RevenueWrapper = dynamic(()=>import('@/app/ui/dashboard/overView/RevenueWrapper'), {loading:()=><ChartjsSkeleton/>})
import { ChartOrderWrapper } from '@/app/ui/dashboard/overView/RingWrapper';



const page = () => (
  <main className='h-full bg-bga  p-4 mt-4 overflow-scroll no-scrollbar'>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <CardWrapper />
    </div>

    <div className="mt-8 grid grid-cols-6 gap-6 max-lg:gap-0 max-lg:grid-cols-1 ">
      <div className="w-full col-span-4 bg-white rounded-xl">
        <RevenueWrapper />
      </div>
      <div className='col-span-2 max-lg:col-span-1 w-full max-lg:mt-6 bg-white rounded-xl'>
        <ChartOrderWrapper />
      </div>
    </div>

  </main>
)

export default page