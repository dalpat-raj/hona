"use server"
import { db } from "@/lib/db";
import { EmailSchema, NameSchema, PhoneSchema } from "@/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";



export const NameUpdate = async (values: z.infer<typeof NameSchema>, userId: string) => {
    // const validatedFields = NameSchema.safeParse(values);
    // if(!validatedFields.success){
    //   return { error: "Invalid fields!" };
    // }
  
    // const { firstName, lastName} = validatedFields.data;
  
    // try {
    //     const fullName = `${firstName} ${lastName}`;
    //   const isUpdated = await db.user.update({
    //     where: {id: userId},
    //     data: {
    //       name: fullName,
    //     }
    //   })
  
    //   if(!isUpdated){
    //     return { error: "Opps.... Failed ❌"}
    //   }    
    //   revalidatePath("/profile")
    //   return { success: "Name Updated ✅" }
    // } catch (error) {
    //   return {error: "something went wrong ❌"}
    // }
  }
  
  export const EmailUpdate = async (values: z.infer<typeof EmailSchema>, id: string) => {
    // const validatedFields = EmailSchema.safeParse(values);
  
    // if(!validatedFields.success){
    //   return { error: "Invalid fields!" };
    // }
  
    // const { email } = validatedFields.data;
  
    // try {
    //   const isUpdated = await db.user.update({
    //     where: {id: id},
    //     data: {
    //       email: email,
    //     }
    //   })
  
    //   if(!isUpdated){
    //     return { error: "Opps.... Failed ❌"}
    //   }
    //   revalidatePath("/profile")
    //   return { success: "Name Updated ✅" }
    // } catch (error) {
    //   return {error: "something went wrong ❌"}
    // }
  }
  
  export const PhoneUpdate = async (values: z.infer<typeof PhoneSchema>, id: string) => {
    // const validatedFields = PhoneSchema.safeParse(values);
  
    // if(!validatedFields.success){
    //   return { error: "Invalid fields!" };
    // }
  
    // const { phone } = validatedFields.data;
  
    // try {
    //   const isUpdated = await db.user.update({
    //     where: {id: id},
    //     data: {
    //       address: {
    //         update: {
    //           phone: phone,
    //         }
    //       }
    //     }
    //   })
  
    //   if(!isUpdated){
    //     return { error: "Opps.... Failed ❌"}
    //   }
    //   revalidatePath("/profile")
    //   return { success: "Name Updated ✅" }
    // } catch (error) {
    //   return {error: "something went wrong ❌"}
    // }
  }