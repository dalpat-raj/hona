"use server"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (formData: FormData) => {
  const id = formData.get("id") as string;
      try {  
        const isDeleted = await db.product.delete({
          where: {
            id: id
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