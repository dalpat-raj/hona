import React, { Suspense } from "react";
export const dynamic = "force-dynamic";

import Checkout from "@/app/ui/homePage/cart/checkout/Checkout";
import LoaderBall from "@/app/ui/loader/BallLoader";
import { getCurrentUser } from "@/lib/auth";

const page = async () => {
  const user = await getCurrentUser();

  return (
    <div className="w-full px-12 pr-0 max-md:px-4 max-sm:px-2">
      <Suspense fallback={<LoaderBall />}>
        <Checkout user={user} />
      </Suspense>
    </div>
  );
};

export default page;
