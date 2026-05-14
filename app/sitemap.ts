import { getAllProducts } from "@/lib/data";

export default async function sitemap() {
  const products = await getAllProducts (); 

  return [
    {
      url: "https://thecontrive.com",
      lastModified: new Date(),
    },
    ...products.map((product) => ({
      url: `https://thecontrive.com/products/${product.slug}`,
      lastModified: new Date(),
    })),
  ];
}