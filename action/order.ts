"use server"
import { db } from "@/lib/db";
import { UserOrders } from "@/lib/definations";
import { revalidatePath } from 'next/cache';


export async function orderStatusChange(formData: FormData) {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // const id = formData.get('id') as number | string;
    // const status = formData.get('status') as string;

    // try {
    //     if (!id || !status) {
    //         throw new Error("Order ID and status are required");
    //     }

    //     const updatedOrder: UserOrders | any = await db.order.update({
    //         where: { id: Number(id) },
    //         data: { status },
    //       });

    //       await db.statusHistory.create({
    //         data: {
    //             orderId: Number(id),
    //             status,
    //             changedAt: new Date(), 
    //         },
    //     });

    //     revalidatePath(`/dashboard/orders/order-details/${id}`);
    //     return {success: "Order Updated ✅"};
          
    // } catch (error) {
    //     return {error: "Database Error Failed To Update Order ❌"}
    // }

}