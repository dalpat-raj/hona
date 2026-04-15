import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url); 
    const productId = url.searchParams.get('productId');

    try {
    const reviews = await db.review.findMany({
        where: {
          productId: Number(productId),
        },
      });
    
    return NextResponse.json(reviews, {status: 200});
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch reviews', error: error }, { status: 500 }); 
  }
}
