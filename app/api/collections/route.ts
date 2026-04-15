import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
   
    try {
    const collection = await db.collection.findMany()
    
    return NextResponse.json(collection, {status: 200});
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch collection', error: error }, { status: 500 }); 
  }
}