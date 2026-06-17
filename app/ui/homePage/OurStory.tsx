import Image from "next/image";
import womenhh from "../../../public/womenhh.png";
import womenm from "../../../public/womenm.png";

export default function OurStory() {
  return (
    <section className="w-full py-8 max-sm:py-6 px-12 max-md:px-4 max-sm:px-2">
      <span className="text-sm text-center uppercase tracking-[4px]  font-semibold text-blue">
        Why Coustomer Trust
      </span>
      <div className="max-sm:hidden">
        <Image
          src={womenhh}
          alt={"indian mill"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
      </div>
      <div className="max-sm:block hidden">
        <Image
          src={womenm}
          alt={"indian mill"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
      </div>
    </section>
  );
}
