"use server"
// import { currentRole } from "@/lib/data";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (formData: FormData) => {
  const id = formData.get("id") as string;
  // const role = await currentRole();
  // const role = "ADMIN";

      try {
        // if (role !== UserRole.ADMIN) {
        // if (role !== "ADMIN") {
        //   return {error: "User not verify!"}
        // }
  
        const isDeleted = await db.product.delete({
          where: {
            id: Number(id)
          }
    
        })
        if(!isDeleted){
          return {error: "Please retry!"}
        }
        revalidatePath("/dashboard/products")
        return {success: "Product Deleted ✅"}
      } catch (error) {
        return ({error: "Database Error Product Delete Failed ❌"})
      }
    
  };