"use server"
import { db } from "@/lib/db";
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { reviewSchema } from "@/schema";
  

export async function reviewAdd(values: z.infer<typeof reviewSchema>, id: number, rating: number, imagesShow: string[] ) {
    // const validatedFields = reviewSchema.safeParse(values);
    // if (!validatedFields.success || !validatedFields.data) {
    //   return { error: "Invalid fields!" };
    // }
    
    // const { name, email, message} = validatedFields.data;    
    // if (!Array.isArray(imagesShow)) {
    //   return { error: "Invalid image data!" };
    // }

    // try {   
    //   const averageRating = await calculateAverageRating(id, rating);
    //   if (isNaN(averageRating)) {
    //       return { error: "Invalid rating calculation!" };
    //   } 

    //     const [newReview, updatedProduct] = await db.$transaction([
    //       db.review.create({
    //         data: {
    //           name: name,
    //           email: email,
    //           message: message,
    //           productId: id,
    //           rating: rating,
    //           images: imagesShow,
    //         },
    //       }),
    
    //       db.product.update({
    //         where: { id: id },
    //         data: {
    //           rating: {
    //             set: averageRating,
    //           },
    //         },
    //       }),
    //     ]);

    //     if(!newReview){
    //       return {error: "Opps... Please Retry ❌"}
    //     }
        
    //     revalidatePath(`/products/${id}`);
    //     return {success: "Review Added ✅"};       
    // } catch (error) {
    //   console.log(error);
    //   return {error: "Something went wrong ❌"}
    // }
}


async function calculateAverageRating(productId: number, newRating: number) {
  
  // const reviews = await db.review.findMany({
  //   where: { productId },
  //   select: { rating: true },
  // });

  // if (reviews?.length === 0) {
  //   return newRating;  
  // }

  // const totalReviews = reviews?.length + 1; 
  // const sumOfRatings = reviews?.reduce((sum, review) => sum + review.rating, 0) + newRating;  
  // return sumOfRatings / totalReviews;
}


export async function reviewDelete(formData: FormData){
  // const id = formData.get("id");
  // const productId = formData.get("productId");
  // const rating = formData.get("rating");
 
  // const idNumber = Number(id);
  // const productIdNumber = Number(productId);
  // const ratingNumber = Number(rating);

  // if (isNaN(idNumber) || isNaN(productIdNumber) || isNaN(ratingNumber)) {
  //   return { error: "Invalid input values ❌" };
  // }
  
  // try {   
  //   const [isDeleted, updatedProduct] = await db.$transaction([
  //     db.review.delete({
  //       where:{id: Number(id)}
  //     }),

  //     db.product.update({
  //       where: { id: Number(productId) },
  //       data: {
  //         rating: {
  //           set: await DeleteAverageRating(productIdNumber, ratingNumber),
  //         },
  //       },
  //     }),
  //   ]);


  //   if(!isDeleted){
  //     throw new Error("something went wrong")
  //   }
  //   revalidatePath("/profile/reviews")
  //   return {success: "Review Deleted ✅"}
  // } catch (error) {
  //   return { error: "Something went wrong ❌" }
  // }
}

export async function adminReviewDelete(formData: FormData){
  // const id = formData.get("id");
  // const productId = formData.get("productId");
  // const rating = formData.get("rating");
 
  // const idNumber = Number(id);
  // const productIdNumber = Number(productId);
  // const ratingNumber = Number(rating);

  // if (isNaN(idNumber) || isNaN(productIdNumber) || isNaN(ratingNumber)) {
  //   return { error: "Invalid input values ❌" };
  // }
  // // const role = await currentRole()
  // const role = await "ADMIN"
  
  // try {  
  //   if (role !== UserRole.ADMIN) {
  //     return {error: "User not verify!"}
  //   } 
  //   const [isDeleted, updatedProduct] = await db.$transaction([
  //     db.review.delete({
  //       where:{id: Number(id)}
  //     }),

  //     db.product.update({
  //       where: { id: Number(productId) },
  //       data: {
  //         rating: {
  //           set: await DeleteAverageRating(productIdNumber, ratingNumber),
  //         },
  //       },
  //     }),
  //   ]);


  //   if(!isDeleted){
  //     throw new Error("something went wrong")
  //   }
  //   revalidatePath('/dashboard/reviews')
  //   return {success: "Review Deleted ✅"}
  // } catch (error) {
  //   return { error: "Something went wrong ❌" }
  // }
}

async function DeleteAverageRating(productIdNumber: number, ratingNumber: number) {
  // const reviews = await db.review.findMany({
  //   where: { productId: productIdNumber },
  //   select: { rating: true },
  // });

  // if (reviews.length === 0) {
  //   return 0;  
  // }

  // const sumOfRatings = reviews.reduce((sum, review) => sum + review.rating, 0) - ratingNumber;

  // const totalReviews = reviews.length - 1;
  // return totalReviews > 0 ? sumOfRatings / totalReviews : 0; 
}