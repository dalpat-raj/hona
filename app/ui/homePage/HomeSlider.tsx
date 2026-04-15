import { getBannerForHome } from "@/lib/data";
import { CarouselHome } from "./Carousel";

const Slider = async () => {
  const { data, error } = await getBannerForHome();
 

  return <CarouselHome banners={data} />;
};

export default Slider;
