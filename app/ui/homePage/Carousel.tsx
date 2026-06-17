"use client";

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
        {banners?.map((item) => (
          <CarouselItem key={item.id}>
            <Link href={item.url} className="block">
              <div className="relative w-full overflow-hidden rounded-xl">
                {/* Desktop Banner */}
                <Image
                  src={item.imageC}
                  alt="Banner"
                  width={1920}
                  height={700}
                  priority
                  className="hidden md:block w-full h-auto object-cover"
                />

                {/* Mobile Banner */}
                <Image
                  src={item.imageM}
                  alt="Banner"
                  width={800}
                  height={1200}
                  className="block md:hidden w-full h-auto object-cover"
                />

                {/* Optional Overlay */}
                <div className="absolute inset-0 bg-black/5" />

                {/* CTA */}
                <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2">
                  <button
                    className="
                      bg-[#1db39f]
                      text-white
                      font-semibold
                      px-5 py-2
                      md:px-7 md:py-3
                      rounded-full
                      shadow-lg
                      hover:scale-105
                      transition-all
                      duration-300
                    "
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}