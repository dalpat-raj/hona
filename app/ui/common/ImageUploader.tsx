"use client";

import Image from "next/image";
import { ImageSkeleton } from "@/app/ui/skeletons";

type Props = {
  image: any;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
};

export default function ImageUploader({
  image,
  onFileSelect,
  onRemove,
}: Props) {
  return (
    <div className="w-full h-[270px] rounded-md border border-dashed border-green flex justify-center items-center relative">
      {image ? (
        <div className="w-full h-full relative">
          <button
            onClick={onRemove}
            className="rounded-lg bg-green-700 text-white text-[14px] px-2 py-1 absolute right-[5px] top-[5px] z-10"
          >
            Change
          </button>

          {image.loading ? (
            <ImageSkeleton />
          ) : (
            image.url && (
              <Image
                src={image.url}
                alt="preview"
                fill
                className="object-cover rounded-md p-1"
              />
            )
          )}
        </div>
      ) : (
        <div
          className="w-full h-full flex flex-col justify-center items-center cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) onFileSelect(file);
          }}
        >
          <p className="text-gray-500 text-sm">
            Drag & Drop image here
          </p>
          <p className="text-gray-400 text-xs mt-1">
            or click to upload
          </p>

          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFileSelect(file);
            }}
          />
        </div>
      )}
    </div>
  );
}