"use client";
import React, { useState } from "react";
import { editCollction } from "@/action/collection";
import Label from "../../label/Label";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import ButtonWithSpinner from "../../button/ButtonWithSpinner";
import { ImageSkeleton } from "../../skeletons";
import { toast } from "sonner";
import { useImageUpload } from "@/hooks/useImageUpload";
import ImageUploader from "@/app/ui/common/ImageUploader";

type Collction = {
  id: string;
  title: string;
  image: string | null;
  fileId: string;
};

const CollectionEdit = ({ items }: { items: Collction }) => {
    
  const { image, uploadFile, reset } = useImageUpload();
  const [changeImage, setChangeImage] = useState<boolean>(false);
  const [editBoxOpen, setEditBoxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    try {
      const res = await editCollction(
        items.id,
        image?.url || items.image,
        image?.fileId || items.fileId,
        items.fileId,
        formData,
      );
      if (res.success) toast.success(res.success);
      if (res.error) toast.error(res.error);
    } catch (error) {
      toast.error("Error submitting form:");
    } finally {
      setIsLoading(false);
      setEditBoxOpen(false);
    }
  };

  const closeEditBox = () => {
    setEditBoxOpen(false);
  };

  return (
    <div className="flex gap-8 items-center">
      <button
        onClick={() => setEditBoxOpen(true)}
        className="text-[14px] font-semibold text-white bg-[#333] h-8 px-4 rounded-sm"
      >
        Edit
      </button>

      {editBoxOpen && (
        <div
          className="w-full h-[100vh] fixed top-0 left-0 bg-blackOverlay"
          onClick={closeEditBox}
        >
          <div className="z-50" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 max-sm:p-0 flex justify-center items-center">
              <div className="w-2/4 max-sm:w-full bg-white shadow-custom-shadow p-6">
                <div className="w-full flex justify-between items-center">
                  <h2 className={`text-[20px] font-bold text-gray-600`}>
                    Update Collections
                  </h2>
                  <div onClick={closeEditBox} className="cursor-pointer">
                    <RxCross1 size={20} />
                  </div>
                </div>

                <div className="mt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="col-span-1">
                      <Label htmlFor="title" title="Title" />
                      <input
                        name="title"
                        id="title"
                        placeholder="Enter case description"
                        className="w-full py-1 px-4 border border-gray-200 bg-white rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500"
                        defaultValue={items?.title}
                      />
                    </div>
                    <div className="col-span-1 my-4">
                      {!changeImage ? (
                        <div className="border border-gray-200 p-2">
                          <div className="flex justify-between items-center mb-4">
                            <p className="text-gray-600 text-[14px] font-semibold">
                              Image
                            </p>
                            <button
                              type="button"
                              onClick={() => setChangeImage(true)}
                              className="rounded-lg bg-bgg text-white text-[14px] px-2 py-1"
                            >
                              Change Image
                            </button>
                          </div>

                          <div className="w-full h-[250px] rounded-sm relative">
                            {imageLoading && <ImageSkeleton />}
                            <Image
                              src={items.image}
                              alt="banner"
                              fill
                              className="object-cover"
                              onLoad={() => setImageLoading(false)}
                            />
                          </div>
                        </div>
                      ) : (
                        <ImageUploader
                          image={image}
                          onFileSelect={uploadFile}
                          onRemove={reset}
                        />
                      )}
                    </div>

                    <div className="w-full h-8">
                      <ButtonWithSpinner loading={isLoading}>
                        Update
                      </ButtonWithSpinner>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionEdit;
