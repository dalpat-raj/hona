"use server";
import { db } from "@/lib/db";
import { revalidatePath } from 'next/cache';
// import { currentRole } from "@/lib/data";
import { UserRole } from "@prisma/client";


export async function createBanner(image: string, formData: FormData) {
  const url = formData.get("url") as string;

  try {
    if (!url || !image) {
      return { error: "All fields are required!" };
    }

    await db.banner.create({
      data: {
        url,
        image, // ✅ single string
      },
    });

    revalidatePath("/dashboard/banner")
        return {success: "Banner Created ✅"}; 
  } catch (error) {
     return({error: "Database Error failed to create coupon ❌"});
  }
}

export async function EditBanner(id:number, images: string[] | any ,formData: FormData) {
    const url = formData.get('url') as string;

    try {
        
        if(!url || !images){
            return ({error: 'All fields are required!'})
        }

        await db.banner.update({
            where:{id: Number(id)},
            data: {
                url: url,
                image: images
            },
        });
        revalidatePath("/dashboard/banner")
        return {success: "Updated ✅"};
    } catch (error) {
        return({error: "Database Error failed to edit coupon ❌"});
    }
}


export async function DeleteBanner(formData: FormData) {
    const id = formData.get('id') as number | string;
    try {
        
        if(!id){
            return({error: 'pease retry'})
        }

        await db.banner.delete({
            where:{id: Number(id)},
        });
        revalidatePath("/dashboard/banner")
        return {success: "Deleted ✅"};
    } catch (error) {
        return({error: "Database Error failed to delete coupon ❌"});
    }
}