"use client";
import Label from "@/app/ui/label/Label";
import React, { useTransition } from "react";
import { eventAdd } from "@/action/event";
import { caveat } from "@/app/ui/Fonts";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventCreateSchema } from "@/schema";
import { EventCreate } from "@/lib/definations";
import { useRouter } from "next/navigation";
import ButtonWithSpinner from "@/app/ui/button/ButtonWithSpinner";

const CreateEvent = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [productId, setProductId] = React.useState<number | "">("");
  const [products, setProducts] = React.useState<number[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventCreate>({
    resolver: zodResolver(EventCreateSchema),
  });

  const handleAddProduct = () => {
    if (productId && !products.includes(Number(productId))) {
      setProducts((prev) => [...prev, Number(productId)]);
      setProductId("");
    }
  };

  async function handleEventSubmit(data: EventCreate) {
    startTransition(() => {
      eventAdd(products, data)
        .then((res) => {
          router.push("/dashboard/events");
          if (res?.success) toast.success(res.success);
          if (res?.error) toast.error(res.error);
        })
        .catch(() => {
          toast.error("Error something wrong 😢");
        })
        .finally(() => {
          reset();
        });
      setProducts([]);
    });
  }

  return (
    <div className="flex justify-center items-center my-4 max-sm:my-0">
      <div className="w-1/2 max-sm:w-full bg-white shadow-custom-shadow p-4 px-8 max-sm:p-4 rounded-lg max-sm:border-0">
        <div className="text-center mb-8">
          <h2
            className={`${caveat.className} text-[26px] font-bold text-green-900`}
          >
            Create Events
          </h2>
        </div>

        <div className="">
          <form onSubmit={handleSubmit(handleEventSubmit)}>
            <div className="mb-4">
              <Label htmlFor="title" title="Title" />
              <input
                {...register("title")}
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                className="w-full py-1 px-4 border border-green-200 bg-white rounded-sm outline-none focus:border-green-400 text-sm text-green-900"
              />
              {errors.title && (
                <p className="text-red-500 text-[13px]">
                  {errors?.title?.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="desc" title="Description" />
              <textarea
                {...register("description")}
                id="desc"
                name="description"
                rows={4}
                placeholder="Type your good description!"
                className="w-full text-[14px] font-normal py-1 px-2 border border-green-200 rounded-lg focus:outline-green-400 text-green-900"
              />
              {errors.description && (
                <p className="text-red-500 text-[13px]">
                  {errors?.description?.message}
                </p>
              )}
            </div>

            <div className="w-full flex items-center gap-4 mb-4">
              <div className="w-full">
                <Label htmlFor="disc" title="Discount" />
                <input
                  {...register("discount")}
                  type="number"
                  id="disc"
                  name="discount"
                  placeholder="Discount"
                  className="w-full py-1 px-4 border border-green-200 bg-white rounded-sm outline-none focus:border-green-400 text-sm text-green-900"
                />
                {errors.discount && (
                  <p className="text-red-500 text-[13px]">
                    {errors?.discount?.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Label htmlFor="endDate" title="End Date" />
                <input
                  {...register("endDate")}
                  id="endDate"
                  type="date"
                  className="w-full py-1 px-4 border border-green-200 bg-white rounded-sm outline-none focus:border-green-400 text-sm text-green-900"
                />
                {errors.endDate && (
                  <p className="text-red-500 text-[13px]">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Input for Product ID */}
            <div className="mb-4">
              <Label htmlFor="prodId" title="Select Product" />
              <div className="flex gap-2">
                <input
                  type="number"
                  id="prodId"
                  value={productId}
                  onChange={(e) =>
                    setProductId(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  placeholder="Product ID"
                  className="w-full py-1 px-4 border border-green-200 bg-white rounded-sm outline-none focus:border-green-400 text-sm text-green-900"
                />
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className=" bg-green-600 border text-white border-green-200 px-4 py-2 rounded-md hover:bg-green-900 transition"
                >
                  Add
                </button>
              </div>
              {products?.length > 0 && (
                <div className="mt-2 border border-gray-200 p-4">
                  <p className="text-[14px]">Selected Products: ID</p>
                  <ul className="flex gap-2">
                    {products?.map((id) => (
                      <li className="text-[13px]" key={id}>
                        {id}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-4 h-8">
              <ButtonWithSpinner loading={isPending}>Create</ButtonWithSpinner>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;

// 'use client';
// import Label from '@/app/ui/label/Label';
// import React, { useState } from 'react';
// import { DatePickerDemo } from './DateSelect';
// import { eventAdd } from '@/action/event';
// import LoaderBall from '@/app/ui/loader/BallLoader';
// import { caveat } from '@/app/ui/Fonts';
// import { toast } from 'sonner';
// import { notFound } from 'next/navigation';

// type Props = {};

// const CreateEvent = (props: Props) => {
//   const [endDate, setEndDate] = React.useState<Date | any>();
//   const [productId, setProductId] = React.useState<number | ''>('');
//   const [products, setProducts] = React.useState<number[]>([]);
//   const [loading, setLoading] = useState<boolean>(false)

//   const handleAddProduct = () => {
//     if (productId && !products.includes(Number(productId))) {
//       setProducts((prev) => [...prev, Number(productId)]);
//       setProductId('');
//     }
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true)
//     const formData = new FormData(event.currentTarget);
//     try {
//       const eventAddAction = eventAdd.bind(null, products, endDate);
//       const {success, error} = await eventAddAction(formData);
//        if(success) toast.success(success);
//        if(error) toast.error(error);
//     } catch (error) {
//       toast.error("something went wrong ❌")
//     } finally {
//       setProducts([])
//       setLoading(false)
//     }
//   };

//   if(loading){
//     return <LoaderBall/>
//   }

//   return (
//     <div className='flex justify-center items-center my-4 max-sm:my-0'>
//       <div className='w-1/2 max-sm:w-full shadow-custom-shadow p-4 px-8 max-sm:p-4 rounded-lg max-sm:border-0'>
//         <div className='text-center mb-8'>
//           <h2 className={`${caveat.className} text-[26px] font-bold text-gray-700`}>Create Events</h2>
//         </div>

//         <div className=''>
//           <form onSubmit={handleSubmit}>
//             <div className='mb-4'>
//               <Label htmlFor="title" title="Name" />
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 placeholder="Title"
//                 className='w-full py-1 px-4 border border-gray-200 bg-white rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500'
//                 required
//               />
//             </div>
//             <div className='mb-4'>
//               <Label htmlFor="desc" title="Description" />
//               <textarea
//                 id="desc"
//                 name="description"
//                 rows={4}
//                 placeholder='Type your good description!'
//                 className='w-full text-[14px] font-normal py-1 px-2 border border-gray-200 rounded-lg focus:outline-gray-400'
//                 required
//               />
//             </div>

//             <div className='flex items-center gap-4 mb-4'>
//               <div className=''>
//                 <Label htmlFor="disc" title="Discount" />
//                 <input
//                   type="number"
//                   id="disc"
//                   name="discount"
//                   placeholder="Discount"
//                   className='w-full py-1 px-4 border border-gray-200 bg-white rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500'
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="title" title="End Date" />
//                 <DatePickerDemo date={endDate} setDate={setEndDate} />
//               </div>
//             </div>

//             {/* Input for Product ID */}
//               <div className='mb-4'>
//                <Label htmlFor="prodId" title="Select Product" />
//                <div className='flex gap-2'>
//                  <input
//                    type="number"
//                    id="prodId"
//                    value={productId}
//                    onChange={(e) => setProductId(e.target.value === '' ? '' : Number(e.target.value))}
//                    placeholder="Product ID"
//                    className='w-full py-1 px-4 border border-gray-200 bg-white rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500'
//                  />
//                  <button type='button' onClick={handleAddProduct} className='bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-black transition'>
//                    Add
//                  </button>
//                </div>
//                {products.length > 0 && (
//                  <div className='mt-2 border border-gray-200 p-4'>
//                    <p className='text-[14px]'>Selected Products: ID</p>
//                    <ul className='flex gap-2'>
//                      {products.map((id) => (
//                        <li className='text-[13px]' key={id}>{id}</li>
//                      ))}
//                    </ul>
//                  </div>
//                )}
//              </div>

//             <div className='mt-4'>
//               <button type='submit' className="w-full hover:bg-gray-800 text-white px-4 py-2 rounded-md bg-[#333] transition">Submit</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateEvent;
