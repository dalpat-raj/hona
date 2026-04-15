import { Slider } from "@/components/ui/slider";
import React, { ChangeEvent, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Collections } from "@/lib/definations";

interface FilterSidebarProps {
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  handleFilterChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  filters: {
    collection: string;
    minPrice: number;
    maxPrice: number;
    stock?: string;
    color: string;
    power: string;
    brand: string;
  };
  isFetching: boolean;
}

const FilterSidebar = ({
  setOpenFilter,
  handleFilterChange,
  filters,
  isFetching,
}: FilterSidebarProps) => {
  const [collections, setCollections] = useState<Collections[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [localPrice, setLocalPrice] = useState([
    filters.minPrice,
    filters.maxPrice,
  ]);
  const DEFAULT_CUSTOM_PRICE = [500, 50000] as [number, number];

  const fetchCollection = async () => {
    try {
      const response = await fetch(`/api/collections`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      setCollections(data);
    } catch (error: any) {
      setError(error?.message || "Not Available");
    }
  };

  useEffect(() => {
    fetchCollection();
  }, []);

  useEffect(() => {
  setLocalPrice([filters.minPrice, filters.maxPrice]);
}, [filters.minPrice, filters.maxPrice]);

  return (
    <div className="p-12 max-md:px-4 max-sm:px-4 relative">
      <div className="flex justify-between items-center">
        <p className="text-[22px] font-extrabold text-blue">Filter</p>
        <p onClick={() => setOpenFilter((prev) => !prev)} className="text-red-600">
          <RxCross1 size={20} />
        </p>
      </div>

      {/* Filter Form */}
      <div className="mt-4">
        <Accordion type="single" collapsible defaultValue="item-2">
          {error ? (
            <></>
          ) : (
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                <h4 className="text-[15px] font-semibold mb-0">Collections</h4>
              </AccordionTrigger>
              <AccordionContent>
                {collections?.map((item, i) => (
                  <div
                    className="flex items-center gap-2 mb-2 max-sm:mb-4"
                    key={i}
                  >
                    <input
                      id={"collection" + i}
                      type="radio"
                      name={"collection"}
                      checked={filters?.collection === item?.title}
                      value={item?.title}
                      onChange={handleFilterChange}
                      className="hidden peer"
                    />

                    <label
                      htmlFor={"collection" + i}
                      className="relative flex items-center cursor-pointer text-[13px] text-gray-600"
                    >
                      <span className="w-4 h-4 border-2 border-green rounded-full flex items-center justify-center mr-3">
                        {filters?.collection === item?.title && (
                          <span className="w-2 h-2 rounded-full bg-blue"></span>
                        )}
                      </span>
                      {item?.title}
                    </label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}

          <AccordionItem value="item-2">
            <AccordionTrigger className="hover:no-underline ">
              <h4 className="text-[15px] font-semibold mb-2">Price</h4>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-between w-full overflow-hidden mb-3">
                <div>
                  <p className="text-gray-600 text-[14px]">
                    ₹ {localPrice[0]}
                  </p>
                </div>
                <div>
                  {" "}
                  <span className="text-[14px] font-semibold text-gray-800">
                    To
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 text-[14px]">
                    ₹ {localPrice[1]}
                  </p>
                </div>
              </div>
              <Slider
                value={localPrice}
                onValueChange={(range) => {
                  setLocalPrice(range); 
                }}
                onValueCommit={(range) => {
                  const [newMin, newMax] = range;
                  handleFilterChange({
                    target: {
                      name: "priceRange",
                      value: JSON.stringify({ min: newMin, max: newMax }),
                    },
                  } as any);
                }}
                disabled={isFetching}
                min={DEFAULT_CUSTOM_PRICE[0]}
                defaultValue={DEFAULT_CUSTOM_PRICE}
                max={DEFAULT_CUSTOM_PRICE[1]}
                step={5}
                name="price"
                className={isFetching ? "opacity-30 pb-4" : "pb-4"}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="hover:no-underline">
              <h4 className="text-[15px] font-semibold mb-2">Avalablity</h4>
            </AccordionTrigger>
            <AccordionContent>
              <div className=" flex items-center gap-2">
                <input
                  id="inStock"
                  type="radio"
                  name="stock"
                  checked={filters.stock === "inStock"}
                  value="inStock"
                  onChange={handleFilterChange}
                  className="hidden peer"
                />
                <label
                  htmlFor="inStock"
                  className="relative flex items-center cursor-pointer text-[13px] text-gray-600"
                >
                  <span className="w-4 h-4 border-2 border-green rounded-full flex items-center justify-center mr-3">
                    {filters?.stock === "inStock" && (
                      <span className="w-2 h-2 rounded-full bg-blue"></span>
                    )}
                  </span>
                  In Stock
                </label>
              </div>
              <div className=" flex items-center gap-2 mt-2">
                <input
                  id="outStock"
                  type="radio"
                  name="stock"
                  checked={filters?.stock === "outOfStock"}
                  value="outOfStock"
                  onChange={handleFilterChange}
                  className="hidden peer"
                />
                <label
                  htmlFor="outStock"
                  className="relative flex items-center cursor-pointer text-[13px] text-gray-600"
                >
                  <span className="w-4 h-4 border-2 border-green rounded-full flex items-center justify-center mr-3">
                    {filters?.stock === "outOfStock" && (
                      <span className="w-2 h-2 rounded-full bg-blue"></span>
                    )}
                  </span>
                  Out Of Stock
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="hover:no-underline">
              <h4 className="text-[15px] font-semibold mb-2">Color</h4>
            </AccordionTrigger>
            <AccordionContent>
              {["black", "wood", "gray", "4 HP", "5 HP"].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    id={`${i}-${item}`}
                    type="radio"
                    name="color"
                    checked={filters?.color === item}
                    value={filters.color}
                    onChange={handleFilterChange}
                    className="hidden peer"
                  />

                  <label
                    htmlFor={`${i}-${item}`}
                    className="relative flex items-center cursor-pointer text-[13px] text-gray-600"
                  >
                    <span className="w-4 h-4 border-2 border-green rounded-full flex items-center justify-center mr-3">
                      {filters?.color === item && (
                        <span className="w-2 h-2 rounded-full bg-blue"></span>
                      )}
                    </span>

                    {item}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="hover:no-underline">
              <h4 className="text-[15px] font-semibold mb-2">Power</h4>
            </AccordionTrigger>
            <AccordionContent>
              {["1 HP", "2 HP", "3 HP", "4 HP", "5 HP"].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    id={`${i}-${item}`}
                    type="radio"
                    name="brand"
                    checked={filters?.power === item}
                    value={filters.power}
                    onChange={handleFilterChange}
                    className="hidden peer"
                  />

                  <label
                    htmlFor={`${i}-${item}`}
                    className="relative flex items-center cursor-pointer text-[13px] text-gray-600"
                  >
                    <span className="w-4 h-4 border-2 border-green rounded-full flex items-center justify-center mr-3">
                      {filters?.brand === item && (
                        <span className="w-2 h-2 rounded-full bg-blue"></span>
                      )}
                    </span>

                    {item}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="hover:no-underline">
              <h4 className="text-[15px] font-semibold mb-2">Brand</h4>
            </AccordionTrigger>
            <AccordionContent>
              {["2 Stone", "Ora", "Dich", "Keo", "Any Wash"].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    id={`${i}-${item}`}
                    type="radio"
                    name="brand"
                    checked={filters?.brand === item}
                    value={item}
                    onChange={handleFilterChange}
                    className="hidden peer"
                  />

                  <label
                    htmlFor={`${i}-${item}`}
                    className="relative flex items-center cursor-pointer text-[13px] text-gray-600"
                  >
                    <span className="w-4 h-4 border-2 border-green rounded-full flex items-center justify-center mr-3">
                      {filters?.brand === item && (
                        <span className="w-2 h-2 rounded-full bg-blue"></span>
                      )}
                    </span>

                    {item}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FilterSidebar;
