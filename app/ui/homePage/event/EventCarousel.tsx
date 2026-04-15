'use client'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { AllEventData } from '@/lib/definations'
import ProductCard from '@/app/ui/product/ProductCard'

type Props = {}

const EventCarousel = ({event}: {event: AllEventData | any}) => {
  return (
    <Carousel plugins={[
        Autoplay({
          delay: 2000,
        }),
        ]} 
        className="w-full">
        <CarouselContent className="-ml-1">
          {event?.products.map((item: any, index: number) => (
            <CarouselItem key={index} className="pl-1 max-sm:basis-4/6 max-md:basis-2/6 max-lg:basis-1/3 lg:basis-1/4 ">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6 max-sm:p-2">
                    <div className='w-full h-auto'>
                    <ProductCard prod={item?.product}/>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
  )
}

export default EventCarousel