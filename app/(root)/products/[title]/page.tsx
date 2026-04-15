import ProductUi from "@/app/ui/product/productDetails/ProductUi";

interface PageProps {
  params: Promise<{ title: string }>;
}

const page = async ({ params }: PageProps) => {
  const { title } = await params;

  const decodedTitle = decodeURIComponent(title);

  return <ProductUi title={decodedTitle} />;
};

export default page;
