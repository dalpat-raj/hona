import dynamic from "next/dynamic";
import {
  CollectionsHomeSkeletons,
  ProductSliderSkeleton,
  TradingCoverSkeletons,
} from "@/app/ui/skeletons";
// import Event from "@/app/ui/homePage/event/Event";
import HomeSlider from "@/app/ui/homePage/HomeSlider";
const Products = dynamic(() => import("@/app/ui/homePage/ProductsZone"), {
  loading: () => <ProductSliderSkeleton />,
});

export default function Home() {
  return (
    <div className="!bg-blackOverlay">
      <HomeSlider />
      <Products />
      {/* <Event /> */}
    </div>
  );
}
