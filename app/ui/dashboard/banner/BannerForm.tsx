import { createBanner } from "@/action/banner";
import Label from "../../label/Label";
import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import { caveat } from "@/app/ui/Fonts";
import { toast } from "sonner";
import { ImageSkeleton } from "@/app/ui/skeletons";
import ButtonWithSpinner from "@/app/ui/button/ButtonWithSpinner";
import ImageUploader from "@/components/ui/imageUploader";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function BannerForm({ setOpen }: Props) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [imageUploading, setImageUploading] = useState(false);

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    setImageUploading(true);

    try {
      const uploadedUrls: string[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        uploadedUrls.push(data.url);
      }

      setImages(uploadedUrls);
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    try {
      const bannerAddAction = createBanner.bind(null, images);
      const data = await bannerAddAction(formData);
      if (data?.success) toast.success(data.success);
      if (data?.error) toast.error(data.error);
    } catch (error: any) {
      console.log(error?.message);
      toast.error("Error submitting form 😢");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const handleChange = () => {
    setImages([]);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-2/4 max-sm:w-5/6 bg-white shadow-custom-shadow rounded-md p-6">
        <div className="w-full flex justify-between items-center">
          <h4
            className={`${caveat.className} text-[26px] font-bold text-gray-700`}
          >
            Create Banner
          </h4>
          <div onClick={() => setOpen(false)} className="cursor-pointer">
            <RxCross1 size={20} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="border-0">
          <div className="my-4">
            <Label htmlFor="url" title="URL" />
            <input
              type="text"
              id="url"
              placeholder="/products/product-name"
              name="url"
              required
              className="w-full py-1 px-4 border border-gray-200 bg-white rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500"
            />
          </div>

          <div className="my-4 w-full h-[270px] rounded-md border border-dashed border-green-300 flex justify-center items-center relative">
            {images?.length >= 1 ? (
              <div className="">
                <button
                  onClick={handleChange}
                  className="rounded-lg bg-green-700 text-white text-[14px] px-2 py-1 absolute right-[5px] top-[5px] z-10"
                >
                  Change
                </button>
                <div className="">
                  {images?.map((img, i) => (
                    <div className="w-full h-full rounded-sm" key={i}>
                      {imageUploading && <ImageSkeleton />}
                      <Image
                        src={img}
                        alt={img}
                        fill
                        style={{
                          borderRadius: "10px",
                          padding: "5px",
                        }}
                        onLoad={() => setImageUploading(false)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="">
                <ImageUploader
                  images={images}
                  setImages={setImages}
                  setUploading={setImageUploading}
                />
              </div>
            )}
          </div>

          <div className="w-full h-8">
            <ButtonWithSpinner loading={loading}>
              Create Banner
            </ButtonWithSpinner>
          </div>
        </form>
      </div>
    </div>
  );
}
