import { getBannerForHome } from "@/lib/data";
import { CarouselHome } from "./Carousel";

const Slider = async () => {
  const { data, error } = await getBannerForHome();
  if (error) {
    return (
      <div className="text-center font-bold my-28">No banner Available</div>
    );
  }

  return <CarouselHome banners={data} />;
};

export default Slider;
