'use client';
import Label from '@/app/ui/label/Label';
import React, { useState, useTransition } from 'react';
import { couponCreate } from '@/action/coupon';
import { caveat } from '@/app/ui/Fonts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CouponCreateSchema } from '@/schema';
import { toast } from 'sonner';
import { CouponCreate } from '@/lib/definations';
import { useRouter } from 'next/navigation';
import ButtonWithSpinner from '@/app/ui/button/ButtonWithSpinner';


const CreateCoupon = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: {errors}, 
  } = useForm<CouponCreate>({
    resolver: zodResolver(CouponCreateSchema),
  })


  async function handleCouponSubmit(data:CouponCreate){
    startTransition(() => {
      couponCreate(data)
      .then((res)=>{
        router.push("/dashboard/coupon")
        if (res?.success) toast.success(res.success)
        if(res?.error) toast.error(res.error)
      }).catch((error)=>{
        console.log(error);
        toast.error('Error something wrong 😢');
      }).finally(()=>{
        reset();
      })
    });
  }

  return (
    <div className='flex justify-center items-center my-4 max-sm:my-0'>
      <div className='w-1/2 max-sm:w-full shadow-custom-shadow p-4 px-8 max-sm:p-4 rounded-lg max-sm:border-0'>
        <div className='text-center mb-8'>
          <h2 className={`${caveat.className} text-[26px] font-bold text-gray-700`}>Create Coupon</h2>
        </div>

        <div className=''>
          <form onSubmit={handleSubmit(handleCouponSubmit)}>
            <div className='mb-4'>
              <Label htmlFor="code" title="Code" />
              <input
                {...register("code")}
                type="text"
                id="code"
                name="code"
                placeholder="Type code in capital"
                className='w-full py-1 px-4 border border-gray-200 bg-white rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500'
              />
              {
              errors.code && (
                <p className='text-red-500 text-[13px]'>{errors.code.message}</p>
              )
              }
            </div>
            
            <div className='flex items-center gap-4 mb-4'>
              <div className=''>
                <Label htmlFor="disc" title="Discount" />
                <input
                  {...register("discount")}
                  type="number"
                  id="disc"
                  name="discount"
                  placeholder="Discount"
                  className='w-full py-1 px-4 border border-gray-200 bg-white rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500'
                />
                {
                errors.discount && (
                  <p className='text-red-500 text-[13px]'>{errors.discount.message}</p>
                )
                }
              </div>
              <div className='w-full'>
                  <Label htmlFor="expirationDate" title="End Date" />
                  <input
                      {...register("expirationDate")} 
                      id="expirationDate"
                      type="date"
                      className='w-full py-1 px-4 border border-gray-200 bg-white rounded-sm outline-none focus:border-gray-400 text-sm text-gray-500'
                  />
                  {errors.expirationDate && (
                      <p className='text-red-500 text-[13px]'>{errors.expirationDate.message}</p>
                  )}
              </div>
            </div>

            <div className='mt-4 w-full h-10'>
              <ButtonWithSpinner loading={isPending}>
                Create Coupons
              </ButtonWithSpinner>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
