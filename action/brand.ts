"use server";
import { db } from "@/lib/db";
import { deleteImageFromImageKit } from "@/lib/imageKit";
import { revalidatePath } from "next/cache";

export async function createBrand(
  image: string,
  fileId: string,
  formData: FormData,
) {
  const title = formData.get("title");

  if (!title || typeof title !== "string" || !image) {
    return { error: "All fields are required ❌" };
  }

  try {
    await db.brand.create({
      data: {
        title: title.trim(),
        image,
        fileId,
      },
    });

    revalidatePath(`/dashboard/brand`);

    return { success: "Brand Created ✅" };
  } catch (error) {
    return { error: "Failed to create brand ❌" };
  }
}

export async function editBrand(
  id: string,
  image: string,
  fileId: string,
  oldFileId: string,
  formData: FormData,
) {
  
  const title = formData.get("title");

  if (!title || typeof title !== "string") {
    return { error: "Invalid title ❌" };
  }

  try {
    if (fileId !== oldFileId && oldFileId) {
     const res = await deleteImageFromImageKit(oldFileId);
    }

    await db.brand.update({
      where: { id },
      data: {
        title: title.trim(),
        image,
        fileId,
      },
    });

    revalidatePath(`/dashboard/brand`);

    return { success: "Brand Updated ✅" };
  } catch (error) {
    console.log(error);
    return { error: "Failed to update brand ❌" };
  }
}

export async function deleteBrand(id: string) {
  try {
    const brand = await db.brand.findUnique({
      where: { id },
    });

    if (!brand) {
      return { error: "Brand not found ❌" };
    }

    if (brand.fileId) {
      const res = await deleteImageFromImageKit(brand.fileId);
    }

    await db.brand.delete({
      where: { id },
    });

    revalidatePath("/dashboard/brand");

    return { success: "Brand Deleted ✅" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete Brand ❌" };
  }
}
