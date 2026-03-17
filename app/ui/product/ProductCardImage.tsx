"use client";
import { useState } from "react";
import Image from "next/image";
import { ImageSkeleton } from "@/app/ui/skeletons";

const ProductCardImage = ({ images }: { images: string[] }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const imageUrl1 = images[0];
  const imageUrl2 = images[1];
  return (
    <div className="image__hover__main cursor-pointer">
      <div className="col__1 transition duration-200 ease-in delay-100 h-[50vh] max-sm:h-[35vh] overflow-hidden">
        {imageLoading && <ImageSkeleton />}
        <Image
          src={imageUrl1 || "/e2.jpg"}
          alt={imageUrl1 || "Product image"}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          onLoad={() => setImageLoading(false)}
        />
      </div>
      <div className="col__2 max-md:hidden transition duration-200 ease-in-out delay-100 h-48">
        <Image
          src={imageUrl2 || "/e2.jpg"} // Use a placeholder
          alt={imageUrl2 || "Product image"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default ProductCardImage;
