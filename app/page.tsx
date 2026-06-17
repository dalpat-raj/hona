import dynamic from "next/dynamic";

import {
  CollectionsHomeSkeletons,
  ProductSliderSkeleton,
  TradingCoverSkeletons,
} from "@/app/ui/skeletons";
// import Event from "@/app/ui/homePage/event/Event";
import HomeSlider from "@/app/ui/homePage/HomeSlider";
import OurPartner from "@/app/ui/homePage/OurPartner";
import OurCollection from "@/app/ui/homePage/OurCllections";
import Blog from "@/app/ui/homePage/Blog";
import OurStory from "@/app/ui/homePage/OurStory";
const Products = dynamic(() => import("@/app/ui/homePage/ProductsZone"), {
  loading: () => <ProductSliderSkeleton />,
});

export default function Home() {
  return (
    <div className="bg-bga">
      <HomeSlider />
      <OurCollection/>
      <OurStory/>
      <Products />
      <Blog/>
      <OurPartner/>
      {/* <Event /> */}
    </div>
  );
}
