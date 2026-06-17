"use server";

import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getShiprocketToken, requestPickup } from "@/lib/shiprocket";

export async function orderStatusChange(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as OrderStatus;

  try {
    if (!id || !status) {
      return {
        error: "Order ID and Status are required",
      };
    }

    const updatedOrder = await db.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
    if (status === "SHIPPED") {
      const shipment = await db.shipment.findUnique({
        where: {
          orderId: String(id),
        },
      });

      if (shipment?.shipmentId) {
        try {
          const token = await getShiprocketToken();

          const pickupResponse = await requestPickup(
            token,
            shipment.shipmentId,
          );

          console.log("PICKUP_RESPONSE", pickupResponse);

          await db.shipment.update({
            where: {
              orderId: String(id),
            },
            data: {
              status: "READY_TO_SHIP",
            },
          });
        } catch (error) {
          console.error("PICKUP_ERROR", error);
        }
      }
    }

    await db.orderStatusHistory.create({
      data: {
        orderId: id,
        status,
        note: `Order status changed to ${status}`,
      },
    });

    revalidatePath(`/dashboard/orders/${id}`);

    return {
      success: "Order Updated ✅",
    };
  } catch (error) {
    console.error(error);

    return {
      error: "Database Error Failed To Update Order ❌",
    };
  }
}
