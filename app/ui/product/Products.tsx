"use client";
import { useEffect, useState, ChangeEvent, useRef } from "react";
import FilterButton from "@/app/ui/collections/FilterButton";
import ProductCard from "@/app/ui/product/ProductCard";
import { Product } from "@/lib/definations";
import { ProductFilterSkeletons } from "@/app/ui/skeletons";
import { useSearchParams } from "next/navigation";

const Products = ({ titles }: { titles: string }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const brandFromUrl = searchParams.get("brand");
  const [filters, setFilters] = useState({
    collection: titles,
    minPrice: 500,
    maxPrice: 50000,
    stock: undefined,
    color: "",
    power: "",
    brand: brandFromUrl || "",
  });
  const [sortFilter, setSortFilter] = useState({
    popular: false,
    newest: false,
    plth: false,
    phtl: false,
  });
  const limit = 8;
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef(0);

  const handleFilterChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => {
      // 🔥 price slider special case
      if (name === "priceRange") {
        const { min, max } = JSON.parse(value);
        return {
          ...prevFilters,
          minPrice: min,
          maxPrice: max,
        };
      }
      return {
        ...prevFilters,
        [name]: value,
      };
    });

    setPage(1);
    setProducts([]);
  };

  const handleSelectChange = (value: string) => {
    switch (value) {
      case "popularity":
        setSortFilter({
          popular: true,
          newest: false,
          plth: false,
          phtl: false,
        });
        break;
      case "newest":
        setSortFilter({
          popular: false,
          newest: true,
          plth: false,
          phtl: false,
        });
        break;
      case "plth":
        setSortFilter({
          popular: false,
          newest: false,
          plth: true,
          phtl: false,
        });
        break;
      case "phtl":
        setSortFilter({
          popular: false,
          newest: false,
          plth: false,
          phtl: true,
        });
        break;
      default:
        // Reset all filters if no valid option is selected
        setSortFilter({
          popular: false,
          newest: false,
          plth: false,
          phtl: false,
        });
        break;
    }
  };

  const fetchProducts = async (currentPage: number) => {
    if (isFetching) return;
    setIsFetching(true);
    setOpenFilter(false);
    scrollPositionRef.current = window.scrollY;

    const query = new URLSearchParams();
    if (filters.collection) query.append("collection", filters.collection);
    if (filters.minPrice) query.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice) query.append("maxPrice", filters.maxPrice.toString());
    if (filters.color) query.append("color", filters.color);
    if (filters.power) query.append("power", filters.power);
    if (filters.brand) query.append("brand", filters.brand);
    query.append("page", currentPage.toString());
    query.append("limit", limit.toString());

    if (sortFilter.popular) query.append("sortBy", "popularity");
    if (sortFilter.newest) query.append("sortBy", "newest");
    if (sortFilter.plth) query.append("sortBy", "price");
    if (sortFilter.phtl) query.append("sortBy", "price");

    if (sortFilter.plth || sortFilter.phtl) {
      query.append("order", sortFilter.plth ? "asc" : "desc");
    }

    if (filters.stock === "inStock") {
      query.append("stock", "true");
    } else if (filters.stock === "outOfStock") {
      query.append("stock", "false");
    }

    try {
      const response = await fetch(`/api/products?${query.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      const transformedProducts = data.products.map((product: Product) => {
        let filteredVariants = product.variants;

        // 🔥 price filter apply on variants
        if (filters.minPrice || filters.maxPrice) {
          filteredVariants = filteredVariants.filter(
            (v) =>
              (!filters.minPrice || v.sellingPrice >= filters.minPrice) &&
              (!filters.maxPrice || v.sellingPrice <= filters.maxPrice),
          );
        }

        filteredVariants.sort((a, b) => a.sellingPrice - b.sellingPrice);

        return {
          ...product,
          variants: filteredVariants.length
            ? filteredVariants
            : product.variants,
        };
      });
      setProducts((prev) =>
        currentPage === 1
          ? transformedProducts
          : [...prev, ...transformedProducts],
      );
      setTotalProducts(data.totalProducts);
    } catch (error: any) {
      setError(error?.message || "An error occurred while fetching products");
    } finally {
      setIsFetching(false);
      if (isFirstLoad) setIsFirstLoad(false);
      window.scrollTo(0, scrollPositionRef.current);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 500 &&
        !isFetching &&
        products.length < totalProducts
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 200);
    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [isFetching, products.length, totalProducts]);

  function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
  ): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return function (...args: Parameters<T>) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  useEffect(() => {
    fetchProducts(1);
    setPage(1);
  }, [filters]);

  // scroll → next page
  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  return (
    <div >
      <div>
        <FilterButton
          setOpenFilter={setOpenFilter}
          openFilter={openFilter}
          handleFilterChange={handleFilterChange}
          totalProducts={totalProducts}
          filters={filters}
          isFetching={isFetching}
          setSortFilter={setSortFilter}
          handleSelectChange={handleSelectChange}
        />
      </div>

      <div className="mt-4">
        {error && (
          <div className="w-full h-[60vh] flex justify-center items-center">
            <h2 className="text-[20px] text-red-500">{error}</h2>
          </div>
        )}

        {!isFirstLoad && !isFetching && !products.length && !error && (
          <div className="w-full h-[60vh] flex justify-center items-center">
            <h2 className="text-[20px] text-gray-500">
              Products not found! 🤷‍♂️
            </h2>
          </div>
        )}
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
          {isFirstLoad ? (
            Array(8)
              .fill(0)
              .map((_, i) => <ProductFilterSkeletons key={i} />)
          ) : (
            <>
              {!isFetching &&
                products?.map((item, i) => <ProductCard key={i} prod={item} />)}

              {isFetching &&
                Array(8)
                  .fill(0)
                  .map((_, i) => <ProductFilterSkeletons key={i} />)}
            </>
          )}
        </div>
      </div>

      <div ref={loadMoreRef}></div>
    </div>
  );
};

export default Products;
