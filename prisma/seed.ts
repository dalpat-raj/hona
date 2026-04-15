import { db } from "@/lib/db";
import { productData } from "@/lib/placeholder_data";

async function main() {
  for (const product of productData) {
    await db.product.create({
  data: {
    title: product.title,
    description: product.description,
    brand: product.brand,
    collection: product.collection,
    feature: product.feature,

    variants: {
      create: product.variants.map((variant) => ({
        stock: variant.stock,
        modelNumber: variant.modelNumber,
        sku: variant.sku,
        color: variant.color,
        originalPrice: variant.originalPrice,
        sellingPrice: variant.sellingPrice,
        capacity: variant.capacity,
        power: variant.power,
        length: variant.length,
        breadth: variant.breadth,
        height: variant.height,
        weight: variant.weight,

        images: {
          create: variant.images.map((img) => ({
            url: img, // ✅ string → object
          })),
        },
      })),
    },
  },
});
  }

  console.log("✅ Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect(); // ✅ सही
  });