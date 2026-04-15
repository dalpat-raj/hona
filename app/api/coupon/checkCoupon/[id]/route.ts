import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { unknown } from "zod";



export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.pathname.split('/').pop()
    
    try {
    const coupon = await db.coupon.findUnique({
        where: { code: code },
    });
    
    if (!coupon || !coupon.isActive) {
        throw new Error('Coupon is invalid or inactive.');
    }
    
    if (coupon.expirationDate && coupon.expirationDate < new Date()) {
        throw new Error('Coupon has expired.');
    }
    
    return NextResponse.json(coupon)
    } catch (error) {
        return NextResponse.json({ message: 'Failed to check coupon code 😢', error: error }, { status: 500 }); 
    }
}