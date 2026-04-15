import { FetchSimilarProducts } from "@/lib/data";
import ProductSlider from "@/app/ui/SliderProduct/ProductSlider";
import { caveat } from "@/app/ui/Fonts";

interface CollectionProps {
  collection: string;
  id: string;
}

const SimilarProd: React.FC<CollectionProps> = async ({ collection, id }) => {
  const products = await FetchSimilarProducts(collection, id);  

  return (
    <div className="w-full p-12 max-md:p-4 max-sm:p-2">
      <div className="text-center mb-8">
        <h2
          className={`text-[34px] max-sm:text-[24px] font-semibold text-blue`}
        >
          You may also like
        </h2>
      </div>
      <div>
        <ProductSlider products={products} />
      </div>
    </div>
  );
};

export default SimilarProd;
