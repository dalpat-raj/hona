import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import {
  getShiprocketToken,
  createShiprocketOrder,
  generateAWB,
  generateLabel,
  generateInvoice,
} from "@/lib/shiprocket";
import { OrderStatus, PaymentStatus, ShipmentStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;
    if (
      !orderId ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Invalid payment signature" },
        { status: 400 },
      );
    }
    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { items: true, address: true, user: true },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 },
      );
    }

    if (order.paymentStatus === PaymentStatus.PAID) {
      return NextResponse.json({
        success: true,
        message: "Payment already verified",
      });
    }

    await db.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatus.CONFIRMED,
          paymentStatus: PaymentStatus.PAID,
        },
      });
      await tx.payment.update({
        where: { orderId },
        data: {
          status: PaymentStatus.PAID,
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
        },
      });
      await tx.orderStatusHistory.create({
        data: {
          orderId,
          status: OrderStatus.CONFIRMED,
          note: "Payment received",
        },
      });
      for (const item of order.items) {
        await tx.variant.update({
          where: { id: item.variantId },
          data: { stock: { decrement: item.quantity } },
        });
      }
      const existingShipment = await tx.shipment.findUnique({
        where: { orderId },
      });
      if (!existingShipment) {
        await tx.shipment.create({
          data: { orderId, status: ShipmentStatus.PENDING },
        });
      }
    });

    const shiprocketPayload = {
      order_id: order.orderNumber,
      order_date: new Date().toISOString(),
      billing_customer_name: order.user?.name || "Customer",
      billing_last_name: "",
      billing_address: order.address.address,
      billing_city: order.address.city,
      billing_state: order.address.state,
      billing_country: order.address.country,
      billing_pincode: order.address.pinCode,
      billing_phone: order.user?.phone,
      billing_email: order.user?.email || "",
      shipping_is_billing: true,
      order_items: order.items.map((item) => ({
        name: item.productName,
        sku: item.sku,
        units: item.quantity,
        selling_price: Number(item.price),
      })),

      payment_method: "Prepaid",
      sub_total: Number(order.totalAmount),
      length: 10,
      breadth: 10,
      height: 10,
      weight: 1,
    };

    try {
      const token = await getShiprocketToken();

      const shiprocketResponse = await createShiprocketOrder(
        token,
        shiprocketPayload,
      );

      if (shiprocketResponse?.order_id) {
        await db.shipment.update({
          where: { orderId },
          data: {
            shiprocketOrderId: String(shiprocketResponse.order_id),
            shipmentId: shiprocketResponse.shipment_id
              ? String(shiprocketResponse.shipment_id)
              : null,
          },
        });

        if (shiprocketResponse.shipment_id) {
          try {
            const awbResponse = await generateAWB(
              token,
              String(shiprocketResponse.shipment_id),
            );

            if (awbResponse?.awb_assign_status === 1) {
              const awbCode = awbResponse.response.data.awb_code;
              const courierName = awbResponse.response.data.courier_name;
              await db.shipment.update({
                where: { orderId },
                data: {
                  awbCode,
                  courierName,
                  status: ShipmentStatus.READY_TO_SHIP,
                  trackingUrl: `https://shiprocket.co/tracking/${awbCode}`,
                },
              });
            }
          } catch (error) {
            console.error("AWB_ERROR", error);
          }
        }
        if (shiprocketResponse.shipment_id) {
          try {
            const labelResponse = await generateLabel(
              token,
              String(shiprocketResponse.shipment_id),
            );

            const invoiceResponse = await generateInvoice(
              token,
              String(shiprocketResponse.order_id),
            );

            await db.shipment.update({
              where: { orderId },
              data: {
                labelUrl:
                  labelResponse?.label_url ||
                  labelResponse?.response?.label_url ||
                  null,

                invoiceUrl:
                  invoiceResponse?.invoice_url ||
                  invoiceResponse?.response?.invoice_url ||
                  null,
              },
            });
          } catch (error) {
            console.error("LABEL_INVOICE_ERROR", error);
          }
        }
      } else {
        console.error("Shiprocket order creation failed", shiprocketResponse);
      }
    } catch (shiprocketError) {
      console.error("SHIPROCKET_CREATE_ORDER_ERROR", shiprocketError);
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      orderId,
    });
  } catch (error) {
    console.error("PAYMENT_VERIFY_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Payment verification failed" },
      { status: 500 },
    );
  }
}
