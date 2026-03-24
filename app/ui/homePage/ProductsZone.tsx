import ProductSlider from "@/app/ui/SliderProduct/ProductSlider";
import { getProducts } from "@/lib/data";
import Link from "next/link";
import { caveat } from "@/app/ui/Fonts";
import { toast } from "sonner";

const Products = async () => {
  const result = await getProducts();

  // User friendly error

  // if (result.data.length <= 0) {
  //   toast.error("Product not available");
  // }

  if (result?.error) {
    return (
      <div className="w-full py-10 text-center">
        <p className="text-gray-500 text-lg">
          Products are not available right now.
        </p>

        <p className="text-gray-400 text-sm mt-1">
          Please check again in a moment.
        </p>

        <Link
          href="/products"
          className="inline-block mt-4 px-4 py-2 border rounded-md text-sm font-semibold hover:bg-gray-50"
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
          className={`${caveat.className} mixerColor text-[37px] font-bold max-sm:text-[24px]`}
        >
          Our Products
        </h2>

        <Link
          href="/products"
          className="border border-gray-200 mixerColor rounded-md px-3 py-2 text-[14px] font-semibold"
        >
          View More
        </Link>
      </div>

      <ProductSlider products={products} />
    </div>
  );
};

export default Products;
