import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      orderId: string;
    };
  }
) {
  try {
    const order = await db.order.findUnique({
      where: {
        id: params.orderId,
      },
      include: {
        items: true,
        payment: true,
        shipment: true,
        address: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}