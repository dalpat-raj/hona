import React, { useState } from "react";
import { ImageSkeleton } from "@/app/ui/skeletons";
import Image from "next/image";
import { VariantImage } from "@/lib/definations";

const ProdImg = ({ item }: { item: VariantImage[] }) => {

  const [imageLoading, setImageLoading] = useState(true);
  return (
    <div className="flex justify-start gap-2">
      {item?.slice(0, 4)?.map((img, i) => (
        <div className="w-[60px] h-[70px] border border-gray-400 rounded-md" key={i}>
          {imageLoading && <ImageSkeleton />}
          <Image
            src={img.url}
            alt={img?.url}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onLoad={() => setImageLoading(false)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProdImg;
