"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ImageSkeleton } from "@/app/ui/skeletons";
import { VariantImage } from "@/lib/definations";
import { useRef } from "react";

const ProductImage = ({ productImages }: { productImages: VariantImage[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const changeImage = (index: number) => {
    setCurrentIndex(index);
  };

  const nextImage = () => {
    if (!productImages?.length) return;

    setCurrentIndex((prevIndex) => (prevIndex + 1) % productImages.length);
  };

  const startInterval = () => {
    if (!isHovered) {
      intervalRef.current = setInterval(nextImage, 3000);
    }
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    setCurrentIndex(0);
    setLoadedImages([]);
  }, [productImages]);

  useEffect(() => {
    stopInterval();

    if (!isHovered && productImages?.length > 1) {
      intervalRef.current = setInterval(nextImage, 3000);
    }

    return stopInterval;
  }, [isHovered, productImages]);

  return (
    <div
      className="w-full relative flex flex-col"
      onMouseEnter={() => {
        setIsHovered(true);
        stopInterval();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        startInterval();
      }}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {productImages.map((image, index) => (
            <Image
              key={index}
              src={image.url}
              alt={`Image ${index + 1}`}
              width={500}
              height={300}
              sizes="100vw"
              className="w-full cursor-default"
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-4 overflow-x-scroll no-scrollbar">
        {productImages.map((image, index) => (
          <div className="w-[80px] h-[90px] overflow-hidden rounded-md" key={index}>
            {!loadedImages.includes(index) && <ImageSkeleton />}
            <Image
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              className={`cursor-pointer transition-all duration-200 ${
                currentIndex === index
                  ? "border-2 border-black scale-105"
                  : "opacity-70"
              }`}
              onClick={() => changeImage(index)}
              onLoad={() =>
                setLoadedImages((prev) =>
                  prev.includes(index) ? prev : [...prev, index],
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
