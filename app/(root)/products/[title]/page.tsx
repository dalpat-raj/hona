import ProductUi from "@/app/ui/product/productDetails/ProductUi";
import { getProductDetails } from "@/lib/data";

interface PageProps {
  params: { title: string };
}


export async function generateMetadata({ params }: PageProps) {
  const decodedTitle = decodeURIComponent(params.title);
  const product = await getProductDetails(decodedTitle);

  if ("error" in product) {
    return {
      title: "Product Not Found | Contrive",
    };
  }

  return {
    title: `${product.title} | Buy Online at Best Price`,
    description: product.description || "Buy this product at best price in India",

    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.variants[0]?.images?.[0]],
    },
  };
}

const page = async ({ params }: PageProps) => {
  const { title } = await params;

  const decodedTitle = decodeURIComponent(title);

  return (
    <>
    <ProductUi title={decodedTitle} />
    </>
  );
};

export default page;
