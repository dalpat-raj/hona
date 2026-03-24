"use client";
import React from "react";
import { toast } from "sonner";
import Pagination from "@/app/(dashboard)/dashboard/pagination/Pagination";
import { Product } from "@/lib/definations";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductsCard from "@/app/ui/dashboard/products/ProductsCard";
import LoaderBall from "@/app/ui/loader/BallLoader";
import { deleteProduct } from "@/action/product";

const Products = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = 8;
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (currentPage: number) => {
    if (loading) return;
    setLoading(true);
    const query = new URLSearchParams();
    query.append("page", currentPage.toString());
    query.append("limit", limit.toString());

    try {
      const response = await fetch(`/api/products?${query.toString()}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.totalProducts / limit));
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await deleteProduct(formData);
    if (res.success) {
      toast.success(res.success);
    } else {
      if (res.error) toast.success(res.error);
    }
    fetchProducts(page);
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  return (
    <div className="bg-white rounded-md relative">
      <div className="py-2 shadow-lg mb-4">
        <div className="grid grid-cols-9 gap-2 max-sm:grid-cols-4 px-4">
          <div className="col-span-3 max-sm:col-span-1 text-green-600 text-[14px] font-semibold max-sm:hidden">
            Image
          </div>
          <div className="col-span-1 text-[14px] text-green-600 font-semibold">
            Id
          </div>
          <div className="col-span-1 text-[14px] text-green-600 font-semibold">
            Price
          </div>
          <div className="col-span-1 text-[14px] text-green-600 font-semibold max-sm:hidden">
            Collection
          </div>
          <div className="col-span-1 text-[14px] text-green-600 font-semibold">
            Model
          </div>
          <div className="col-span-1 text-[14px] text-green-600 font-semibold ">
            Date
          </div>
          <div className="col-span-1 text-[14px] text-green-600 font-semibold max-sm:hidden">
            Action
          </div>
        </div>
      </div>

      {loading ? (
        <LoaderBall />
      ) : (
        <div className="px-2">
          {products?.map((item, i) => (
            <ProductsCard product={item} handleDelete={handleDelete} key={i} />
          ))}
        </div>
      )}

      {!loading && products?.length > 0 && totalPages > 1 && (
        <div className="w-full bg-white py-6">
          <div className="absolute bottom-0 left-[50%] transform -translate-x-1/2">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
