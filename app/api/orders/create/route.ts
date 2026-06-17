import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import Razorpay from "razorpay";
import { OrderStatus, PaymentStatus, PaymentMethod } from "@prisma/client";
import { getShiprocketToken, getShippingRate } from "@/lib/shiprocket";
import { normalizePhone } from "@/lib/helpers";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      address,
      items,
      coupon,
    }: {
      address: {
        email: string;
        country: string;
        name: string;
        address: string;
        landmark?: string;
        city: string;
        state: string;
        pinCode: string;
        phone: string;
        saveAddress?: boolean;
        paymentMethod: "RAZORPAY" | "COD";
      };
      items: Array<{ variantId: string; quantity: number }>;
      coupon?: string;
    } = body;

    if (!items?.length) {
      return NextResponse.json(
        { success: false, message: "Cart is empty" },
        { status: 400 },
      );
    }

    // Fetch variants from DB
    const variants = await db.variant.findMany({
      where: { id: { in: items.map((item) => item.variantId) } },
      include: { product: true, images: true },
    });

    if (variants.length !== items.length) {
      return NextResponse.json(
        { success: false, message: "Some products not found" },
        { status: 400 },
      );
    } // Stock check + subtotal calculation
    const totalWeight = items.reduce((sum, item) => {
      const variant = variants.find((v) => v.id === item.variantId);

      return sum + (variant?.weight || 0.5) * item.quantity;
    }, 0);

    const maxLength = Math.max(
      ...items.map((item) => {
        const variant = variants.find((v) => v.id === item.variantId);

        return variant?.length || 10;
      }),
    );

    const maxBreadth = Math.max(
      ...items.map((item) => {
        const variant = variants.find((v) => v.id === item.variantId);

        return variant?.breadth || 10;
      }),
    );

    const totalHeight = items.reduce((sum, item) => {
      const variant = variants.find((v) => v.id === item.variantId);

      return sum + (variant?.height || 5) * item.quantity;
    }, 0);
    let subtotal = 0;
    for (const item of items) {
      const variant = variants.find((v) => v.id === item.variantId);
      if (!variant) {
        return NextResponse.json(
          { success: false, message: "Variant not found" },
          { status: 400 },
        );
      }
      if (variant.stock < item.quantity) {
        return NextResponse.json(
          {
            success: false,
            message: `${variant.product.title} is out of stock`,
          },
          { status: 400 },
        );
      }
      subtotal += Number(variant.sellingPrice) * item.quantity;
    } // Coupon
    let couponDiscount = 0;
    if (coupon) {
      const couponData = await db.coupon.findUnique({
        where: { code: coupon },
      });
      if (
        couponData &&
        couponData.isActive &&
        couponData.expirationDate > new Date()
      ) {
        couponDiscount = (subtotal * couponData.discount) / 100;
      }
    }
    // const shippingCharge = address.paymentMethod === "COD" ? 99 : 0;
    const token = await getShiprocketToken();

    
    
    const rateResponse = await getShippingRate(token, {
      
      pickup_postcode: process.env.SHIPROCKET_PICKUP_PINCODE!,

      delivery_postcode: address.pinCode,

      weight: totalWeight,

      length: maxLength,

      breadth: maxBreadth,

      height: totalHeight,

      cod: address.paymentMethod === "COD" ? 1 : 0,
    });

    let shippingCharge = 0;

    const couriers = rateResponse?.data?.available_courier_companies || [];

    if (couriers.length > 0) {
      shippingCharge = Math.min(
        ...couriers.map((c: any) => Number(c.freight_charge)),
      );
    }

    if (!couriers.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Delivery is not available for this pincode",
        },
        { status: 400 },
      );
    }
    const totalAmount = subtotal + shippingCharge - couponDiscount;
    const orderNumber = `ORD-${Date.now()}`;

    let razorpayOrderId: string | null = null;
    if (address.paymentMethod === "RAZORPAY") {
      const razorOrder = await razorpay.orders.create({
        amount: Math.round(totalAmount * 100),
        currency: "INR",
        receipt: orderNumber,
      });
      razorpayOrderId = razorOrder.id;
    }
    const result = await db.$transaction(async (tx) => {
      const phone = normalizePhone(address.phone);
      const user = await tx.user.upsert({
        where: { phone },
        update: { name: address.name, email: address.email },
        create: {
          phone: phone,
          name: address.name,
          email: address.email,
        },
      });
      const userAddress = await tx.address.create({
        data: {
          userId: user.id,
          addressType: "Home",
          pinCode: address.pinCode,
          city: address.city,
          state: address.state,
          country: address.country,
          address: address.address,
          landmark: address.landmark,
        },
      });
      const order = await tx.order.create({
        data: {
          orderNumber,
          userId: user.id,
          addressId: userAddress.id,
          status: OrderStatus.PENDING,
          paymentStatus: PaymentStatus.PENDING,
          paymentMethod: address.paymentMethod as PaymentMethod,
          subtotal,
          shippingCharge,
          discountAmount: couponDiscount,
          couponCode: coupon || null,
          couponDiscount,
          totalAmount,
          razorpayOrderId,
        },
      });
      await tx.orderItem.createMany({
        data: items.map((item) => {
          const variant = variants.find((v) => v.id === item.variantId)!;
          return {
            orderId: order.id,
            productId: variant.product.id,
            variantId: variant.id,
            productName: variant.product.title,
            productImage: variant.images[0]?.url || null,
            sku: variant.sku,
            price: variant.sellingPrice,
            quantity: item.quantity,
            length: variant.length,
            breadth: variant.breadth,
            height: variant.height,
            weight: variant.weight,

            total: Number(variant.sellingPrice) * item.quantity,
          };
        }),
      });
      await tx.payment.create({
        data: {
          orderId: order.id,
          provider: address.paymentMethod,
          paymentMethod: address.paymentMethod as PaymentMethod,
          razorpayOrderId,
          amount: totalAmount,
          status: PaymentStatus.PENDING,
        },
      });
      return { orderId: order.id };
    });
    return NextResponse.json({
      success: true,
      orderId: result.orderId,
      paymentMethod: address.paymentMethod,
      razorpayOrderId,
      amount: Math.round(totalAmount * 100),
      shippingCharge,
      totalAmount,
    });
  } catch (error) {
    console.error("CREATE_ORDER_ERROR", error);
    return NextResponse.json(
      { success: true, message: "Failed to create order" },
      { status: 200 },
    );
  }
}
