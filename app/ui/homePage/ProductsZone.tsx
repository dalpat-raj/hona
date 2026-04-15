import ProductSlider from "@/app/ui/SliderProduct/ProductSlider";
import { getProducts } from "@/lib/data";
import Link from "next/link";

const Products = async () => {
  const result = await getProducts();

  if (result?.error) {
    return (
      <div className="w-full py-10 text-center bg-white">
        <p className="text-blue text-lg">
          Products are not available right now.
        </p>

        <p className="text-gray-400 text-sm mt-1">
          Please check again in a moment.
        </p>

        <Link
          href="/products"
          className="inline-block mt-4 px-4 py-2 border  rounded-md text-sm font-semibold text-white bg-btn transition-all ease-in-out hover:scale-110"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const products = result?.data;

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-8 max-sm:py-6 px-12 max-md:px-4 max-sm:px-2">
      <div className="flex justify-between items-center mb-8 max-sm:mb-4">
        <h2
          className={` text-blue text-[28px] font-bold max-sm:text-[24px]`}
        >
          Our Products
        </h2>

        <Link
          href="/products"
          className="bg-white text-blue rounded-md px-3 py-2 text-[14px] font-semibold"
        >
          {`View More >>`}
        </Link>
      </div>

      <ProductSlider products={products} />
    </div>
  );
};

export default Products;
