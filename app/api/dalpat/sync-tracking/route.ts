import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { getShiprocketToken, getTracking } from "@/lib/shiprocket";
import { ShipmentStatus, OrderStatus } from "@prisma/client";

function mapShiprocketStatus(status: string): ShipmentStatus {
  switch (status.toLowerCase()) {
    case "pickup generated":
      return ShipmentStatus.READY_TO_SHIP;

    case "picked up":
      return ShipmentStatus.PICKED_UP;

    case "in transit":
      return ShipmentStatus.IN_TRANSIT;

    case "out for delivery":
      return ShipmentStatus.OUT_FOR_DELIVERY;

    case "delivered":
      return ShipmentStatus.DELIVERED;

    default:
      return ShipmentStatus.PENDING;
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const token = await getShiprocketToken();

    const shipments = await db.shipment.findMany({
      where: {
        awbCode: {
          not: null,
        },
      },
    });

    for (const shipment of shipments) {
      try {
        const tracking = await getTracking(token, shipment.awbCode!);

        const shipmentStatus = tracking?.tracking_data?.shipment_status;

        let orderStatus = null;

        switch (shipmentStatus) {
          case 3:
            orderStatus = OrderStatus.SHIPPED;
            break;

          case 17:
            orderStatus = OrderStatus.OUT_FOR_DELIVERY;
            break;

          case 7:
            orderStatus = OrderStatus.DELIVERED;
            break;
        }

        const currentTrack = tracking?.tracking_data?.shipment_track?.[0];

        if (!currentTrack) continue;

        // Shipment update
        await db.shipment.update({
          where: {
            id: shipment.id,
          },
          data: {
            status: mapShiprocketStatus(currentTrack.current_status),

            courierName: currentTrack.courier_name || null,

            trackingUrl: tracking?.tracking_data?.track_url || null,

            deliveredAt: currentTrack.current_status
              .toLowerCase()
              .includes("delivered")
              ? new Date()
              : null,
          },
        });

        if (orderStatus) {
          await db.order.update({
            where: {
              id: shipment.orderId,
            },
            data: {
              status: orderStatus,
            },
          });

          await db.orderStatusHistory.create({
            data: {
              orderId: shipment.orderId,
              status: orderStatus,
              note: "Updated from Shiprocket tracking",
            },
          });
        }

        // Tracking activities save
        const activities =
          tracking?.tracking_data?.shipment_track_activities || [];

        for (const activity of activities) {
          const exists = await db.shipmentTracking.findFirst({
            where: {
              shipmentId: shipment.id,
              status: activity.activity,
            },
          });

          if (!exists) {
            await db.shipmentTracking.create({
              data: {
                shipmentId: shipment.id,
                status: activity.activity,
                location: activity.location || null,
                remark: activity.status || null,
                createdAt: new Date(activity.date),
              },
            });
          }
        }

        // Auto delivered
        if (currentTrack.current_status.toLowerCase().includes("delivered")) {
          await db.order.update({
            where: {
              id: shipment.orderId,
            },
            data: {
              status: OrderStatus.DELIVERED,
            },
          });
        }
      } catch (error) {
        console.error("TRACKING_ERROR", shipment.awbCode, error);
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("SYNC_ERROR", error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
