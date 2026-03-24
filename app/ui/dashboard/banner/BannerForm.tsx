import { createBanner } from "@/action/banner";
import Label from "../../label/Label";
import { useState } from "react";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import { caveat } from "@/app/ui/Fonts";
import { toast } from "sonner";
import { ImageSkeleton } from "@/app/ui/skeletons";
import ButtonWithSpinner from "@/app/ui/button/ButtonWithSpinner";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type ImageItem = {
  preview: string;
  url?: string;
  loading: boolean;
};

export function BannerForm({ setOpen }: Props) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<ImageItem | null>(null);
  const isUploading = image?.loading;

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ preview + skeleton
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

      // ✅ image replace
      setImage({
        preview,
        url: data.url,
        loading: false,
      });
    } catch (error) {
      toast.error("Image upload failed");
      setImage(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    try {
      if (!image?.url) {
        toast.error("Please upload image");
        return;
      }
      const bannerAddAction = createBanner.bind(null, image.url);
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
    // setImages([]);
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
            {image ? (
              <div className="w-full h-full relative">
                {/* Change Button */}
                <button
                  onClick={() => setImage(null)}
                  className="rounded-lg bg-green-700 text-white text-[14px] px-2 py-1 absolute right-[5px] top-[5px] z-10"
                >
                  Change
                </button>

                {/* Skeleton OR Image */}
                {image.loading ? (
                  <ImageSkeleton />
                ) : (
                  <Image
                    src={image.url!}
                    alt="banner"
                    fill
                    className="object-cover rounded-md p-1"
                  />
                )}
              </div>
            ) : (
              <input type="file" onChange={uploadImage} />
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
