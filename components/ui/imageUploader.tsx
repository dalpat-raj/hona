"use client";

import { useState } from "react";

type UploadImage = {
  id: string;
  url?: string;
  status: "uploading" | "done";
};

type Props = {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  multiple?: boolean;
};

export default function ImageUploader({
  images,
  setImages,
  setUploading,
  multiple = false,
}: Props) {
  const [uploadItems, setUploadItems] = useState<UploadImage[]>([]);

  const uploadImages = async (files: File[]) => {
    setUploading(true);

    const tempItems: UploadImage[] = files.map(() => ({
      id: crypto.randomUUID(),
      status: "uploading",
    }));

    setUploadItems((prev) => [...prev, ...tempItems]);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const item = tempItems[i];

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setUploadItems((prev) =>
        prev.map((img) =>
          img.id === item.id ? { ...img, url: data.url, status: "done" } : img,
        ),
      );

      setImages((prev) => [...prev, data.url]);
    }

    setUploading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    uploadImages(files);
  };

  return (
    <div>
      <input
        id="image-upload"
        type="file"
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
      <label
        htmlFor="image-upload"
        className="inline-block cursor-pointer bg-green-700 text-white px-4 py-2 rounded-md text-sm"
      >
        {multiple ? "Upload Images" : "Upload Image"}
      </label>
    </div>
  );
}
