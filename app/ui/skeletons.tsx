const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function TradingCoverSkeletons() {
  return (
    <div className="w-full my-8 max-md:my-4 px-12 max-md:px-4 max-sm:px-2">
      <div className="text-center mb-4 max-sm:mb-2">
        <h2 className="h-8 w-24 bg-gray-100"></h2>
      </div>

      <div className="mt-6 grid grid-cols-5 gap-4 grid-rows-2 max-md:grid-cols-3 max-sm:grid-cols-2">
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
      </div>

      <div className="w-full text-center mt-2">
        <button className="bg-[#333333] text-white px-8 py-2 rounded-sm">
          View All
        </button>
      </div>
    </div>
  );
}

export function ProductSliderSkeleton() {
  return (
    <div
      className={` relative overflow-hidden rounded-x p-2 shadow-sm w-full py-12 max-sm:py-6 px-12 max-md:px-4 max-sm:px-2`}
    >
      <div className="flex justify-between items-center mb-8  max-sm:mb-6">
        <h2 className={`${shimmer} h-8 w-36 bg-gray-100`}></h2>
        <button className={`${shimmer} h-8 w-24 bg-gray-100`}></button>
      </div>
      <div className="grid grid-cols-4 gap-4 max-md:grid-cols-4 max-sm:grid-cols-2">
        <div className="">
          <ProductSCardSkeletons />
        </div>
        <div className="">
          <ProductSCardSkeletons />
        </div>
        <div className="max-sm:hidden">
          <ProductSCardSkeletons />
        </div>
        <div className="max-sm:hidden">
          <ProductSCardSkeletons />
        </div>
      </div>
    </div>
  );
}

