import { FetchSimilarProducts } from "@/lib/data";
import ProductSlider from "@/app/ui/SliderProduct/ProductSlider";
import { caveat } from "@/app/ui/Fonts";

interface CollectionProps {
  collection: string;
}

const SimilarProd: React.FC<CollectionProps> = async ({ collection }) => {
  const products = await FetchSimilarProducts(collection);

  return (
    <div className="w-full my-12 max-md:my-4 ">
      <div className="text-center mb-8">
        <h2
          className={`${caveat.className} text-[34px] max-sm:text-[24px] font-semibold mixerColor`}
        >
          You may also like
        </h2>
      </div>
      <div>
        <ProductSlider products={products} />{" "}
      </div>
    </div>
  );
};

export default SimilarProd;
