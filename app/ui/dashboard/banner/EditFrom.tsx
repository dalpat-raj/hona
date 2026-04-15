import { EditBanner } from "@/action/banner";
import Label from "../../label/Label";
import { useState } from "react";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import { BannerData } from "@/lib/definations";
import { caveat } from "@/app/ui/Fonts";
import { toast } from "sonner";
import { ImageSkeleton } from "@/app/ui/skeletons";
import ButtonWithSpinner from "@/app/ui/button/ButtonWithSpinner";
import { useImageUpload } from "@/hooks/useImageUpload";
import ImageUploader from "@/app/ui/common/ImageUploader";

type Props = {
  editData: BannerData | any;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EditForm({ editData, setEditOpen }: Props) {
  const { image, uploadFile, reset } = useImageUpload();
  const [changeImage, setChangeImage] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    if (changeImage && !image?.url) {
      toast.error("Please upload new image");
      setLoading(false);
      return;
    }
    try {
      const data = await EditBanner(
        editData.id,
        image?.url || editData.image,
        image?.fileId || editData.fileId,
        editData.fileId,
        formData,
      );
      if (data?.success) {
        toast.success(data.success);
        setEditOpen(false);
      }
      if (data?.error) toast.error(data.error);
    } catch (error) {
      toast.error("Error submitting form 😢");
    } finally {
      setEditOpen(false);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-2/4 max-sm:w-5/6 bg-white shadow-custom-shadow rounded-md p-6">
        <div className="w-full flex justify-between items-center">
          <h2
            className={`${caveat.className} text-[26px] font-bold text-gray-700`}
          >
            Edit Banner
          </h2>
          <div onClick={() => setEditOpen(false)} className="cursor-pointer">
            <RxCross1 size={20} />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <Label htmlFor="url" title="URL" />
            <input
              type="text"
              id="url"
              placeholder="/products/product-name"
              name="url"
              defaultValue={editData?.url}
              required
              className="w-full py-1 px-4 border border-gray-200 bg-white rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500"
            />
          </div>

          <div className="my-4">
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
                    src={editData.image}
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
            <ButtonWithSpinner loading={loading}>
              Update Banner
            </ButtonWithSpinner>
          </div>
        </form>
      </div>
    </div>
  );
}
