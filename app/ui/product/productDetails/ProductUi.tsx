import SimilarProd from "@/app/ui/product/similarProduct/SimilarProd";
import ProductClient from "./ProductClient";
import { getProductDetails } from "@/lib/data";
import Script from "next/script";
import { getCurrentUser } from "@/lib/auth";
import { notFound } from "next/navigation";

const ProductUi = async ({ slug }: { slug: string }) => {
  const [product, user] = await Promise.all([
    getProductDetails(slug),
    getCurrentUser(),
  ]);

  if ("error" in product) {
     notFound();
  }

  return (
    <div className="bg-bga">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product?.title,
            description: product?.description,
            image: product?.variants[0]?.images?.[0],
            brand: {
              "@type": "Brand",
              name: product?.brand,
            },
            offers: {
              "@type": "Offer",
              price: product?.variants[0]?.sellingPrice,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />
      <ProductClient product={product} user={user}/>
      <SimilarProd collection={product?.collection} id={product?.id} />
    </div>
  );
};

export default ProductUi;
