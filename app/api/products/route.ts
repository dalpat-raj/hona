import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const searchText = url.searchParams.get("query") || undefined;
    const collection = url.searchParams.get("collection") || undefined;
    const minPrice = parseFloat(url.searchParams.get("minPrice") || "NaN");
    const maxPrice = parseFloat(url.searchParams.get("maxPrice") || "NaN");
    const stock = url.searchParams.get("stock") || undefined;
    const color = url.searchParams.get("color") || undefined;
    const power = url.searchParams.get("power") || undefined;
    const brand = url.searchParams.get("brand") || undefined;
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
    const limit = Math.min(
      100,
      Math.max(1, parseInt(url.searchParams.get("limit") || "10")),
    );

    const sortBy = url.searchParams.get("sortBy") || "createdAt";
    const order = url.searchParams.get("order") || "desc";

    const where: any = {};
    const variantFilters: any = {};

    if (brand) where.brand = brand;
    if (searchText) where.title = { contains: searchText, mode: "insensitive" };
    if (collection) where.collection = collection;

    // variant filters
    if (!isNaN(minPrice) || !isNaN(maxPrice)) {
      variantFilters.sellingPrice = {
        ...(!isNaN(minPrice) && { gte: minPrice }),
        ...(!isNaN(maxPrice) && { lte: maxPrice }),
      };
    }

    if (color) variantFilters.color = color;
    if (power) variantFilters.power = power;

    if (stock === "true") variantFilters.stock = { gt: 0 };
    if (stock === "false") variantFilters.stock = { equals: 0 };

    if (Object.keys(variantFilters).length > 0) {
  where.variants = {
    some: variantFilters,
  };
}
    const orderBy: any = {};

    if (sortBy === "popularity") {
      orderBy.ratings = order === "desc" ? "desc" : "asc";
    } else if (sortBy === "newest") {
      orderBy.createdAt = order === "desc" ? "desc" : "asc";
    } else if (sortBy === "price") {
      orderBy.sellingPrice = order === "desc" ? "desc" : "asc";
    } else {
      orderBy.createdAt = order === "desc" ? "desc" : "asc";
    }

    const products = await db.product.findMany({
      where: Object.keys(where).length ? where : undefined,

      orderBy,
      include: {
        reviews: true,
        variants: {
          orderBy: { sellingPrice: "asc" },
          include: { images: true }, 
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalProducts = await db.product.count({
  where: Object.keys(where).length ? where : undefined,
});

    return NextResponse.json({ products: products || [], totalProducts });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 },
    );
  }
}
