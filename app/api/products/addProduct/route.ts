// import { currentRole } from "@/lib/data";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    console.log("ok ");
    
    const body = await request.json();
    
    const {
        title,
        description,
        modelNumber,
        stock,
        originalPrice,
        sellingPrice,
        collection,
        model,
        color,
        feature,
        images, 
    } = body;

    // const role = await currentRole();

    try {        
        // if (role !== UserRole.ADMIN) {
        //     return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        // }

        const product = await db.product.create({
            data: {
                title,
                description,
                modelNumber,
                stock: Number(stock),
                originalPrice: Number(originalPrice),
                sellingPrice: Number(sellingPrice),
                collection,
                model,
                color,
                feature,
                images, 
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}