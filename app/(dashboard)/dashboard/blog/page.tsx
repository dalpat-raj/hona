import dynamic from "next/dynamic";
import LoaderBall from "@/app/ui/loader/BallLoader";
import { getBlog } from "@/lib/data";
import Blog from "@/app/ui/dashboard/blog/Blog";

const page = async () => {
  const { data, error } = await getBlog();
    
  if (error) {
    return <div>No Banner Found</div>;
  }
  return <Blog blogs={data} />;
};

export default page;
