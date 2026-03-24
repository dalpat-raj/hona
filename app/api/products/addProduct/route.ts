// import { currentRole } from "@/lib/data";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      modelNumber,
      stock,
      sku,
      originalPrice,
      sellingPrice,
      collection,
      color,
      feature,
      images,
      dimension,
    } = body;

    // ✅ Basic Validation
    if (!title || !sku || !sellingPrice) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    // ✅ Safe number conversion
    const parsedStock = Number(stock);
    const parsedOriginalPrice = Number(originalPrice);
    const parsedSellingPrice = Number(sellingPrice);

    // ✅ Dimension safe handling
    const width = dimension?.width ? Number(dimension.width) : null;
    const height = dimension?.height ? Number(dimension.height) : null;
    const depth = dimension?.depth ? Number(dimension.depth) : null;

    const product = await db.product.create({
      data: {
        title,
        description,
        modelNumber,
        stock: parsedStock,
        sku,
        originalPrice: parsedOriginalPrice,
        sellingPrice: parsedSellingPrice,
        collection,
        color,
        feature: feature || [],
        images: images || [],
        width,
        height,
        depth,
      },
    });

    return NextResponse.json(
      { success: true, data: product },
      { status: 201 } 
    );
  } catch (error: any) {
    console.error("Create Product Error:", error);

    return NextResponse.json(
      {
        message:
          error?.message || "Something went wrong while creating product",
      },
      { status: 500 }
    );
  }
}