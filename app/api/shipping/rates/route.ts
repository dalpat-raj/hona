import { NextRequest, NextResponse } from "next/server";
import { getShiprocketToken, getShippingRates } from "@/lib/shiprocket";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      pickupPincode,
      deliveryPincode,
      weight,
      length,
      breadth,
      height,
      cod,
    } = body;

    const token = await getShiprocketToken();

    const query = new URLSearchParams({
      pickup_postcode: pickupPincode,
      delivery_postcode: deliveryPincode,
      cod: String(cod),
      weight: String(weight),
      length: String(length),
      breadth: String(breadth),
      height: String(height),
    });

    const response = await getShippingRates(token, query);

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}