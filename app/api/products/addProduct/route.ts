import { db } from "@/lib/db";
import { formatTitle } from "@/lib/helpers";
import { NextResponse } from "next/server";
import {
  shiprocketProductWebhook
} from "@/lib/shiprocket-webhook";


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      collection,
      brand,
      feature,
      variants = [],
    } = body;

    // Basic validation
    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    if (!variants || variants.length === 0) {
      return NextResponse.json(
        { message: "At least one variant is required" },
        { status: 400 }
      );
    }

    const slug = formatTitle(title);

    // Validate variants
    for (const v of variants) {
      if (!v.sku || !v.sellingPrice) {
        return NextResponse.json(
          {
            message:
              "Variant SKU & selling price required",
          },
          { status: 400 }
        );
      }

      if (!v.images || v.images.length === 0) {
        return NextResponse.json(
          {
            message:
              "Each variant must have at least one image",
          },
          { status: 400 }
        );
      }
    }

    const toNumber = (val: any) => {
      const num = Number(val);
      return isNaN(num) ? 0 : num;
    };

    // Create product
    const product = await db.product.create({
      data: {
        title,
        slug,
        description,
        collection,
        brand,
        feature: feature || [],

        variants: {
          create: variants.map((v: any) => ({
            sku: v.sku,
            modelNumber: v.modelNumber || "",
            capacity: v.capacity || "",
            power: v.power || "",
            color: v.color || "",

            stock: toNumber(v.stock),
            originalPrice: toNumber(
              v.originalPrice
            ),
            sellingPrice: toNumber(
              v.sellingPrice
            ),

            length: toNumber(v.length),
            breadth: toNumber(v.breadth),
            height: toNumber(v.height),
            weight: toNumber(v.weight),

            images: {
              create: (v.images || [])
                .filter(
                  (img: any) =>
                    !img.loading &&
                    (img.url || img)
                )
                .map((img: any) => ({
                  url: img.url || img,
                  fileId: img.fileId,
                })),
            },
          })),
        },
      },

      include: {
        variants: {
          include: {
            images: true,
          },
        },
      },
    });

    // Return updated product
    const updatedProduct =
      await db.product.findUnique({
        where: {
          id: product.id,
        },
        include: {
          variants: {
            include: {
              images: true,
            },
          },
        },
      });

      try {
  await shiprocketProductWebhook(
    updatedProduct
  );
  console.log(
    "Shiprocket product synced"
  );
} catch (e) {
  console.log(
    "Shiprocket webhook failed",
    e
  );
}

    return NextResponse.json(
      {
        success: true,
        data: updatedProduct,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(
      "Create Product Error:",
      error
    );

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          message:
            "SKU or slug already exists",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message:
          error?.message ||
          "Something went wrong while creating product",
      },
      { status: 500 }
    );
  }
}