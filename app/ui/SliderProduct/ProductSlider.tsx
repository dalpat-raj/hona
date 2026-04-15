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
      <CarouselContent className="-ml-1 max-sm:gap-2 grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-4">
        {products?.map((item: any, index: number) => (
          <CarouselItem
            key={index}
            className="p-2 bg-white rounded-xl col-span-1"
          >
              <div className="w-full h-auto">
                <ProductCard prod={item} />
              </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ProductSlider;
