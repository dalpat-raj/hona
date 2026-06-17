import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { OrderStatus, ShipmentStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
  let orderStatus: OrderStatus | null = null;
  let shipmentStatus: ShipmentStatus | null = null;
  try {
    const body = await req.json();

    const awbCode = body.awb;
    const currentStatus = body.current_status;

    const shipment = await db.shipment.findFirst({
      where: {
        awbCode,
      },
    });

    if (!shipment) {
      return NextResponse.json({ success: false });
    }

    let orderStatus: OrderStatus | null = null;

    switch (currentStatus) {
      case "Shipped":
        orderStatus = OrderStatus.SHIPPED;
        shipmentStatus = ShipmentStatus.IN_TRANSIT;
        break;

      case "Out For Delivery":
        orderStatus = OrderStatus.OUT_FOR_DELIVERY;
        shipmentStatus = ShipmentStatus.OUT_FOR_DELIVERY;
        break;

      case "Delivered":
        orderStatus = OrderStatus.DELIVERED;
        shipmentStatus = ShipmentStatus.DELIVERED;
        break;
    }
    if (orderStatus) {
      await db.order.update({
        where: {
          id: shipment.orderId,
        },
        data: {
          status: orderStatus,
        },
      });

      await db.shipment.update({
        where: {
          id: shipment.id,
        },
        data: {
          status: shipmentStatus!,
          deliveredAt:
            shipmentStatus === ShipmentStatus.DELIVERED
              ? new Date()
              : undefined,
        },
      });

      await db.orderStatusHistory.create({
        data: {
          orderId: shipment.orderId,
          status: orderStatus,
          note: "Updated from Shiprocket webhook",
        },
      });
      const lastTracking = await db.shipmentTracking.create({
        data: {
          shipmentId: shipment.id,
          status: currentStatus,
          location: body.location || null,
          remark: body.remark || null,
        },
      });

      if (lastTracking?.status !== currentStatus) {
        await db.shipmentTracking.create({
          data: {
            shipmentId: shipment.id,
            status: currentStatus,
            location: body.location || null,
            remark: body.remark || null,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ success: false }, { status: 500 });
  }
}
