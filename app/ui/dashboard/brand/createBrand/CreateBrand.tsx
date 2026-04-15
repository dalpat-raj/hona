"use client";
import { createBrand } from "@/action/brand";
import ButtonWithSpinner from "@/app/ui/button/ButtonWithSpinner";
import { caveat } from "@/app/ui/Fonts";
import Label from "@/app/ui/label/Label";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useImageUpload } from "@/hooks/useImageUpload";
import ImageUploader from "@/app/ui/common/ImageUploader";

const CreateBrand = () => {
  const { image, uploadFile, reset } = useImageUpload();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    try {
      if (!image?.url) {
        toast.error("Please upload image");
        setIsLoading(false);
        return;
      }
      
      const res = await createBrand(image.url, image.fileId, formData);
      router.back();
      if (res.success) toast.success(res.success);
      if (res.error) toast.error(res.error);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-sm:p-0 flex justify-center">
      <div className="w-2/4 max-sm:w-full bg-white rounded-md shadow-custom-shadow p-6">
        <div className="w-full text-center">
          <h2 className={`${caveat.className} text-[26px] font-bold text-blue`}>
            Create Brand
          </h2>
        </div>

        <div className="mt-4">
          <form onSubmit={handleSubmit}>
            <div className="col-span-1">
              <Label htmlFor="title" title="Title" />
              <input
                name="title"
                id="title"
                placeholder="Enter case description"
                className="w-full py-1 px-4 border border-gray-200 bg-white rounded-sm outline-none  focus:border-black text-sm text-gray-500"
              />
            </div>
            <div className="col-span-1 my-4">
              <ImageUploader
                image={image}
                onFileSelect={uploadFile}
                onRemove={reset}
              />
            </div>
            <div className="w-full h-8">
              <ButtonWithSpinner loading={isLoading}>Create</ButtonWithSpinner>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBrand;
