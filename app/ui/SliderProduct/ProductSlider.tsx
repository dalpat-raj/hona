"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Product } from "@/lib/definations";
import ProductCard from "@/app/ui/product/ProductCard";

interface ProductProps {
  products: Product[];
}

const ProductSlider: React.FC<ProductProps> = ({ products }) => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {products?.map((item: any, index: number) => (
          <CarouselItem
            key={index}
            className="pl-1 max-sm:basis-4/6 max-md:basis-2/6 max-lg:basis-1/3 lg:basis-1/4 bg-bg rounded-xl"
          >
            <div className="p-1">
              <div className="w-full h-auto">
                <ProductCard prod={item} />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ProductSlider;
