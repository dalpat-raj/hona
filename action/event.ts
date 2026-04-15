"use server";
import { db } from "@/lib/db";
import { EventCreate } from "@/lib/definations";
import { EventCreateSchema } from "@/schema";
import { revalidatePath } from "next/cache";
// import { currentRole } from "@/lib/data";
// import { UserRole } from "@prisma/client";


export async function eventAdd(products: number[], data: EventCreate) {
    // // const role = await currentRole();
    // const role = "ADMIN";
    // const { title, description, discount, endDate } = EventCreateSchema.parse(data);
    
    // try {
    //     if (role !== UserRole.ADMIN) {
    //         return {error: "User not verify!"}
    //     }
    //     const discountValue = parseFloat(discount) / 100; 

    //     const newEvent = await db.event.create({
    //         data: {
    //             title,
    //             description,
    //             discount: parseFloat(discount),
    //             endDate: new Date(endDate)
    //         },
    //     });
        
    //     const productsToUpdate = await db.product.findMany({
    //         where: {
    //             id: { in: products },
    //         },
    //         select: {
    //             id: true,
    //             originalPrice: true,
    //         },
    //     });

    //     const updatePromises = productsToUpdate.map(product => {
    //         const newSellingPrice = product.originalPrice * (1 - discountValue);
    //         return db.product.update({
    //             where: { id: product.id },
    //             data: { sellingPrice: newSellingPrice },
    //         });
    //     });
        
    //     await Promise.all(updatePromises);
    //     const eventProducts = products.map(productId => ({
    //         eventId: newEvent.id,
    //         productId,
    //     }));
        
        
    //     await db.eventProduct.createMany({
    //         data: eventProducts,
    //     });

    //     revalidatePath("/dashboard/events")
    //     return {success: "Event Created ✅"}; 
        
    // } catch (error) {
    //     return {error: "Database Error Failed To Create Event ❌"}
    // }
}