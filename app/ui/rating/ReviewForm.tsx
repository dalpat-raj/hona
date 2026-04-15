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

const ReviewForm: React.FC<ProductDetailsProps> = ({
  setReviewBox,
  user,
  product,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [imagesShow, setImagesShow] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [imageLoading, setImageLoading] = useState(true);
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

  const handleUploadComplete = (res: any) => {
    if (res) {
      const urls = res.map((file: { url: string }) => file.url);
      setImagesShow(urls);
      return urls;
    }
  };

  async function handleReviewSubmit(data: Review) {
    if (rating <= 1) {
      toast.error("Please Select Rating");
      return;
    }
    startTransition(() => {
      reviewAdd(data, product?.id, rating, imagesShow)
        .then((res) => {
          setReviewBox(false);
          if (res?.success) toast.success(res.success);
          if (res?.error) toast.error(res.error);
        })
        .catch((error) => {
          setReviewBox(false);
          toast.error("Error something wrong 😢");
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
              src={product?.images[0] ? product?.images[0] : "/e22.png"}
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
              <Rating rating={product?.rating} />
              <p className="text-[14px] text-gray-500">
                {product?.review.length} reviews
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
              Your Name
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
            <div className="flex justify-start gap-2 items-center my-2 mb-4 overflow-x-scroll no-scrollbar">
              {imagesShow?.map((item, i) => (
                <div className="w-[50px] h-[50px]" key={i}>
                  {imageLoading && <ImageSkeleton />}
                  <Image
                    src={item || "/e22.jpg"}
                    alt={`Image ${i + 1}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onLoad={() => setImageLoading(false)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="my-2 max-sm:my-4 w-[100%] flex justify-start items-start">
              
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
