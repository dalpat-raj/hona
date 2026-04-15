"use server";
import { db } from "@/lib/db";
import { Address } from "@/lib/definations";
import { UpdateAddressSchema } from "@/schema";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";


export async function AddAddress(id: string, data: Address) {
    // const { completeAddress, nearbyLandmark, city, state, phone, pinCode } = UpdateAddressSchema.parse(data);
    
    // try {

    //     await db.user.update({
    //         where: { id: id },
    //         data: {
    //           address: {                
    //               create: {
    //                 completeAddress,
    //                 nearbyLandmark,
    //                 city,
    //                 state,
    //                 pinCode,
    //                 phone,
    //               },
    //           },
    //         },
    //       });

    //     revalidatePath("/profile/address")
    //     return {success: "Address Added ✅"}; 
        
    // } catch (error) {
    //     if (error instanceof ZodError) {
    //         return {error: "Validation Error"};
    //     }
    //     return {error: "Database Error Failed To Add Address ❌"}
    // }
}

export async function updateAddress(id: number,data: Address) {
    // const { completeAddress, nearbyLandmark, city, state, phone, pinCode } = UpdateAddressSchema.parse(data);
    
    // try {

    //     await db.address.update({
    //         where: {id: id},
    //         data: {
    //             completeAddress,
    //             nearbyLandmark,
    //             city,
    //             state,
    //             phone: phone,
    //             pinCode: pinCode,
    //         }
    //     })

    //     revalidatePath("/profile/address")
    //     return {success: "Address Updated ✅"}; 
        
    // } catch (error) {
    //     if (error instanceof ZodError) {
    //         return {error: "Validation Error"};
    //     }
    //     return {error: "Database Error Failed To Update Address ❌"}
    // }
}