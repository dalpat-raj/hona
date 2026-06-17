import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const status = searchParams.get("status");

    const skip = (page - 1) * limit;

    let orderStatus: any = undefined;

    switch (status) {
      case "Order Confirmed":
        orderStatus = "CONFIRMED";
        break;

      case "Processing":
        orderStatus = "PROCESSING";
        break;

      case "Packed":
        orderStatus = "PACKED";
        break;

      case "Shipped":
        orderStatus = "SHIPPED";
        break;

      case "Delivered":
        orderStatus = "DELIVERED";
        break;

      case "Cancelled":
        orderStatus = "CANCELLED";
        break;

      default:
        orderStatus = undefined;
    }

    const where = orderStatus
      ? {
          status: orderStatus,
        }
      : {};

    const [orders, totalOrders] = await Promise.all([
      db.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: {
              name: true,
              phone: true,
            },
          },

          payment: {
            select: {
              status: true,
            },
          },

          shipment: {
            select: {
              status: true,
              awbCode: true,
            },
          },

          items: {
            take: 1,
            select: {
              productImage: true,
            },
          },
        },
      }),

      db.order.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,
      orders,
      totalOrders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
    });
  } catch (error) {
    console.error("FETCH_ORDERS_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch orders",
      },
      {
        status: 500,
      }
    );
  }
}