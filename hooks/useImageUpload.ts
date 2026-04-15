"use client";
import { useState } from "react";
import { toast } from "sonner";

export type ImageItem = {
  preview: string;
  url?: string;
  fileId?: string;
  loading: boolean;
};

export function useImageUpload() {
  const [image, setImage] = useState<ImageItem | null>(null);

  const uploadFile = async (file: File) => {
    const preview = URL.createObjectURL(file);
    setImage({ preview, loading: true });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      setImage({
        preview,
        url: data.response.url,
        fileId: data.response.fileId,
        loading: false,
      });

      return data.url;
    } catch (error) {
      toast.error("Image upload failed");
      setImage(null);
    }
  };

  const reset = () => setImage(null);

  return { image, uploadFile, reset };
}