"use server";
import { db } from "@/lib/db";
import { deleteImageFromImageKit } from "@/lib/imageKit";
import { revalidatePath } from "next/cache";



export async function DeleteBlog(formData: FormData) {
  const rawId = formData.get("id");
  if (!rawId || typeof rawId !== "string") {
    return { error: "ID missing ❌" };
  }
  
  try {

    const blog = await db.blog.findFirst({
      where: {id: rawId}
    })

    if(!blog){
      return {error: "blog dose not exists"}
    }

    await deleteImageFromImageKit(blog.fileId);
    await db.blog.delete({
      where: { id: rawId }, 
    });
    revalidatePath("/dashboard/blog");
    revalidatePath("/");
    return { success: "Deleted ✅" };
  } catch (error) {
    return { error: "Failed to delete blog ❌" };
  }
}
