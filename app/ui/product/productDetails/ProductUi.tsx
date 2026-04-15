import SimilarProd from "@/app/ui/product/similarProduct/SimilarProd"
import ProductClient from "./ProductClient";
import { getProductDetails } from "@/lib/data";

const ProductUi = async ({ title }: { title: string }) => {
  const product = await getProductDetails(title);
  
    if ("error" in product) {
    throw new Error("Product not found");
  }

  return (
    <div className="bg-bga">
      <ProductClient product={product} />
      <SimilarProd collection={product?.collection} id={product?.id} />
    </div>
  );
};

export default ProductUi;
