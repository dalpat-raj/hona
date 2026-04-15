"use server";
import { db } from "@/lib/db";
import { deleteImageFromImageKit } from "@/lib/imageKit";
import { revalidatePath } from "next/cache";

export async function createBanner(
  image: string,
  fileId: string,
  formData: FormData
) {
  
const url = formData.get("url") as string;
  if (!image || !fileId || !url) {
    return { error: "All fields are required ❌" };
  }

  try {
    await db.banner.create({
      data: {
        url,
        image,
        fileId,
      },
    });

    revalidatePath("/dashboard/banner");

    return { success: "Banner Created ✅" };
  } catch (error) {
    return { error: "Failed to create banner ❌" };
  }
}

export async function EditBanner(
  id: string,
  image: string,
  fileId: string,
  oldFileId: string,
  formData: FormData
) {
  const url = formData.get("url");

  if (!url || typeof url !== "string") {
    return { error: "Invalid URL ❌" };
  }

  try {
    // 🔥 1. Agar new image upload hui hai
    if (fileId !== oldFileId && oldFileId) {
      await deleteImageFromImageKit(oldFileId);
    }

    // 🔥 2. DB update
    await db.banner.update({
      where: { id },
      data: {
        url: url.trim(),
        image,
        fileId,
      },
    });

    revalidatePath("/dashboard/banner");

    return { success: "Updated ✅" };
  } catch (error) {
    console.log(error);
    return { error: "Failed to update banner ❌" };
  }
}

export async function DeleteBanner(formData: FormData) {
  const rawId = formData.get("id");
  if (!rawId || typeof rawId !== "string") {
    return { error: "ID missing ❌" };
  }
  
  try {
      await db.banner.delete({
      where: { id: rawId }, 
    });
    revalidatePath("/dashboard/banner");
    revalidatePath("/");
    return { success: "Deleted ✅" };
  } catch (error) {
    return { error: "Failed to delete banner ❌" };
  }
}
