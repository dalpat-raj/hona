"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema } from "@/schema/index";
import { z } from "zod";
import ButtonWithSpinner from "@/app/ui/button/ButtonWithSpinner";
import Label from "@/app/ui/label/Label";
import { useImageUpload } from "@/hooks/useImageUpload";
import ImageUploader from "@/app/ui/common/ImageUploader";
import { ImageSkeleton } from "@/app/ui/skeletons";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type BlogType = z.infer<typeof blogSchema>;

const Page = () => {
  const { image, uploadFile, reset } = useImageUpload();
  const [loading, setLoading] = useState(false);
  const isUploading = image?.loading;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogType>({
    resolver: zodResolver(blogSchema),
  });

  const onSubmit = async (data: BlogType) => {
  if (!image?.url || !image?.fileId) {
    toast.error("Please upload image");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("/api/blog/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        image: image.url,
        fileId: image.fileId,
      }),
    });

    const result = await res.json();

    if (result.success) {
      router.push("/dashboard/blog")
      toast.success("Blog Successfully Created ✅");
    } else {
      toast.error("Error creating blog ❌");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full px-0 py-12 max-md:px-4 max-sm:px-2">
      <h1 className="text-2xl font-bold mb-6">Create Blog</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
          <div className="col-span-1">
            <Label htmlFor="title" title="Title" />
            <input
              {...register("title")}
              id="title"
              placeholder="Blog Title"
              className="w-full py-1 px-4 border border-gray-200 bg-white rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="col-span-1">
            <Label htmlFor="author" title="Author Name" />
            <input
              {...register("author")}
              placeholder="Author Name"
              className="w-full py-1 px-4 border border-gray-200 bg-white rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500"
            />
          </div>
        </div>

        {/* Short Description */}
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 pb-6">
          <div className="col-span-1 flex flex-col justify-start gap-4">
            <div className="">
              <Label htmlFor="category" title="Category" />
              <select {...register("category")} className="w-full border p-2">
                <option value="">Select Category</option>
                <option value="Atta Chakki">Atta Chakki</option>
                <option value="Grinder Shell">Grinder Shell</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Buying Guide">Buying Guide</option>
                <option value="Business Tips">Business Tips</option>
              </select>
            </div>
            <div className="h-full">
              <Label htmlFor="img" title="Choose Image" />
              {image ? (
                <div className="w-full h-full relative">
                  {/* Change Button */}
                  <button className="rounded-lg bg-green-700 text-blue text-[14px] px-2 py-1 absolute right-[5px] top-[5px] z-10">
                    Change
                  </button>

                  {/* Skeleton OR Image */}
                  {image.loading ? (
                    <ImageSkeleton />
                  ) : (
                    image.url && (
                      <Image
                        src={image.url}
                        alt="banner"
                        fill
                        className="w-full h-full object-cover rounded-md p-1"
                      />
                    )
                  )}
                </div>
              ) : (
                <ImageUploader
                  image={image}
                  onFileSelect={uploadFile}
                  onRemove={reset}
                />
              )}
            </div>
          </div>
          <div className="col-span-1 flex flex-col justify-start gap-4">
            <div className="">
              <Label htmlFor="desc" title="Short Description" />
              <textarea
                {...register("shortDescription")}
                placeholder="Short Description"
                className="w-full border p-2"
              />
            </div>
            <div className="">
              <Label htmlFor="blog" title="Write Blog" />
              <textarea
                {...register("content")}
                placeholder="Full Blog Content"
                rows={6}
                className="w-full border p-2"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-8">
        <ButtonWithSpinner loading={loading}>Submit Blog</ButtonWithSpinner>
        </div>
      </form>
    </div>
  );
};

export default Page;
