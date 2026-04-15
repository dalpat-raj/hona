"use client"
import { CiSearch } from 'react-icons/ci';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import React, { useState } from 'react';
import { Product } from '@/lib/definations';

interface SearchProps {
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Search: React.FC<SearchProps> = ({ setIsFetching, setProducts }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [activeTag, setActiveTag] = useState<string | null>(null);

  const handleSearch = useDebouncedCallback((term: string) => {
    setProducts([]);
    setActiveTag("")
    setIsFetching(true);
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 600);

  const handleTagClick = (brand: string) => {
    setActiveTag(brand);  
    setProducts([]);
    setIsFetching(true);
    const params = new URLSearchParams(searchParams);
    params.set('query', brand);  
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="relative mt-4">
        <input
          type="text"
          placeholder="Search here"
          className="z-50 w-full text-sm border border-gray-300 outline-0 focus:outline-0 rounded-xl pl-2 py-[8px] max-sm:py-[12px]"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <div className="absolute top-0 h-full border border-gray-300 py-[1px] cursor-pointer rounded-xl px-8 right-0 flex items-center justify-center bg-gray-100">
          <CiSearch size={20} />
        </div>
      </div>

      <div className="mt-6 flex justify-between flex-wrap gap-2">
        {['2 Stone', 'Keo', 'Ora', 'Dish', 'Any Wash'].map((brand) => (
          <p
            key={brand}
            className={`bg-bga px-3 py-1 text-[15px] text-gray-500 cursor-pointer ${
              activeTag === brand ? 'bg-green text-white' : ''
            }`}
            onClick={() => handleTagClick(brand)}
          >
            # {brand}
          </p>
        ))}
      </div>
    </>
  );
};

export default Search;
