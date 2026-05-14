import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
   
    try {
    const collection = await db.collection.findMany()
    
    return NextResponse.json(collection, {status: 200});
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch collection', error: error }, { status: 500 }); 
  }
}