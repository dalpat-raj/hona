"use server";
import { db } from "@/lib/db";
import { deleteImageFromImageKit } from "@/lib/imageKit";
import { revalidatePath } from "next/cache";

export async function createCollction(
  image: string,
  fileId: string,
  formData: FormData,
) {
  const title = formData.get("title");

  if (!title || typeof title !== "string" || !image) {
    return { error: "All fields are required ❌" };
  }

  try {
    await db.collection.create({
      data: {
        title: title.trim(),
        image,
        fileId,
      },
    });

    revalidatePath(`/dashboard/collection`);

    return { success: "Collection Created ✅" };
  } catch (error) {
    return { error: "Failed to create collection ❌" };
  }
}

export async function editCollction(
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

    await db.collection.update({
      where: { id },
      data: {
        title: title.trim(),
        image,
        fileId,
      },
    });

    revalidatePath(`/dashboard/collection`);

    return { success: "Collection Updated ✅" };
  } catch (error) {
    console.log(error);
    return { error: "Failed to update collection ❌" };
  }
}

export async function deleteCollection(id: string) {
  try {
    const collection = await db.collection.findUnique({
      where: { id },
    });

    if (!collection) {
      return { error: "Collection not found ❌" };
    }

    if (collection.fileId) {
      const res = await deleteImageFromImageKit(collection.fileId);
    }

    await db.collection.delete({
      where: { id },
    });

    revalidatePath("/dashboard/collection");

    return { success: "Collection Deleted ✅" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete collection ❌" };
  }
}