export function SearchProductSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden`}>
      <div className={`flex items-center gap-4 mb-2`}>
        <div className="w-[70px] h-[80px] bg-gray rounded-lg"></div>
        <p className="w-36 h-6 bg-gray rounded-lg"></p>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-white" />
        <div className="ml-2 h-6 w-16 rounded-md bg-white text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-4">
        <div className="h-7 w-20 rounded-md bg-gray-100" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="p-4 mt-4 ">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChartSkeleton />
          <LatestInvoicesSkeleton /> */}
      </div>
    </div>
  );
}

export function ProductsCardSkeletons() {
  return (
    <div className="bg-white p-4 rounded-md mt-4">
      <div className="grid grid-cols-4 gap-4 grid-rows-2 max-md:grid-cols-3 max-sm:grid-cols-2">
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
      </div>
    </div>
  );
}

export function ProductSCardSkeletons() {
  return (
    <div
      className={`${shimmer} relative bg-gray overflow-hidden  rounded-xl shadow-sm`}
    >
      <div className="h-[50vh] max-sm:h-[25vh] w-full">
        <div className="absolute top-0 right-0 uppercase bg-green-200 px-2 py-1">
          <p className="text-white text-[13px] font-semibold tracking-tightest h-5 w-16"></p>
        </div>
      </div>
      <div className="bg-white py-2 h-full">
        <div className="py-2 mt-2 w-5/6 rounded-xl text-[15px] h-4 bg-green-300"></div>
        <div className="flex items-center gap-2 mt-2 ">
          <div className="h-4 rounded-lg bg-green-300 w-3/6"></div>
          <p className="text-[14px] h-4 rounded-lg bg-green-300 w-1/6"></p>
        </div>
        <div className="py-2 flex gap-2 text-[15px] h-6">
          <p className="w-4/12 h-4 bg-green-300 rounded-xl"></p>
          <p className="w-4/12 h-4 bg-green-300 rounded-xl"></p>
        </div>
      </div>
    </div>
  );
}

export function CollectionProductCard() {
  return (
    <div
      className={`${shimmer} relative bg-gray-100 overflow-hidden  rounded-xl shadow-sm`}
    >
      <div className="bg-gray-200 h-[50vh] max-sm:h-[30vh] rounded-lg overflow-hidden ">
        <div className="h-full w-full absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flext items-center justify-center text-clip align-bottom hover:bg-none ">
          <p className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-24 rounded-lg h-6 bg-white"></p>
        </div>
      </div>
    </div>
  );
}

export function CollectionsHomeSkeletons() {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className={`text-[37px] fon font-extrabold`}>Our Collections</h2>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-4 gap-4 grid-rows-1 max-md:grid-cols-3 max-sm:grid-cols-2">
          <div className="col-span-1">
            <CollectionProductCard />
          </div>
          <div className="col-span-1">
            <CollectionProductCard />
          </div>
          <div className="col-span-1 max-sm:hidden">
            <CollectionProductCard />
          </div>
          <div className="col-span-1 max-sm:hidden">
            <CollectionProductCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CollectionsSkeletons() {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-[27px] fon font-extrabold">Catalog</h2>
      </div>
      <div className="grid grid-cols-4 gap-4 grid-rows-2 max-md:grid-cols-3 max-sm:grid-cols-2">
        {/* // card  */}
        <CollectionProductCard />
        <CollectionProductCard />
        <CollectionProductCard />
        <CollectionProductCard />
        <CollectionProductCard />
        <CollectionProductCard />
        <CollectionProductCard />
      </div>
    </div>
  );
}

export function CollectionDataSkeletons() {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-[27px] fon font-extrabold"></h2>
      </div>

      <div className="my-4">{/* <FilterButton  /> */}</div>

      <div className="grid grid-cols-5 gap-4 grid-rows-2 max-md:grid-cols-3 max-sm:grid-cols-2">
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
      </div>
    </div>
  );
}

export function ProductFilterSkeletons() {
  return (
    <>
      <ProductSCardSkeletons />
      <ProductSCardSkeletons />
      <ProductSCardSkeletons />
      <ProductSCardSkeletons />
      <ProductSCardSkeletons />
      <ProductSCardSkeletons />
      <ProductSCardSkeletons />
      <ProductSCardSkeletons />
      <ProductSCardSkeletons />
      <ProductSCardSkeletons />
    </>
  );
}

export function SimilarProductSkeleton() {
  return (
    <div className="w-full my-12 max-md:my-4 ">
      <div className="text-center mb-8">
        <h2 className="text-[27px] fon font-extrabold">You may also like</h2>
      </div>
      <div className="grid grid-cols-5 gap-4 grid-rows-1 max-md:grid-cols-4 max-sm:grid-cols-2">
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
        <ProductSCardSkeletons />
      </div>
    </div>
  );
}

export function ChartjsSkeleton() {
  return (
    <div
      className={`${shimmer} relative bg-gray-100 overflow-hidden rounded-xl shadow-sm`}
    >
      <div className="w-full h-[55vh] p-6 rounded-lg">
        <div className=" ">
          <p className="text-[14px] font-semibold text-gray-400">
            Total Revenue
          </p>
          <h2 className="text-[20px] font-bold mb-4 text-gray-800">
            INR 980,273.00
          </h2>
        </div>

        <div className="h-full">
          <div className="w-full h-full mt-4 grid grid-rows-12 grid-cols-12 gap-2">
            <div className="bg-gray-200 row-span-12 col-span-1 row-start-8 rounded-lg"></div>
            <div className="bg-gray-400 row-span-12 col-span-1 row-start-9 rounded-lg"></div>
            <div className="bg-gray-200 row-span-12 col-span-1 row-start-8 w-full rounded-lg"></div>
            <div className="bg-gray-200 row-span-12 col-span-1 row-start-10 w-full rounded-lg"></div>
            <div className="bg-gray-200 row-span-12 col-span-1 row-start-7 w-full rounded-lg"></div>
            <div className="bg-gray-200 row-span-12 col-span-1 row-start-6 w-full rounded-lg"></div>
            <div className="bg-gray-200 row-span-12 col-span-1 row-start-5 w-full rounded-lg"></div>
            <div className="bg-gray-200 row-span-12 col-span-1 row-start-4 w-full rounded-lg"></div>
            <div className="bg-gray-200 row-span-12 col-span-1 row-start-7 w-full rounded-lg"></div>
            <div className="bg-gray-200 row-span-12 col-span-1 row-start-6 w-full rounded-lg"></div>
            <div className="bg-gray-200 row-span-12 col-span-1 row-start-4 w-full rounded-lg"></div>
            <div className="bg-gray-200 row-span-12 col-span-1 row-start-6 w-full rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrdersCardSkeleton() {
  return (
    <div className={`${shimmer}relative rounded-xl shadow-sm`}>
      <div className="grid grid-cols-7 max-sm:grid-cols-4 shadow-md rounded-xl mb-4 py-2 bg-white">
        <div className="h-[35px]"></div>
        <div className="h-[35px]"></div>
        <div className="h-[35px]"></div>
        <div className="h-[35px]"></div>
        <div className="h-[35px]"></div>
        <div className="h-[35px]"></div>
        <div className="h-[35px]"></div>
      </div>
    </div>
  );
}

export function AllOrderSkeleton() {
  return (
    <div
      className={`relative bg-gray-100 overflow-hidden rounded-xl shadow-sm`}
    >
      <div className="">
        <div className="py-2 shadow-none">
          <div className="grid grid-cols-7 max-sm:grid-cols-4 px-4 gap-6">
            <div className="col-span-1 bg-white rounded-lg h-[20px]"></div>
            <div className="col-span-1 bg-white rounded-lg h-[20px] max-sm:hidden"></div>
            <div className="col-span-1 bg-white rounded-lg h-[20px]"></div>
            <div className="col-span-1 bg-white rounded-lg h-[20px] max-sm:hidden"></div>
            <div className="col-span-1 bg-white rounded-lg h-[20px]"></div>
            <div className="col-span-1 bg-white rounded-lg h-[20px]"></div>
            <div className="col-span-1 bg-white rounded-lg h-[20px] max-sm:hidden"></div>
          </div>
        </div>
        <div className="px-2 bg-gray-100 pt-2">
          <OrdersCardSkeleton />
          <OrdersCardSkeleton />
          <OrdersCardSkeleton />
          <OrdersCardSkeleton />
          <OrdersCardSkeleton />
          <OrdersCardSkeleton />
          <OrdersCardSkeleton />
        </div>
      </div>
    </div>
  );
}

export function OrderDetailsSkeleton() {
  return (
    <div className={`${shimmer} relative bg-white rounded-xl shadow-sm`}>
      <div className="p-4 h-full">
        <div className="grid grid-cols-5 grid-row-12 gap-6 h-full max-md:grid-cols-2 max-sm:flex flex-col">
          <div className="bg-gray-50 col-span-4 row-span-1 p-2 rounded-lg shadow-md max-md:col-span-2 h-11">
            <div className="flex justify-start items-center gap-4">
              <h2 className="w-44 h-6 rounded-lg bg-white">
                <p></p>
              </h2>
              <button className="flex items-center gap-1 bg-gray-200 py-1 px-2 rounded-lg h-8 w-48"></button>
            </div>
          </div>

          <div className="bg-gray-50 col-span-1 row-span-3 p-2 rounded-lg shadow-md max-md:col-span-1 max-md:col-start-1 max-md:row-start-9 h-22">
            <div className="flex flex-col gap-2">
              <h2 className="text-[18px] font-semibold text-gray-800">
                Payment
              </h2>
              <p className="h-5 bg-white w-16 rounded-lg"></p>
              <p className="flex min-h-5 bg-white w-24 rounded-lg"></p>
            </div>
          </div>

          <div className="bg-gray-50 col-span-2 row-span-4 p-2 rounded-lg shadow-md max-md:col-span-1  max-md:row-start-2 h-44">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-[16px] font-bold text-gray-900">
                  Order Summary
                </h2>
                <div className="bg-white h-4 w-24 rounded-lg"></div>
              </div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-[14px] font-semibold text-gray-700">
                  Order Created
                </p>
                <p className="bg-white h-4 w-28 rounded-lg"></p>
              </div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-[14px] font-semibold text-gray-700">
                  Order Time
                </p>
                <p className="bg-white h-4 w-20 rounded-lg"></p>
              </div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-[14px] font-semibold text-gray-700">
                  Subtotal
                </p>
                <p className="bg-white h-4 w-24 rounded-lg"></p>
              </div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-[14px] font-semibold text-gray-700">
                  Shipping Charge
                </p>
                <p className="bg-white h-4 w-24 rounded-lg"></p>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-[16px] font-semibold ">Total</p>
                <p className="bg-white h-6 w-28 rounded-lg"></p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 col-span-2 row-span-4 p-2 rounded-md shadow-md max-md:col-span-1 max-md:row-start-2 max-md:col-start-2 h-44">
            <div>
              <div className="mb-2">
                <h2 className="text-[16px] font-bold text-gray-900">
                  Delivery Address
                </h2>
              </div>
              <div className="flex justify-start items-center gap-2 mb-1">
                <p className="text-[14px] font-semibold text-gray-700">
                  Address:
                </p>
                <p className="bg-white h-4 w-20 rounded-lg"></p>
              </div>
              <div className="flex justify-start items-center gap-2 mb-1">
                <p className="text-[14px] font-semibold text-gray-700">
                  Landmark:
                </p>
                <p className="bg-white h-4 w-20 rounded-lg"></p>
              </div>
              <div className="flex justify-start items-center gap-2 mb-1">
                <p className="text-[14px] font-semibold text-gray-700">City:</p>
                <p className="bg-white h-4 w-20 rounded-lg"></p>
              </div>
              <div className="flex justify-start items-center gap-2 mb-1">
                <p className="text-[14px] font-semibold text-gray-700">
                  State:
                </p>
                <p className="bg-white h-4 w-20 rounded-lg"></p>
              </div>
              <div className="flex justify-start items-center gap-2 mb-1">
                <p className="text-[14px] font-semibold text-gray-700">
                  PinCode:
                </p>
                <p className="bg-white h-4 w-20 rounded-lg"></p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 col-span-1 row-span-1 rounded-lg shadow-md overflow-hidden max-md:col-span-1 max-md:row-start-7 max-md:row-span-1 h-8">
            {/* invoice  */}
          </div>

          <div className="bg-gray-50 col-span-1 row-span-1 rounded-lg shadow-md overflow-hidden max-md:col-span-1 max-md:row-span-1 h-16">
            {/* <Status order={order}/> */}
          </div>

          <div className="bg-gray-50 col-span-4 row-span-7 p-2 rounded-lg shadow-md max-md:col-span-2 h-full">
            <div>
              <div className="border-b border-gray-300 grid grid-cols-6 max-sm:grid-cols-4 gap-2 pb-2">
                <h2 className="text-gray-900 text-[16px] font-semibold">
                  Items Summary
                </h2>
                <p className="text-[14px] font-semibold text-gray-700 max-sm:hidden">
                  Model
                </p>
                <p className="text-[14px] font-semibold text-gray-700">
                  Model Number
                </p>
                <p className="text-[14px] font-semibold text-gray-700">
                  Quantity
                </p>
                <p className="text-[14px] font-semibold text-gray-700 max-sm:hidden">
                  Price
                </p>
                <p className="text-[14px] font-semibold text-gray-700">
                  Total Price
                </p>
              </div>
              {/* // item map  */}
              <div className="grid grid-cols-6 max-sm:grid-cols-4  items-center gap-2 py-2 border-b border-gray-300">
                <div className="flex gap-2">
                  <div className="max-md:hidden w-[50px] h-[50px] bg-gray-200"></div>
                  <p className="bg-white h-4 w-24 rounded-lg"></p>
                </div>
                <div className="bg-white h-4 w-24 rounded-lg max-sm:hidden">
                  <p></p>
                </div>
                <div className="bg-white h-4 w-28 rounded-lg">
                  <p></p>
                </div>
                <div className="bg-white h-4 w-16 rounded-lg">
                  <p></p>
                </div>
                <div className="bg-white h-4 w-32 rounded-lg max-sm:hidden">
                  <p>RS. </p>
                </div>
                <div className="bg-white h-4 w-24 rounded-lg">
                  <p>RS. </p>
                </div>
              </div>
              <div className="grid grid-cols-6 max-sm:grid-cols-4  items-center gap-2 py-2 border-b border-gray-300">
                <div className="flex gap-2">
                  <div className="max-md:hidden w-[50px] h-[50px] bg-gray-200"></div>
                  <p className="bg-white h-4 w-24 rounded-lg"></p>
                </div>
                <div className="bg-white h-4 w-24 rounded-lg max-sm:hidden">
                  <p></p>
                </div>
                <div className="bg-white h-4 w-28 rounded-lg">
                  <p></p>
                </div>
                <div className="bg-white h-4 w-16 rounded-lg">
                  <p></p>
                </div>
                <div className="bg-white h-4 w-32 rounded-lg max-sm:hidden">
                  <p>RS. </p>
                </div>
                <div className="bg-white h-4 w-24 rounded-lg">
                  <p>RS. </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 col-span-1 p-2 rounded-lg shadow-md max-md:col-span-1 max-md:row-span-2 max-md:row-start-6  max-md:col-start-2 h-40">
            <div>
              <div className="flex justify-center items-center max-sm:justify-start">
                <div className="bg-gray-200 w-[40px] h-[40px] rounded-full"></div>
              </div>
              <div className="flex justify-start gap-2 items-center mb-1">
                <p className="text-[13px] font-semibold text-gray-700">Name:</p>
                <p className="bg-white rounded-lg h-4 w-24"></p>
              </div>
              <div className="flex justify-start gap-2 items-center mb-1">
                <p className="text-[13px] font-semibold text-gray-700">
                  Email:
                </p>
                <p className="bg-white rounded-lg h-4 w-32"></p>
              </div>
              <div className="flex justify-start gap-2 items-center mb-1">
                <p className="text-[13px] font-semibold text-gray-700">
                  Phone:
                </p>
                <p className="bg-white rounded-lg h-4 w-24"></p>
              </div>
              <div className="flex justify-start gap-2 items-center mb-1">
                <p className="text-[13px] font-semibold text-gray-700">
                  Join Us:
                </p>
                <p className="bg-white rounded-lg h-4 w-32"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ImageSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden w-full h-full`}>
      <div className="bg-gray w-full h-full"></div>
    </div>
  );
}
