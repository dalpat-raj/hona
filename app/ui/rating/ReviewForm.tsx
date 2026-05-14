import React, { useState, useTransition } from "react";
import { caveat } from "../Fonts";
import { RxCross1 } from "react-icons/rx";
import Rating from "./Rating";
import Image from "next/image";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { reviewAdd } from "@/action/reviews";
import { Product, User } from "@/lib/definations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema } from "@/schema";
import { toast } from "sonner";
import { TfiHandPointLeft } from "react-icons/tfi";
import ButtonWithSpinner from "@/app/ui/button/ButtonWithSpinner";
import { CiImageOn } from "react-icons/ci";
import { z } from "zod";
import { ImageSkeleton } from "@/app/ui/skeletons";

type ProductDetailsProps = {
  setReviewBox: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  product: Product;
};

type Review = z.infer<typeof reviewSchema>;
type UploadImage = {
  preview: string;
  url: string;
  fileId: string;
  loading: boolean;
};

const ReviewForm: React.FC<ProductDetailsProps> = ({
  setReviewBox,
  user,
  product,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [imagesShow, setImagesShow] = useState<UploadImage[]>([]);
  const [isPending, startTransition] = useTransition();
  const [imageLoading1, setImageLoading1] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Review>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: user?.name ? user?.name : "",
      email: user?.email,
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const filesArray = Array.from(files);

    // preview add
    const newImages = filesArray.map((file) => ({
      preview: URL.createObjectURL(file),
      url: "",
      fileId: "",
      loading: true,
    }));

    setImagesShow((prev) => [...prev, ...newImages]);

    filesArray.forEach(async (file, i) => {
      try {
        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: fd,
        });

        const data = await res.json();

        setImagesShow((prev) => {
          const updated = [...prev];
          const index = updated.length - filesArray.length + i;

          updated[index].url = data.response?.url;
          updated[index].fileId = data.response?.fileId;
          updated[index].loading = false;

          if (updated[index].url) {
            URL.revokeObjectURL(updated[index].preview);
          }

          return updated;
        });
      } catch {
        toast.error("Upload failed");
      }
    });
  };

  async function handleReviewSubmit(data: Review) {
    if (rating <= 1) {
      toast.error("Please Select Rating");
      return;
    }
    const cleanImages = imagesShow
      .filter((img) => img.url && !img.loading)
      .map((img) => ({
        url: img.url,
        fileId: img.fileId,
      }));

    startTransition(() => {
      reviewAdd(data, product?.id, rating, cleanImages, user?.id)
        .then((res) => {
          if (res?.success) toast.success(res.success);
          if (res?.error) toast.error(res.error);
          setReviewBox(false);
        })
        .catch((error) => {
          toast.error("Error something wrong 😢");
          setReviewBox(false);
        });
    });
  }

  return (
    <div className="py-6 px-4">
      <div className="flex justify-between items-center">
        <h2 className={`${caveat.className} text-[24px] font-bold`}>Rate Us</h2>
        <RxCross1
          size={20}
          onClick={() => setReviewBox(false)}
          className="cursor-pointer"
        />
      </div>

      <div className="border-2 border-gray-200 p-2 mt-2">
        <div className="flex justify-start items-center gap-4">
          <div className="w-[50px] h-[50px]">
            {imageLoading1 && <ImageSkeleton />}
            <Image
              src={
                product?.variants[0]?.images[0]?.url ||
                product?.variants[1]?.images[0]?.url
              }
              alt="al"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onLoad={() => setImageLoading1(false)}
            />
          </div>
          <div>
            <p className="text-[14px] font-bold">{product?.title}</p>
            <div className="flex justify-start items-center gap-2">
              <Rating rating={product?.ratings} />
              <p className="text-[14px] text-gray-500">
                {product?.reviews.length} reviews
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full my-4 h-[2px] border border-gray-200"></div>

      <div className="flex justify-start items-center gap-6">
        <p className="text-[13px] font-bold">QUALITY</p>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((i) =>
            rating >= i ? (
              <AiFillStar
                key={i}
                className="cursor-pointer"
                onClick={() => setRating(i)}
                color="rgb(246,186,0)"
                size={30}
              />
            ) : (
              <AiOutlineStar
                key={i}
                className="cursor-pointer"
                onClick={() => setRating(i)}
                color="rgb(246,186,0)"
                size={30}
              />
            ),
          )}
        </div>
        <p className="font-bold text-[24px] text-red-400">
          <TfiHandPointLeft />
        </p>
      </div>

      <div className="mt-4">
        <form onSubmit={handleSubmit(handleReviewSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="text-[12px] font-semibold">
              Display Name
            </label>
            <input
              {...register("name")}
              id="name"
              type="text"
              placeholder="Sonu sharma"
              name="name"
              className="w-full text-[14px] text-gray-600 py-1 px-2 border border-gray-200 rounded-lg focus:outline-gray-400 "
            />
            {errors.name && (
              <p className="text-red-500 text-[13px]">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="text-[12px] font-semibold">
              Your Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="example@gmail.com"
              name="email"
              className="w-full text-[14px] text-gray-600 py-1 px-2 border border-gray-200 rounded-lg focus:outline-gray-400 "
            />
            {errors.email && (
              <p className="text-red-500 text-[13px]">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="comm" className="text-[12px] font-semibold">
              Review Comment
            </label>
            <textarea
              {...register("message")}
              id="comm"
              name="message"
              rows={4}
              placeholder="Type your good message!"
              className="w-full text-[14px] font-normal py-1 px-2 border border-gray-200 rounded-lg focus:outline-gray-400"
            />
            {errors.message && (
              <p className="text-red-500 text-[13px]">
                {errors.message.message}
              </p>
            )}
          </div>

          {imagesShow?.length >= 1 ? (
            <div className="flex gap-2 overflow-x-auto my-3">
              {imagesShow.map((img, i) => (
                <div key={i} className="w-[60px] h-[60px] relative">
                  {/* remove button */}
                  <button
                    onClick={() =>
                      setImagesShow((prev) =>
                        prev.filter((_, idx) => idx !== i),
                      )
                    }
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 z-10"
                  >
                    X
                  </button>

                  {img.loading ? (
                    <ImageSkeleton />
                  ) : (
                    <Image
                      src={img.url || img.preview}
                      alt="review"
                      fill
                      className="object-cover rounded"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="my-2 max-sm:my-4 w-[100%] flex justify-start items-start">
              <label className="cursor-pointer flex items-center gap-2 text-sm text-gray-600">
                <CiImageOn size={20} />
                Upload Images
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          )}

          <div className="w-full h-10 flex gap-6">
            <ButtonWithSpinner loading={isPending}>Submit</ButtonWithSpinner>
            <button
              onClick={() => setReviewBox(false)}
              className="border border-gray-200 w-full h-full rounded-md"
            >
              Cancle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
