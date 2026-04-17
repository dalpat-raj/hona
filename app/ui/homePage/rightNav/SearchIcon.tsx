"use client";
import { useEffect, useState } from "react";
import { IoSearch  } from "react-icons/io5";
import Search from "@/app/ui/homePage/rightNav/Search";
import { RxCross2 } from "react-icons/rx";
import clsx from "clsx";
import { caveat } from "@/app/ui/Fonts";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Product } from "@/lib/definations";
import { ImageSkeleton, SearchProductSkeleton } from "@/app/ui/skeletons";
import Link from "next/link";
import { formatTitle } from "@/lib/helpers";

const SearchIcon = () => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  const query = searchParams.get("query");

  const fetchProducts = async (searchTerm: string) => {
    setIsFirstLoad(true);
    const query = new URLSearchParams();
    query.append("query", searchTerm);
    console.log(query.get("brand"));
    
    const response = await fetch(`/api/products?${query.toString()}`);
    const data = await response.json();

    setProducts(data.products);
    setIsFetching(false);
  };

  useEffect(() => {
    if (query) {
      fetchProducts(query);
    } else {
      setIsFirstLoad(false);
      setIsFetching(false);
      setProducts([]);
    }
  }, [query]);

  return (
    <>
      <div
        className="cursor-pointer text-blue font-bold transition-all ease-out hover:scale-110 max-md:hover:scale-100"
        onClick={() => setOpenSearch(!openSearch)}
      >
        <IoSearch size={21} color="text-blue" />
      </div>

      <div
        onClick={() => setOpenSearch(!openSearch)}
        className={clsx(
          "h-screen w-4/6 max-lg:w-2/4 max-sm:w-0 fixed -top-0 left-0 z-50 cursor-pointer bg-blackOverlay addCartExtra",
          { "hidden fixed -top-0 -left-3/4": openSearch !== true },
        )}
      ></div>
      <div
        className={clsx(
          "h-screen no-scrollbar overflow-scroll bg-white w-2/6 max-lg:w-2/4 max-sm:w-full fixed top-0 right-0 z-50 addCart p-6 max-sm:p-2 max-sm:pt-6",
          { "hidden fixed -top-0 -right-1/4": openSearch !== true },
        )}
      >
        <div className="flex justify-between items-center">
          <h2 className={`text-blue font-bold text-[22px]`}>
            Search Here
          </h2>
          <RxCross2
            size={25}
            onClick={() => setOpenSearch(!openSearch)}
            className="cursor-pointer text-red-600"
          />
        </div>
        <Search setIsFetching={setIsFetching} setProducts={setProducts} />

        <div className="mt-6">
          {isFetching && (
            <div>
              <SearchProductSkeleton />
              <SearchProductSkeleton />
            </div>
          )}

          {!isFetching && isFirstLoad && products?.length === 0 && (
            <div className="text-[14px] text-blue h-[50vh] flex justify-center items-center font-semibold">
              ❌ Product not found !
            </div>
          )}
          {products?.map((item, i) => (
            <Link href={`/products/${formatTitle(item?.title)}`} key={i} onClick={()=>setOpenSearch(false)}>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-[70px] h-[80px]">
                  {imageLoading && <ImageSkeleton />}
                  <Image
                    src={item?.variants[0]?.images[0]?.url || item?.variants[0]?.images[1]?.url}
                    alt={item?.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onLoad={() => setImageLoading(false)}
                  />
                </div>
                <p className="text-[14px] text-blue">
                  {item?.title.slice(0, 30)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchIcon;
