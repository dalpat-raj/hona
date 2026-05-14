"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { reviewSchema } from "@/schema";

type Images = {
  url: string;
  fileId: string;
};

export async function reviewAdd(
  values: z.infer<typeof reviewSchema>,
  id: string,
  rating: number,
  cleanImages: Images[],
  userId?: string
) {
  const validatedFields = reviewSchema.safeParse(values);
  if (!validatedFields.success || !validatedFields.data) {
    return { error: "Invalid fields!" };
  }

  const { name, email, message } = validatedFields.data;
  if (!Array.isArray(cleanImages)) {
    return { error: "Invalid image data!" };
  }

  try {
    const averageRating = await calculateAverageRating(id, rating);
    if (isNaN(averageRating)) {
      return { error: "Invalid rating calculation!" };
    }

    const [newReview, updatedProduct] = await db.$transaction([
      db.review.create({
        data: {
          name,
          email,
          message,
          productId: id,
          rating,
          userId: userId,
          images: cleanImages.length
            ? {
                create: cleanImages.map((img) => ({
                  url: img.url,
                  fileId: img.fileId,
                })),
              }
            : undefined,
        },
      }),

      db.product.update({
        where: { id },
        data: {
          ratings: {
            set: averageRating,
          },
        },
      }),
    ]);

    if (!newReview) {
      return { error: "Opps... Please Retry ❌" };
    }
    
    revalidatePath(`/products/${updatedProduct?.slug}`);
    return { success: "Review Added ✅" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong ❌" };
  }
}

async function calculateAverageRating(productId: string, newRating: number) {
  const reviews = await db.review.findMany({
    where: { productId },
    select: { rating: true },
  });

  if (reviews?.length === 0) {
    return newRating;
  }

  const totalReviews = reviews?.length + 1;
  const sumOfRatings =
    reviews?.reduce((sum, review) => sum + review.rating, 0) + newRating;
  return sumOfRatings / totalReviews;
}

export async function reviewDelete(formData: FormData) {
  const id = formData.get("id")as string;
  const productId = formData.get("productId") as string;
  const productIdNumber = productId;
  const ratingNumber = Number(formData.get("rating"));
  if (!id || !productId || isNaN(ratingNumber)) {
  return { error: "Invalid input values ❌" };
} 

const data = await DeleteAverageRating(productIdNumber, ratingNumber);

  try {
    const [isDeleted, updatedProduct] = await db.$transaction([
      db.review.delete({
        where:{id}
      }),
      db.product.update({
        where: { id: productId },
        data: {
          ratings: {
            set: await DeleteAverageRating(productId, ratingNumber),
          },
        },
      }),
    ]);

    console.log("isDeleted", isDeleted);
    console.log("updatedProduct", updatedProduct);
    
    if(!isDeleted){
      throw new Error("something went wrong")
    }
    revalidatePath("/profile/reviews")
    return {success: "Review Deleted ✅"}
  } catch (error) {
    return { error: "Something went wrong ❌" }
  }
}

export async function adminReviewDelete(formData: FormData) {
  const id = formData.get("id")as string;
  const productId = formData.get("productId")as string;
  const rating = Number(formData.get("rating"));
  const productIdNumber = productId;
  const ratingNumber = Number(rating);

  try {
    
    const [isDeleted, updatedProduct] = await db.$transaction([
      db.review.delete({
        where:{id: id}
      }),
      db.product.update({
        where: { id: productId },
        data: {
          ratings: {
            set: await DeleteAverageRating(productIdNumber, ratingNumber),
          },
        },
      }),
    ]);
    if(!isDeleted){
      throw new Error("something went wrong")
    }
    revalidatePath('/dashboard/reviews')
    return {success: "Review Deleted ✅"}
  } catch (error) {
    return { error: "Something went wrong ❌" }
  }
}

async function DeleteAverageRating(
  productIdNumber: string,
  ratingNumber: number,
) {
  const reviews = await db.review.findMany({
    where: { productId: productIdNumber },
    select: { rating: true },
  });
  if (reviews.length === 0) {
    return 0;
  }
  const sumOfRatings = reviews.reduce((sum, review) => sum + review.rating, 0) - ratingNumber;
  const totalReviews = reviews.length - 1;
  return totalReviews > 0 ? sumOfRatings / totalReviews : 0;
}
