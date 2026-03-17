import { getBannerForHome } from "@/lib/data";
import { CarouselHome } from "./Carousel";

const Slider = async () => {
  const banner = await getBannerForHome();

  return <CarouselHome banners={banner} />;
};

export default Slider;
