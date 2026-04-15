"use client";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { BannerData } from "@/lib/definations";
import Image from "next/image";
import Link from "next/link";

export function CarouselHome({ banners }: { banners: BannerData[] }) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {banners?.map((item, index) => (
          <CarouselItem key={index}>
            <div className="w-full h-auto !bg-bga max-sm:h-[30vh] relative">
              <Image
                src={item.image}
                alt={item.url}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="absolute bottom-6 left-[50%] transform translate-x-[-50%]">
                <Link href={item.url}>
                  <button className="bg-btn shadow-[0_10px_25px_rgba(29,179,159,0.4)] py-2 px-4 text-white font-semibold hover:scale-[1.03] hover:shadow-[0_15px_35px_rgba(29,179,159,0.6)]
  transition-all duration-300">
                    SHOP NOW
                  </button>
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
