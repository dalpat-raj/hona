"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ImageSkeleton } from "@/app/ui/skeletons";
import Rating from "@/app/ui/rating/Rating";
const ReviewForm = dynamic(() => import("@/app/ui/rating/ReviewForm"), {
  ssr: false,
});
import { Product, SessionUser } from "@/lib/definations";
import { formatDate } from "@/lib/helpers";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ProductDetailsProps {
  user: SessionUser | undefined;
  product: Product;
}

const ProductReview: React.FC<ProductDetailsProps> = ({ user, product }) => {
  // const ProductReview: React.FC<ProductDetailsProps> = ({user, product}) => {
  const [reviewBox, setReviewBox] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState(true);

  if (reviewBox) {
    return (
      <div className="h-full w-full fixed top-0 left-0 bg-blackOverlay flex justify-center items-center z-50">
        <div className="bg-white h-auto w-auto max-sm:h-full max-sm:w-full overflow-scroll no-scrollbar">
          <ReviewForm
            setReviewBox={setReviewBox}
            user={user}
            product={product}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-green-200 pb-2 mb-2">
        <h2 className={`text-[14px] text-green-900 font-semibold`}>
          Coustomer Reviews
        </h2>
      </div>
      <div className="w-full flex justify-center items-center border-b border-green-200 pb-4 mb-4">
        <div className="flex flex-col  gap-1 items-center ">
          <h2 className="text-[18px] font-bold text-green-900">
            {product?.rating?.toFixed(1)}
          </h2>
          <div>
            <Rating rating={product?.rating?.toFixed(1)} />
          </div>
          <p className="text-sm text-green-900">
            {product?.review?.length} reviews
          </p>
          <button
            onClick={() => setReviewBox(!reviewBox)}
            className="bg-green-700 text-white capitalize py-1 px-4 rounded-sm text-md font-bold"
          >
            write a review
          </button>
        </div>
      </div>

      <div>
        {product?.review.map((item, i) => (
          <div className="mb-6 border-b border-gray-100 pb-4" key={i}>
            <div className="flex justify-between">
              <div className="flex justify-start items-center bg-gray-200 w-max pr-2 rounded-lg gap-1">
                <div className="w-6 h-6 rounded-full bg-green-500 flex justify-center items-center p-1 text-[16px] text-white font-bold">
                  {item.name.slice(0, 1)}
                </div>
                <p className="text-[14px]">{item.name}</p>
              </div>

              <div className="flex justify-center items-center gap-2 text-[12px] text-gray-400">
                <p>{formatDate(item.createdAt)}</p>
                <p>
                  {item.createdAt.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
            <div className="my-2">
              <Rating rating={item.rating} />
            </div>
            <div>
              <p className="text-gray-500 leading-none">{item.message}</p>
            </div>
            <div className="flex gap-2 mt-2">
              {item.images?.map((item, i) => (
                <div key={i}>
                  <Dialog>
                    <DialogTrigger>
                      <div className="w-[70px] h-[70px]">
                        {imageLoading && <ImageSkeleton />}
                        <Image
                          src={item}
                          alt={i + item}
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
                    </DialogTrigger>
                    <DialogContent>
                      <div className="h-[70vh]">
                        <Image
                          src={item}
                          alt={item}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReview;
