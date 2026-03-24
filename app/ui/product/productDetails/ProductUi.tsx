import dynamic from "next/dynamic";
import { SimilarProductSkeleton } from "@/app/ui/skeletons";
const ProductImage = dynamic(
  () => import("@/app/ui/product/productDetails/ProductImage"),
);
const ProductDetails = dynamic(
  () => import("@/app/ui/product/productDetails/ProductDetails"),
);
const SimilarProd = dynamic(
  () => import("@/app/ui/product/similarProduct/SimilarProd"),
  { loading: () => <SimilarProductSkeleton /> },
);
import { getProductDetails } from "@/lib/data";

const ProductUi = async ({ title }: { title: string }) => {
  const product = await getProductDetails(title && title);

  if ("error" in product) {
    throw new Error("image not found");
  }

  return (
    <div className="px-12 py-4 max-md:px-4 max-sm:px-2">
      <div className="w-full h-auto grid grid-cols-2 max-sm:grid-cols-1 grid-rows-subgrid max-sm:grid-rows-1 max-sm:gap-4">
        <div className="col-span-1  max-sm:col-span-2 row-span-1">
          <ProductImage productImages={product?.images} />
        </div>
        <div className="col-span-1  max-sm:col-span-2 pl-12 max-md:px-4 max-sm:px-0 scroll-smooth overflow-scroll no-scrollbar overflow-y-auto">
          <ProductDetails productDetail={product} />
        </div>
      </div>
      <div>
        <SimilarProd collection={product?.collection} />
      </div>
    </div>
  );
};

export default ProductUi;
