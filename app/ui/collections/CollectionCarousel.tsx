'use client'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Collections } from '@/lib/definations'
import CollProdCard from './CollProdCard'

interface CollctionProps {
  collections: Collections[];
}

const CollectionCarousel: React.FC<CollctionProps> = ({collections}) => {
    
    return (
    <Carousel plugins={[
        Autoplay({
          delay: 3000,
        }),
        ]} 
        className="w-full">
        <CarouselContent className="-ml-1">
          {collections?.map((item, index) => (
            <CarouselItem key={index} className="pl-1 max-sm:basis-4/6 max-md:basis-2/6 max-lg:basis-1/3 lg:basis-1/4 ">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-0">
                    <div className='w-full h-auto'>
                    <CollProdCard collections={item}/>
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

export default CollectionCarousel