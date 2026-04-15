import dynamic from "next/dynamic";
import LoaderBall from "@/app/ui/loader/BallLoader";
const Banner = dynamic(() => import("@/app/ui/dashboard/banner/Banner"), {
  loading: () => <LoaderBall />,
});
import { getBanner } from "@/lib/data";

const page = async () => {
  const { data, error } = await getBanner();

  if (error) {
    return <div>No Banner Found</div>;
  }
  return <Banner banners={data} />;
};

export default page;
