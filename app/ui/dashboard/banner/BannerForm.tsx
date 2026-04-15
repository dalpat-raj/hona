import { createBanner } from "@/action/banner";
import Label from "../../label/Label";
import { useState } from "react";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import { toast } from "sonner";
import { ImageSkeleton } from "@/app/ui/skeletons";
import ButtonWithSpinner from "@/app/ui/button/ButtonWithSpinner";
import { useImageUpload } from "@/hooks/useImageUpload";
import ImageUploader from "@/app/ui/common/ImageUploader";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function BannerForm({ setOpen }: Props) {
  const { image, uploadFile, reset } = useImageUpload();
  const [loading, setLoading] = useState(false);
  const isUploading = image?.loading;

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!image?.url || !image?.fileId) {
    toast.error("Please upload image");
    return;
  }

  setLoading(true);

  const formData = new FormData(event.currentTarget);

  try {
    const data = await createBanner(
      image.url,
      image.fileId,
      formData
    );

    if (data?.success) toast.success(data.success);
    if (data?.error) toast.error(data.error);
  } catch (error) {
    toast.error("Error submitting form 😢");
  } finally {
    setOpen(false);
    setLoading(false);
  }
};

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-2/4 max-sm:w-5/6 bg-white shadow-custom-shadow rounded-md p-6">
        <div className="w-full flex justify-between items-center">
          <h4 className={`text-[22px] font-bold text-blue`}>Create Banner</h4>
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

          <div className="my-4 w-full h-[270px] rounded-md border border-dashed border-green flex justify-center items-center relative">
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
                      className="object-cover rounded-md p-1"
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

          <div className="w-full h-8">
            <ButtonWithSpinner
              loading={loading}
              disabled={loading || isUploading}
            >
              {isUploading ? "Uploading..." : "Create Banner"}
            </ButtonWithSpinner>
          </div>
        </form>
      </div>
    </div>
  );
}
