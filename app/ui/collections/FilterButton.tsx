import React, { ChangeEvent } from 'react'
import { CiFilter } from 'react-icons/ci'
import FilterSidebar from '@/app/ui/collections/filterSidebar/FilterSidebar';
import clsx from 'clsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


type SortFilter = {
  popular: boolean;
  newest: boolean;
  plth: boolean;
  phtl: boolean;
};

interface FilterSidebarProps {
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  openFilter: boolean;
  handleFilterChange: (event: ChangeEvent <HTMLInputElement | HTMLSelectElement>) => void;
  totalProducts: number,
  filters: {
    collection: string;
    minPrice: number;
    maxPrice: number;
    stock?: string;
    color: string;
    power: string;
    brand: string;
  },
  isFetching: boolean;
  setSortFilter: React.Dispatch<React.SetStateAction<SortFilter>>;
  handleSelectChange: (value: string) => void;
}

const FilterButton = ({ 
  setOpenFilter, 
  openFilter, 
  handleFilterChange, 
  totalProducts, 
  filters, 
  isFetching, 
  setSortFilter, 
  handleSelectChange 
}: FilterSidebarProps) => {

  return (
  <>
        <div className='flex items-center justify-between'>
        <div onClick={() => setOpenFilter(prev => !prev)} className='bg-white flex items-center justify-start gap-2 border border-gray-300 px-4 py-2 rounded-lg cursor-pointer'>
          <CiFilter size={20}/>
          <button className='text-[15px] font-semibold text-blue'>Filter</button>
        </div>
        <div>
          <p className='text-[14px] font-semibold text-blue'>{totalProducts} Products</p>
        </div>
        <div className=''>
        <Select onValueChange={handleSelectChange} >
          <SelectTrigger  className="bg-white w-[180px] max-sm:w-[140px] text-[15px] font-semibold text-blue focus:outline-none">
            <SelectValue  placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="plth">Price-- Low To High</SelectItem>
            <SelectItem value="phtl">Price-- High To Low</SelectItem>
          </SelectContent>
        </Select>
        </div>
      </div>

      <div onClick={()=>setOpenFilter(!openFilter)} className={clsx("h-screen w-3/4 max-md:w-2/4 max-sm:w-1/4 fixed -top-0 right-0 z-50 cursor-pointer bg-blackOverlay addExtra", { 'hidden fixed -top-0 -right-3/4' : openFilter !== true})}>
      </div>
      <div className={clsx("h-screen no-scrollbar overflow-scroll bg-white w-1/4 max-md:w-2/4 max-sm:w-3/4 fixed -top-0 left-0 z-50 addFilter", { 'hidden fixed -top-0 -left-1/4' : openFilter !== true})}>
        <FilterSidebar setOpenFilter={setOpenFilter} handleFilterChange={handleFilterChange} filters={filters} isFetching={isFetching}/>
      </div>
  </>
  )
}

export default FilterButton